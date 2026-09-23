import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Keep the file path as the entry id (`<locale>/<name>`). Without this the glob
 * loader would use a `slug` frontmatter field as the id and the locale prefix
 * would be lost, which is what the whole content model is keyed on.
 */
const pathId = ({ entry }: { entry: string }) => entry.replace(/\.(md|mdx|json|ya?ml)$/i, '');

/* ---------------------------------------------------------------------------
   Every string rendered on the site comes from one of these collections.
   Folder layout is `<collection>/<locale>/<name>` so it maps 1:1 onto the
   Sveltia CMS `multiple_folders` i18n structure declared in
   public/admin/config.yml. Nothing is hard-coded in a component.
--------------------------------------------------------------------------- */

const link = z.object({
  label: z.string(),
  href: z.string(),
  external: z.boolean().optional().default(false),
});

const cta = z.object({
  label: z.string(),
  route: z.string(),
  style: z.enum(['primary', 'secondary', 'tertiary']).optional().default('primary'),
});

const image = z
  .object({
    src: z.string().optional(),
    alt: z.string().optional().default(''),
    /** Shown inside the branded placeholder while no photo is supplied. */
    brief: z.string().optional(),
  })
  .optional();

const seo = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
  })
  .optional();

/* -- Settings ------------------------------------------------------------- */
const settings = defineCollection({
  loader: glob({ base: './src/content/settings', pattern: '**/site.json', generateId: pathId }),
  schema: z.object({
    companyName: z.string(),
    legalName: z.string(),
    tagline: z.string(),
    descriptor: z.string(),
    address: z.object({
      street: z.string(),
      postalCode: z.string(),
      city: z.string(),
      country: z.string(),
      countryCode: z.string(),
      mapEmbedUrl: z.string(),
      mapLinkUrl: z.string(),
      latitude: z.number(),
      longitude: z.number(),
    }),
    phone: z.string(),
    phoneHref: z.string(),
    fax: z.string().optional(),
    email: z.string(),
    whatsapp: z.object({
      enabled: z.boolean().default(true),
      number: z.string(),
      href: z.string(),
      prefillMessage: z.string(),
    }),
    openingHours: z.array(z.object({ days: z.string(), hours: z.string() })),
    openingHoursNote: z.string().optional(),
    openingHoursSchema: z.array(z.string()),
    social: z.array(z.object({ network: z.string(), label: z.string(), href: z.string() })),
    memberships: z.array(z.object({ label: z.string(), note: z.string().optional() })).default([]),
    footerNote: z.string(),
    copyrightName: z.string(),
  }),
});

/* -- Navigation ----------------------------------------------------------- */
const navigation = defineCollection({
  loader: glob({ base: './src/content/settings', pattern: '**/navigation.json', generateId: pathId }),
  schema: z.object({
    primary: z.array(z.object({ label: z.string(), route: z.string() })),
    headerCta: z.object({ label: z.string(), route: z.string() }),
    footerColumns: z.array(
      z.object({
        title: z.string(),
        items: z.array(z.object({ label: z.string(), route: z.string() })),
      }),
    ),
    legal: z.array(z.object({ label: z.string(), route: z.string() })),
  }),
});

/* -- UI strings ----------------------------------------------------------- */
const ui = defineCollection({
  loader: glob({ base: './src/content/settings', pattern: '**/ui.json', generateId: pathId }),
  schema: z.object({
    skipToContent: z.string(),
    menu: z.string(),
    close: z.string(),
    languageLabel: z.string(),
    breadcrumbHome: z.string(),
    readMore: z.string(),
    viewAll: z.string(),
    backTo: z.string(),
    from: z.string(),
    perPerson: z.string(),
    nights: z.string(),
    days: z.string(),
    departsFrom: z.string(),
    seatsNote: z.string(),
    soldOut: z.string(),
    requestPlaces: z.string(),
    downloadProgramme: z.string(),
    whatsappCta: z.string(),
    callCta: z.string(),
    emailCta: z.string(),
    imagePlaceholderLabel: z.string(),
    filterAll: z.string(),
    filterLabel: z.string(),
    noResults: z.string(),
    included: z.string(),
    notIncluded: z.string(),
    itinerary: z.string(),
    day: z.string(),
    datesLabel: z.string(),
    durationLabel: z.string(),
    prices: z.string(),
    cabinOrRoom: z.string(),
    priceColumn: z.string(),
    optionalExtras: z.string(),
    practicalInfo: z.string(),
    form: z.object({
      name: z.string(),
      email: z.string(),
      phone: z.string(),
      destination: z.string(),
      travellers: z.string(),
      departureDate: z.string(),
      returnDate: z.string(),
      budget: z.string(),
      tripType: z.string(),
      tripTypeOptions: z.array(z.object({ id: z.string(), label: z.string() })),
      company: z.string(),
      participants: z.string(),
      eventType: z.string(),
      eventTypeOptions: z.array(z.string()),
      message: z.string(),
      messagePlaceholder: z.string(),
      interestIntro: z.string(),
      preferredContact: z.string(),
      preferredContactOptions: z.array(z.string()),
      consent: z.string(),
      submit: z.string(),
      submitting: z.string(),
      required: z.string(),
      optional: z.string(),
      responseNote: z.string(),
      coverLevel: z.string(),
      coverLevelOptions: z.array(z.string()),
      tripValue: z.string(),
      insuranceSubject: z.string(),
    }),
  }),
});

/* -- Pages ---------------------------------------------------------------- */
const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.json', generateId: pathId }),
  schema: z.object({
    seo,
    hero: z
      .object({
        eyebrow: z.string().optional(),
        title: z.string(),
        lede: z.string().optional(),
        image,
        mobileImage: image,
        primaryCta: cta.optional(),
        secondaryCta: cta.optional(),
        signals: z.array(z.object({ label: z.string(), value: z.string() })).optional().default([]),
      })
      .optional(),
    sections: z.record(z.string(), z.any()).optional().default({}),
  }),
});

/* -- Departures ----------------------------------------------------------- */
const departures = defineCollection({
  loader: glob({ base: './src/content/departures', pattern: '**/*.md', generateId: pathId }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    order: z.number().optional().default(0),
    status: z.enum(['open', 'few-places', 'sold-out', 'draft']).default('open'),
    featured: z.boolean().default(false),
    summary: z.string(),
    category: z.string(),
    destinations: z.array(z.string()).default([]),
    countries: z.array(z.string()).default([]),
    departureDate: z.string(),
    returnDate: z.string(),
    durationDays: z.number(),
    durationNights: z.number().optional(),
    departsFrom: z.array(z.string()).default([]),
    priceFrom: z.number().optional(),
    currency: z.string().default('EUR'),
    priceNote: z.string().optional(),
    heroImage: image,
    gallery: z.array(z.object({ src: z.string().optional(), alt: z.string().optional(), brief: z.string().optional() })).default([]),
    highlights: z.array(z.string()).default([]),
    itinerary: z
      .array(z.object({ day: z.string(), place: z.string(), title: z.string().optional(), body: z.string() }))
      .default([]),
    included: z.array(z.string()).default([]),
    notIncluded: z.array(z.string()).default([]),
    priceTable: z
      .object({
        caption: z.string().optional(),
        rows: z.array(z.object({ label: z.string(), note: z.string().optional(), price: z.string() })),
      })
      .optional(),
    optionalExtras: z
      .array(z.object({ label: z.string(), price: z.string(), note: z.string().optional() }))
      .default([]),
    practicalInfo: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    programmePdf: z.string().optional(),
    seo,
  }),
});

/* -- Team ----------------------------------------------------------------- */
const team = defineCollection({
  loader: glob({ base: './src/content/team', pattern: '**/*.md', generateId: pathId }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    order: z.number().default(0),
    email: z.string().optional(),
    phone: z.string().optional(),
    languages: z.array(z.string()).default([]),
    specialisms: z.array(z.string()).default([]),
    photo: image,
    published: z.boolean().default(true),
  }),
});

/* -- Legal ---------------------------------------------------------------- */
const legal = defineCollection({
  loader: glob({ base: './src/content/legal', pattern: '**/*.md', generateId: pathId }),
  schema: z.object({
    title: z.string(),
    updated: z.string().optional(),
    seo,
  }),
});

/* -- Useful links --------------------------------------------------------- */
const links = defineCollection({
  loader: glob({ base: './src/content/links', pattern: '**/*.json', generateId: pathId }),
  schema: z.object({
    groups: z.array(
      z.object({
        title: z.string(),
        items: z.array(
          z.object({ label: z.string(), href: z.string(), description: z.string().optional() }),
        ),
      }),
    ),
  }),
});

export const collections = { settings, navigation, ui, pages, departures, team, legal, links };
export type Link = z.infer<typeof link>;
export type Cta = z.infer<typeof cta>;
