import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/reviews' }),
  schema: z.object({
    author: z.string(),
    date: z.string(),
    rating: z.number().min(1).max(5),
    text: z.string(),
    source: z.enum(['google', 'airbnb', 'tripadvisor', 'viator']),
    link: z.string().url(),
    order: z.number(),
  }),
});

export const collections = { reviews };
