import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getNotes } from '../../lib/content';

export async function GET(context: APIContext) {
  const notes = await getNotes();
  return rss({
    title: 'Indrayudh Sengupta · Notes',
    description: 'Process photos and thoughts.',
    site: context.site!,
    items: notes.map((note) => ({
      title: note.data.title || note.body?.split('\n')[0]?.slice(0, 80) || 'Note',
      pubDate: note.data.date,
      link: `/notes/${note.id}/`,
      description: note.body ?? '',
    })),
  });
}
