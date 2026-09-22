import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import type { Locale } from './i18n';

const stripLocale = (id: string) => id.replace(/^[a-z]{2}\//, '');

export async function settingsFor(locale: Locale) {
  const entry = await getEntry('settings', `${locale}/site`);
  if (!entry) throw new Error(`Missing settings for locale "${locale}" (src/content/settings/${locale}/site.json)`);
  return entry.data;
}

export async function navigationFor(locale: Locale) {
  const entry = await getEntry('navigation', `${locale}/navigation`);
  if (!entry) throw new Error(`Missing navigation for locale "${locale}"`);
  return entry.data;
}

export async function uiFor(locale: Locale) {
  const entry = await getEntry('ui', `${locale}/ui`);
  if (!entry) throw new Error(`Missing UI strings for locale "${locale}"`);
  return entry.data;
}

export async function pageFor(locale: Locale, name: string) {
  const entry = await getEntry('pages', `${locale}/${name}`);
  if (!entry) throw new Error(`Missing page content "${name}" for locale "${locale}" (src/content/pages/${locale}/${name}.json)`);
  return entry.data;
}

export async function linksFor(locale: Locale) {
  const entry = await getEntry('links', `${locale}/useful-links`);
  return entry?.data ?? { groups: [] };
}

export async function legalFor(locale: Locale, name: string) {
  const entry = await getEntry('legal', `${locale}/${name}`);
  if (!entry) throw new Error(`Missing legal page "${name}" for locale "${locale}"`);
  return entry;
}

export async function teamFor(locale: Locale) {
  const all = await getCollection('team', (e: CollectionEntry<'team'>) =>
    e.id.startsWith(`${locale}/`) && e.data.published !== false,
  );
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** All published departures for a locale, soonest first, drafts excluded. */
export async function departuresFor(locale: Locale) {
  const all = await getCollection('departures', (e: CollectionEntry<'departures'>) =>
    e.id.startsWith(`${locale}/`) && e.data.status !== 'draft',
  );
  return all.sort((a, b) => {
    const byOrder = (b.data.order ?? 0) - (a.data.order ?? 0);
    if (byOrder !== 0) return byOrder;
    return a.data.departureDate.localeCompare(b.data.departureDate);
  });
}

export async function departureBySlug(locale: Locale, slug: string) {
  const all = await departuresFor(locale);
  return all.find((e) => e.data.slug === slug);
}

/** Entry file name without its locale prefix — used to pair IT and EN records. */
export const baseId = stripLocale;

/** Unique category list for the departures filter. */
export function categoriesOf(entries: CollectionEntry<'departures'>[]) {
  return [...new Set(entries.map((e) => e.data.category).filter(Boolean))];
}

/** Slug of the same departure in every locale, for the language switch. */
export async function departureSlugs(fileName: string) {
  const all = await getCollection('departures');
  const out: Record<string, string> = {};
  for (const e of all) {
    const [loc, name] = e.id.split('/');
    if (name === fileName) out[loc] = e.data.slug;
  }
  return out;
}
