import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const news = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),
  schema: z.object({
    title: z.string(), summary: z.string(), publishedDate: z.coerce.date(),
    author: z.string(), image: z.string().optional(), tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { news };
