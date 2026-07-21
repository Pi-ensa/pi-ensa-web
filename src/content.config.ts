import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const workshops = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/workshops' }),
  schema: z.object({
    title: z.string(), summary: z.string(), area: z.string(),
    audience: z.string(), modality: z.string(), dates: z.string(), schedule: z.string(),
    status: z.enum(['próximamente', 'inscripciones abiertas', 'en curso', 'concluido']),
    image: z.string().optional(), registrationUrl: z.string().url().or(z.literal('')).default(''),
    publishedDate: z.coerce.date(), draft: z.boolean().default(false),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),
  schema: z.object({
    title: z.string(), summary: z.string(), publishedDate: z.coerce.date(),
    author: z.string(), image: z.string().optional(), tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { workshops, news };
