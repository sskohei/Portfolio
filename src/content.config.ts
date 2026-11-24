import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const requiredText = z.string().trim().min(1, '入力してください。');
const date = z.preprocess(
  (value) => value instanceof Date && !Number.isNaN(value.getTime())
    ? value.toISOString().slice(0, 10)
    : value,
  z.iso.date({ error: 'YYYY-MM-DD 形式の有効な日付を入力してください。' }),
);
const link = z.object({
  label: requiredText,
  url: z.union([
    z.url({ protocol: /^https?$/ }),
    z.string().regex(/^\/(?![/\\])[^\s\\]*$/),
  ]),
});
const entryFields = {
  title: requiredText,
  summary: requiredText,
  date,
  draft: z.boolean().default(false),
  links: z.array(link).default([]),
};

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '*.md' }),
  schema: z.object({
    ...entryFields,
    status: z.enum(['released', 'in-progress']),
    featured: z.boolean().default(false),
    image: z.string().regex(/^\/images\/(?:[^/\s?#%\\]+\/)*[^/\s?#%\\]+$/).optional(),
    imageAlt: requiredText.optional(),
  }).refine((item) => Boolean(item.imageAlt) === Boolean(item.image), {
    path: ['imageAlt'],
    error: 'image と imageAlt は一緒に指定してください。',
  }),
});

const activities = defineCollection({
  loader: glob({ base: './src/content/activities', pattern: '*.md' }),
  schema: z.object(entryFields),
});

export const collections = { projects, activities };
