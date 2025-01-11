import type { fetchPosts } from '@/utils/project';

export type Project = Awaited<ReturnType<typeof fetchPosts>>[number];
