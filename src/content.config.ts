import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Shared fields for anything that shows up in the Index.
const work = {
  title: z.string(),
  year: z.number(),
  summary: z.string(),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(), // path under /public, e.g. /media/aac/cover.jpg
  featured: z.boolean().default(false),
  order: z.number().default(100), // lower comes first on section pages
  draft: z.boolean().default(false),
};

// Design case studies: problem, role, process, outcome.
const design = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/design' }),
  schema: z.object({
    ...work,
    kind: z.enum(['case-study', 'illustration', 'branding']).default('case-study'),
    client: z.string().optional(),
    role: z.string().optional(),
    nda: z.boolean().default(false),
  }),
});

// Art works and curatorial projects: medium, statement, documentation, exhibitions.
const art = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/art' }),
  schema: z.object({
    ...work,
    kind: z.enum(['work', 'curatorial']).default('work'),
    medium: z.string().optional(),
    dimensions: z.string().optional(),
    credits: z.array(z.string()).default([]),
    exhibitions: z
      .array(z.object({ title: z.string(), place: z.string(), date: z.string() }))
      .default([]),
  }),
});

// Notes: the microblog. `projects` links a note to design or art entries by id.
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    date: z.coerce.date(),
    images: z.array(z.object({ src: z.string(), alt: z.string() })).default([]),
    tags: z.array(z.string()).default([]),
    projects: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Teaching: courses and workshops.
const teaching = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/teaching' }),
  schema: z.object({
    ...work,
    where: z.string(),
    audience: z.string().optional(),
  }),
});

// Studio: single finished pieces such as etchings, prints, watercolours and crafts.
// One file per piece. Process belongs in notes, tagged with the piece's id.
export const studioMedia = ['etching', 'print', 'watercolour', 'drawing', 'craft', 'other'] as const;
const studio = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/studio' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    medium: z.enum(studioMedia),
    technique: z.string().optional(), // e.g. "Drypoint on copper, edition of 8"
    dimensions: z.string().optional(),
    images: z.array(z.object({ src: z.string(), alt: z.string() })).default([]),
    tags: z.array(z.string()).default([]),
    available: z.boolean().default(false), // for later, if pieces are for sale
    draft: z.boolean().default(false),
  }),
});

// Unlisted selection pages for one application, e.g. /for/governikus.
const selections = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/selections' }),
  schema: z.object({
    title: z.string(),
    design: z.array(reference('design')).default([]),
    art: z.array(reference('art')).default([]),
  }),
});

export const collections = { design, art, studio, notes, teaching, selections };
