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
  section: 'Design' | 'Art' | 'Teaching';
  href: string;
  tags: string[];
};

export async function getIndex(): Promise<IndexRow[]> {
  const rows: IndexRow[] = [
    ...(await getDesign()).map((e) => row(e, 'Design', '/design/')),
    ...(await getArt()).map((e) => row(e, 'Art', '/art/')),
    ...(await getTeaching()).map((e) => row(e, 'Teaching', '/teaching/')),
  ];
  return rows.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
}

function row(
  e: CollectionEntry<'design' | 'art' | 'teaching'>,
  section: IndexRow['section'],
  base: string,
): IndexRow {
  return { title: e.data.title, year: e.data.year, section, href: base + e.id + '/', tags: e.data.tags };
}

export const formatDate = (d: Date, lang = 'en') =>
  d.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
