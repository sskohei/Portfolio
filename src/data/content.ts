import { getCollection } from 'astro:content';

export async function getPublishedEntries<C extends 'projects' | 'activities'>(collection: C) {
  const entries = await getCollection(collection, ({ data }) => !data.draft);
  return entries.sort((a, b) =>
    b.data.date.localeCompare(a.data.date) || a.id.localeCompare(b.id)
  );
}

export function formatDate(date: string) {
  return date.replaceAll('-', '.');
}
