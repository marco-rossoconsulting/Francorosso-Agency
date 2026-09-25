export const LOCALES = ['it', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'it';

export const HTML_LANG: Record<Locale, string> = { it: 'it-CH', en: 'en' };
export const OG_LOCALE: Record<Locale, string> = { it: 'it_CH', en: 'en_GB' };
export const LOCALE_LABEL: Record<Locale, string> = { it: 'Italiano', en: 'English' };
export const LOCALE_SHORT: Record<Locale, string> = { it: 'IT', en: 'EN' };

/** Route keys used across the site. Slugs are localised for SEO. */
export type RouteKey =
  | 'home'
  | 'departures'
  | 'services'
  | 'insurance'
  | 'business'
  | 'about'
  | 'contact'
  | 'quote'
  | 'links'
  | 'privacy'
  | 'legal'
  | 'thanks'
  | 'newsletterThanks';

const SLUGS: Record<RouteKey, Record<Locale, string>> = {
  home: { it: '', en: '' },
  departures: { it: 'le-nostre-partenze', en: 'our-departures' },
  services: { it: 'servizi', en: 'services' },
  insurance: { it: 'assicurazione-viaggio', en: 'travel-insurance' },
  business: { it: 'aziende', en: 'business-travel-mice' },
  about: { it: 'chi-siamo', en: 'about-us' },
  contact: { it: 'contatti', en: 'contact' },
  quote: { it: 'preventivo', en: 'request-a-quote' },
  links: { it: 'link-utili', en: 'useful-links' },
  privacy: { it: 'privacy', en: 'privacy' },
  legal: { it: 'note-legali', en: 'legal-notice' },
  thanks: { it: 'grazie', en: 'thank-you' },
  newsletterThanks: { it: 'newsletter-grazie', en: 'newsletter-thank-you' },
};

/** Absolute, trailing-slashed path for a route key in a given locale. */
export function path(locale: Locale, key: RouteKey, sub?: string): string {
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  const slug = SLUGS[key][locale];
  const tail = sub ? `${slug}/${sub}` : slug;
  return `${prefix}/${tail ? `${tail}/` : ''}` || '/';
}

/**
 * Sub-paths differ per locale (a departure has an Italian slug and an English
 * one), so the language switch takes a map rather than a single string.
 */
export type Subs = Partial<Record<Locale, string>>;

/** The equivalent URL of the current route in the other locale. */
export function alternate(locale: Locale, key: RouteKey, subs?: Subs) {
  return LOCALES.filter((l) => l !== locale).map((l) => ({
    locale: l,
    href: path(l, key, subs?.[l]),
    label: LOCALE_LABEL[l],
    short: LOCALE_SHORT[l],
  }));
}

export function allHreflang(key: RouteKey, subs?: Subs) {
  return LOCALES.map((l) => ({ locale: l, hreflang: HTML_LANG[l], href: path(l, key, subs?.[l]) }));
}

/** Locale-aware date formatting for departure dates. */
export function formatDate(iso: string, locale: Locale, opts?: Intl.DateTimeFormatOptions) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(locale === 'it' ? 'it-CH' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
    ...opts,
  }).format(d);
}

export function formatDateRange(fromIso: string, toIso: string, locale: Locale) {
  const from = new Date(fromIso);
  const to = new Date(toIso);
  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) return `${fromIso} – ${toIso}`;
  const loc = locale === 'it' ? 'it-CH' : 'en-GB';
  const sameYear = from.getUTCFullYear() === to.getUTCFullYear();
  const sameMonth = sameYear && from.getUTCMonth() === to.getUTCMonth();
  const day = new Intl.DateTimeFormat(loc, { day: 'numeric', timeZone: 'UTC' });
  const dayMonth = new Intl.DateTimeFormat(loc, { day: 'numeric', month: 'long', timeZone: 'UTC' });
  const full = new Intl.DateTimeFormat(loc, {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });
  if (sameMonth) return `${day.format(from)}–${full.format(to)}`;
  if (sameYear) return `${dayMonth.format(from)} – ${full.format(to)}`;
  return `${full.format(from)} – ${full.format(to)}`;
}

export function formatPrice(amount: number, locale: Locale, currency = 'CHF') {
  return new Intl.NumberFormat(locale === 'it' ? 'it-CH' : 'en-GB', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
