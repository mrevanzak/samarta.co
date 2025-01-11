import type { CollectionEntry } from 'astro:content';
import { getCollection, render } from 'astro:content';
import { APP_BLOG } from 'astrowind:config';
import type { Post } from '@/types';
import type { PaginateFunction } from 'astro';
import { CATEGORY_BASE, POST_PERMALINK_PATTERN, TAG_BASE, cleanSlug, trimSlash } from './permalinks';

const generatePermalink = async ({
  id,
  slug,
  publishDate,
  category,
}: {
  id: string;
  slug: string;
  publishDate: Date;
  category: string | undefined;
}) => {
  const year = String(publishDate.getFullYear()).padStart(4, '0');
  const month = String(publishDate.getMonth() + 1).padStart(2, '0');
  const day = String(publishDate.getDate()).padStart(2, '0');
  const hour = String(publishDate.getHours()).padStart(2, '0');
  const minute = String(publishDate.getMinutes()).padStart(2, '0');
  const second = String(publishDate.getSeconds()).padStart(2, '0');

  const permalink = POST_PERMALINK_PATTERN.replace('%slug%', slug)
    .replace('%id%', id)
    .replace('%category%', category || '')
    .replace('%year%', year)
    .replace('%month%', month)
    .replace('%day%', day)
    .replace('%hour%', hour)
    .replace('%minute%', minute)
    .replace('%second%', second);

  return permalink
    .split('/')
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
};

const getNormalizedPost = async (post: CollectionEntry<'post'>) => {
  const { id, data } = post;
  const { Content, remarkPluginFrontmatter } = await render(post);

  const { publishDate: rawPublishDate = new Date(), ...rest } = data;

  const slug = cleanSlug(id); // cleanSlug(rawSlug.split('/').pop());
  const publishDate = new Date(rawPublishDate);

  return {
    ...rest,
    id,
    slug,
    permalink: await generatePermalink({
      id,
      slug,
      publishDate,
      category: undefined,
    }),

    publishDate,

    Content: Content,
    // or 'content' in case you consume from API

    readingTime: remarkPluginFrontmatter?.readingTime,
  };
};

const load = async () => {
  const posts = await getCollection('post');
  const normalizedPosts = posts.map(async (post) => await getNormalizedPost(post));

  const results = (await Promise.all(normalizedPosts)).sort(
    (a, b) => b.publishDate.valueOf() - a.publishDate.valueOf()
  );

  return results;
};

let _posts: Awaited<ReturnType<typeof load>>;

/** */
export const isProjectEnabled = APP_BLOG.isEnabled;
export const isRelatedPostsEnabled = APP_BLOG.isRelatedPostsEnabled;
export const isProjectListRouteEnabled = APP_BLOG.list.isEnabled;
export const isProjectPostRouteEnabled = APP_BLOG.post.isEnabled;
export const isProjectCategoryRouteEnabled = APP_BLOG.category.isEnabled;
export const isProjectTagRouteEnabled = APP_BLOG.tag.isEnabled;

export const projectListRobots = APP_BLOG.list.robots;
export const projectPostRobots = APP_BLOG.post.robots;
export const projectCategoryRobots = APP_BLOG.category.robots;
export const projectTagRobots = APP_BLOG.tag.robots;

export const projectPostsPerPage = APP_BLOG?.postsPerPage;

/** */
export const fetchPosts = async () => {
  if (!_posts) {
    _posts = await load();
  }

  return _posts;
};

/** */
export const findPostsBySlugs = async (slugs: Array<string>): Promise<Array<Post>> => {
  if (!Array.isArray(slugs)) return [];

  const posts = await fetchPosts();

  return slugs.reduce((r: Array<Post>, slug: string) => {
    posts.some((post: Post) => slug === post.slug && r.push(post));
    return r;
  }, []);
};

/** */
export const findPostsByIds = async (ids: Array<string>): Promise<Array<Post>> => {
  if (!Array.isArray(ids)) return [];

  const posts = await fetchPosts();

  return ids.reduce((r: Array<Post>, id: string) => {
    posts.some((post: Post) => id === post.id && r.push(post));
    return r;
  }, []);
};

/** */
export const findLatestPosts = async ({ count }: { count?: number }): Promise<Array<Post>> => {
  const _count = count || 4;
  const posts = await fetchPosts();

  return posts ? posts.slice(0, _count) : [];
};

/** */
export const getStaticPathsProjectList = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isProjectEnabled || !isProjectListRouteEnabled) return [];
  return paginate(await fetchPosts(), {
    params: { project: undefined },
    pageSize: projectPostsPerPage,
  });
};

/** */
export const getStaticPathsProjectPost = async () => {
  if (!isProjectEnabled || !isProjectPostRouteEnabled) return [];
  return (await fetchPosts()).flatMap((post) => {
    return {
      params: {
        slug: post.permalink,
      },
      props: { post },
    };
  });
};

/** */
export const getStaticPathsProjectCategory = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isProjectEnabled || !isProjectCategoryRouteEnabled) return [];

  const posts = await fetchPosts();
  const categories = {};
  posts.map((post) => {
    if (post.category?.slug) {
      categories[post.category?.slug] = post.category;
    }
  });

  return Array.from(Object.keys(categories)).flatMap((categorySlug) =>
    paginate(
      posts.filter((post) => post.category?.slug && categorySlug === post.category?.slug),
      {
        params: { category: categorySlug, project: CATEGORY_BASE || undefined },
        pageSize: projectPostsPerPage,
        props: { category: categories[categorySlug] },
      }
    )
  );
};

/** */
export const getStaticPathsProjectTag = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isProjectEnabled || !isProjectTagRouteEnabled) return [];

  const posts = await fetchPosts();
  const tags = {};
  posts.map((post) => {
    if (Array.isArray(post.tags)) {
      post.tags.map((tag) => {
        tags[tag?.slug] = tag;
      });
    }
  });

  return Array.from(Object.keys(tags)).flatMap((tagSlug) =>
    paginate(
      posts.filter((post) => Array.isArray(post.tags) && post.tags.find((elem) => elem.slug === tagSlug)),
      {
        params: { tag: tagSlug, project: TAG_BASE || undefined },
        pageSize: projectPostsPerPage,
        props: { tag: tags[tagSlug] },
      }
    )
  );
};

/** */
export async function getRelatedPosts(originalPost: Post, maxResults = 4): Promise<Post[]> {
  const allPosts = await fetchPosts();
  const originalTagsSet = new Set(originalPost.tags ? originalPost.tags.map((tag) => tag.slug) : []);

  const postsWithScores = allPosts.reduce((acc: { post: Post; score: number }[], iteratedPost: Post) => {
    if (iteratedPost.slug === originalPost.slug) return acc;

    let score = 0;
    if (iteratedPost.category && originalPost.category && iteratedPost.category.slug === originalPost.category.slug) {
      score += 5;
    }

    if (iteratedPost.tags) {
      iteratedPost.tags.forEach((tag) => {
        if (originalTagsSet.has(tag.slug)) {
          score += 1;
        }
      });
    }

    acc.push({ post: iteratedPost, score });
    return acc;
  }, []);

  postsWithScores.sort((a, b) => b.score - a.score);

  const selectedPosts: Post[] = [];
  let i = 0;
  while (selectedPosts.length < maxResults && i < postsWithScores.length) {
    selectedPosts.push(postsWithScores[i].post);
    i++;
  }

  return selectedPosts;
}
