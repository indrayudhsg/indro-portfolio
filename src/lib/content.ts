import { getCollection, type CollectionEntry } from 'astro:content';

const live = <T extends { data: { draft?: boolean } }>(e: T) =>
  import.meta.env.DEV || !e.data.draft;

const byOrderThenYear = (
  a: { data: { order: number; year: number } },
  b: { data: { order: number; year: number } },
) => a.data.order - b.data.order || b.data.year - a.data.year;

export async function getDesign() {
  return (await getCollection('design', live)).sort(byOrderThenYear);
}

export async function getArt() {
  return (await getCollection('art', live)).sort(byOrderThenYear);
}

export async function getStudio() {
  return (await getCollection('studio', live)).sort(
    (a, b) => b.data.year - a.data.year || a.data.title.localeCompare(b.data.title),
  );
}

export const mediumLabel: Record<string, string> = {
  etching: 'Etchings',
  print: 'Prints',
  watercolour: 'Watercolours',
  drawing: 'Drawings',
  craft: 'Crafts',
  digital: 'Digital paintings',
  other: 'Other',
};

/** Featured design and art entries with a cover image, for the home page plates. */
export async function getFeatured() {
  const all = [
    ...(await getArt()).map((e) => ({ e, href: `/art/${e.id}/`, section: 'Art' })),
    ...(await getDesign()).map((e) => ({ e, href: `/design/${e.id}/`, section: 'Design' })),
  ];
  return all.filter(({ e }) => e.data.featured && e.data.cover);
}

export async function getTeaching() {
  return (await getCollection('teaching', live)).sort(byOrderThenYear);
}

export async function getNotes() {
  return (await getCollection('notes', live)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
}

/** Notes tagged with a given project id, newest first. */
export async function getNotesFor(projectId: string) {
  return (await getNotes()).filter((n) => n.data.projects.includes(projectId));
}

export type IndexRow = {
  title: string;
  year: number;
  section: 'Design' | 'Art' | 'Studio' | 'Teaching';
  medium: string;
  href: string;
  tags: string[];
  cover?: string;
};

/** Everything searchable, newest first. Studio pieces are included so a search for "etching" finds them. */
export async function getIndex(): Promise<IndexRow[]> {
  const rows: IndexRow[] = [
    ...(await getDesign()).map((e) => ({
      title: e.data.title, year: e.data.year, section: 'Design' as const,
      medium: [e.data.client?.split(',')[0], e.data.kind === 'case-study' ? undefined : e.data.kind].filter(Boolean).join(', ') || 'Case study',
      href: `/design/${e.id}/`, tags: e.data.tags, cover: e.data.cover,
    })),
    ...(await getArt()).map((e) => ({
      title: e.data.title, year: e.data.year, section: 'Art' as const,
      medium: e.data.kind === 'curatorial' ? 'Curatorial' : (e.data.medium ?? '').split('.')[0],
      href: `/art/${e.id}/`, tags: e.data.tags, cover: e.data.cover,
    })),
    ...(await getStudio()).map((e) => ({
      title: e.data.title, year: e.data.year, section: 'Studio' as const,
      medium: e.data.technique ?? mediumLabel[e.data.medium], href: `/art/studio/${e.id}/`,
      tags: e.data.tags, cover: e.data.images[0]?.src,
    })),
    ...(await getTeaching()).map((e) => ({
      title: e.data.title, year: e.data.year, section: 'Teaching' as const,
      medium: e.data.where, href: `/teaching/#${e.id}`, tags: e.data.tags, cover: e.data.cover,
    })),
  ];
  return rows.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
}

export const formatDate = (d: Date, lang = 'en') =>
  d.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
