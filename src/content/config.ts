import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.string().url().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const projectCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/project' }),
  schema: z.object({
    publishDate: z.date().optional(),

    title: z.string(),
    images: z.array(z.string()).min(1),
    year: z.number(),
    spesifications: z.object({
      client: z.string(),
      location: z.string(),
      duration: z.string(),
      status: z.string(),
    }),
    portfolio: z.string().url(),

    metadata: metadataDefinition(),
  }),
});

const serviceCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/service' }),
  schema: z.object({
    publishDate: z.date().optional(),

    title: z.string(),
    images: z.array(z.string()).min(1),

    metadata: metadataDefinition(),
  }),
});

export const collections = {
  project: projectCollection,
  service: serviceCollection,
};
