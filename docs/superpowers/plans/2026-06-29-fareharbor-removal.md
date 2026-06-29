# FareHarbor Removal + Email Booking Pivot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove all FareHarbor integrations site-wide and replace with email-first booking CTAs, a clear pricing model, and a new tours landing page.

**Architecture:** Update existing pages in place (no URL changes). Extract two reusable components (BookingCTA, PricingBlock) used across all tour pages. Work data-layer-first so TypeScript catches any missed references at build time.

**Tech Stack:** Astro 7, Tailwind CSS v4, TypeScript — no new dependencies needed.

## Global Constraints

- All existing URLs stay unchanged — update content in place
- Email for all CTAs: `hello@walksantacruz.com`
- Phone (secondary): `(831) 275-2566`
- Pricing: $45/person · 4-person min · solo/couple/trio pay $180 flat · kids 12 & under free · groups 8+ custom
- Stripe mentioned ONLY on the Corporate page (`/team-offsites`)
- Tour descriptions and storytelling copy in `tours.ts` must NOT change
- No hover dimming on links (`hover:opacity-*`) — house style
- Kids 12 & under free — no paid child tier
- "On-demand" language forbidden — use "email us to check availability"
- Verify each task with `npm run build` before committing

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `src/data/tours.ts` | Modify | Remove fareharborCalendarId, childPrice; update bookingUrl + price strings |
| `src/components/TourCard.astro` | Modify | Remove childPrice prop |
| `src/components/BookingCTA.astro` | Create | Reusable email CTA block used on all tour pages |
| `src/components/PricingBlock.astro` | Create | Reusable pricing table used on tour pages + tours index |
| `src/components/Header.astro` | Modify | Nav restructure: add Custom, remove Private Tours, rename Corporate, add Contact + FAQ |
| `src/components/BookingModal.astro` | Modify | Replace FareHarbor link with mailto CTA |
| `src/pages/tours/index.astro` | Create | New tours landing page at `/tours` |
| `src/pages/tours/[slug].astro` | Modify | Replace FareHarbor calendar with PricingBlock + BookingCTA |
| `src/pages/index.astro` | Modify | Hero copy, remove #book FareHarbor section, hide gift cards, update perks |
| `src/pages/private-tours.astro` | Modify | Repurpose as Custom Tours — new heading/meta, email CTA, simplified optional form |
| `src/pages/team-offsites.astro` | Modify | Add email CTA + Stripe payment note |
| `src/pages/faq.astro` | Modify | Add 5 new booking Q&As, update cancellation + kids pricing cards |
| `src/pages/gallery.astro` | Modify | Remove FareHarbor button, replace with mailto CTA |
| `src/pages/contact.astro` | Modify | Update intro copy to reflect email booking model |
| `src/layouts/Layout.astro` | Modify | Remove commented FareHarbor Lightframe script block |

---

## Task 1: Data layer — clean up tours.ts and TourCard.astro

**Files:**
- Modify: `src/data/tours.ts`
- Modify: `src/components/TourCard.astro`

**Interfaces:**
- Produces: `Tour` type without `fareharborCalendarId` or `childPrice`; `bookingUrl` is now a mailto string; later tasks rely on this shape

- [ ] **Step 1: Remove fields from Tour interface**

In `src/data/tours.ts`, update the `Tour` interface — remove `childPrice` and `fareharborCalendarId`, update `price` type comment, change `bookingUrl` to mailto:

```typescript
export interface Tour {
  // Basic Info
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;

  // Images
  cardImage: ImageMetadata;
  cardImageAlt: string;
  heroImage: ImageMetadata;
  heroImageAlt: string;
  galleryImages: {
    src: ImageMetadata;
    alt: string;
    caption?: string;
  }[];

  // Logistics
  duration: string;
  price: string; // display string e.g. "$45/person · Kids 12 & under free"
  adultPrice: number;
  schedule: string;
  meetingPoint: MeetingPoint;
  bookingUrl: string; // mailto: URL

  // Detailed Content
  storytelling: string;
  itinerary: TourItineraryStop[];
  highlights: string[];
  includes: TourIncludes;
  faqs: TourFAQ[];

  // SEO
  seoTitle: string;
  seoDescription: string;
  keywords: string[];

  // Related
  relatedTourSlugs: string[];
}
```

- [ ] **Step 2: Update downtown-mission-hill tour object**

Find the `downtown-mission-hill` tour object and make these changes (leave all other fields untouched):

```typescript
// Change:
price: "Adult $45 / Child $30",
adultPrice: 45,
childPrice: 30,
// ...
bookingUrl: "https://fareharbor.com/embeds/book/walksantacruz/items/673407/calendar/2025/12/?full-items=yes",
// ...
fareharborCalendarId: "673407",

// To:
price: "$45/person · Kids 12 & under free",
adultPrice: 45,
// (childPrice line removed)
// ...
bookingUrl: "mailto:hello@walksantacruz.com?subject=Heart%20of%20Downtown%20Booking",
// (fareharborCalendarId line removed)
```

Also update the FAQ answer that mentions old child pricing (in the `faqs` array for this tour):

Find: `"Children ages 6–17 are $30, and kids 5 and under are free with a paid adult ticket."`
Replace with: `"Kids 12 and under are free with a paying adult."`

Find any FAQ answer mentioning `"Full refund for cancellations made 24 or more hours before the tour start time. Cancellations within 24 hours are not eligible for a refund."`
Replace with: `"If you need to cancel or reschedule, email us as early as possible and we'll do our best to accommodate."`

Find any FAQ answer mentioning `"Check out our Private Tours page"`
Replace with: `"Check out our Custom Tours page"`

- [ ] **Step 3: Update beach-hill-loop tour object**

```typescript
// Change:
price: "Adult $45 / Child $30",
adultPrice: 45,
childPrice: 30,
// ...
bookingUrl: "https://fareharbor.com/embeds/book/walksantacruz/items/686749/calendar/2025/12/?full-items=yes",
// ...
fareharborCalendarId: "686749",

// To:
price: "$45/person · Kids 12 & under free",
adultPrice: 45,
// (childPrice removed)
// ...
bookingUrl: "mailto:hello@walksantacruz.com?subject=Beach%20Hill%20Booking",
// (fareharborCalendarId removed)
```

Update any FAQ answer in this tour mentioning `"Children ages 6–17 are $30"` → `"Kids 12 and under are free with a paying adult."` and cancel policy → `"If you need to cancel or reschedule, email us as early as possible and we'll do our best to accommodate."`

- [ ] **Step 4: Update surfing-beach-culture tour object**

```typescript
// Change:
price: "Adult $45 / Child $30",
adultPrice: 45,
childPrice: 30,
// ...
bookingUrl: "https://fareharbor.com/embeds/book/walksantacruz/items/686192/calendar/2025/12/?full-items=yes",
// ...
fareharborCalendarId: "686192",

// To:
price: "$45/person · Kids 12 & under free",
adultPrice: 45,
// (childPrice removed)
// ...
bookingUrl: "mailto:hello@walksantacruz.com?subject=Surf%20Walk%20Booking",
// (fareharborCalendarId removed)
```

Update FAQ answers: `"Kids 6–17 are $30 and kids 5 and under are free"` → `"Kids 12 and under are free with a paying adult."` and cancel policy language same as above.

- [ ] **Step 5: Update TourCard.astro — remove childPrice prop**

Replace the entire content of `src/components/TourCard.astro`:

```astro
---
import { Image } from "astro:assets";

interface Props {
  slug: string;
  title: string;
  image: ImageMetadata;
  imageAlt: string;
  adultPrice: number;
  imagePosition?: string;
}

const { slug, title, image, imageAlt, adultPrice, imagePosition = "object-center" } = Astro.props;
---

<a
  href={`/tours/${slug}`}
  data-astro-reload
  class="bg-card text-card-foreground flex flex-col rounded-xl border pb-0 shadow-sm hover:border-primary transition-all group block overflow-hidden"
  data-tour-card
  aria-label={`Learn more about ${title}`}
>
  <div class="overflow-hidden">
    <Image
      src={image}
      alt={imageAlt}
      class={`w-full h-48 object-cover ${imagePosition} group-hover:scale-105 transition-transform duration-300`}
      loading="lazy"
      quality={75}
    />
  </div>
  <div class="p-4">
    <h3 class="text-xl font-bold group-hover:text-primary transition-colors">
      {title}
    </h3>
    <p class="text-sm text-muted-foreground mt-1">${adultPrice}/person · Kids 12 & under free</p>
  </div>
</a>
```

- [ ] **Step 6: Verify build passes**

```bash
npm run build
```

Expected: Build completes with 0 errors. TypeScript will now error on any file that still references `tour.childPrice` or `tour.fareharborCalendarId` — fix those before proceeding.

- [ ] **Step 7: Commit**

```bash
git add src/data/tours.ts src/components/TourCard.astro
git commit -m "Remove FareHarbor fields and child pricing from tour data"
```

---

## Task 2: Create BookingCTA and PricingBlock components

**Files:**
- Create: `src/components/BookingCTA.astro`
- Create: `src/components/PricingBlock.astro`

**Interfaces:**
- Produces:
  - `BookingCTA` accepts `{ subject: string }`
  - `PricingBlock` accepts `{ customNote?: string }`

- [ ] **Step 1: Create BookingCTA.astro**

Create `src/components/BookingCTA.astro`:

```astro
---
interface Props {
  subject: string;
}
const { subject } = Astro.props;
const encodedSubject = encodeURIComponent(subject);
---

<div class="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center mb-12">
  <h3 class="text-2xl md:text-3xl font-bold mb-3">Ready to book?</h3>
  <p class="text-muted-foreground mb-2 max-w-md mx-auto">
    Email us with your preferred date and group size — we'll confirm availability and get you set up.
  </p>
  <p class="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
    Solos, couples, and small groups are welcome — you get the full private-group experience at the $180 flat rate.
  </p>
  <a
    href={`mailto:hello@walksantacruz.com?subject=${encodedSubject}`}
    class="btn btn-lg mb-4 inline-block"
  >
    Email to Reserve →
  </a>
  <p class="text-sm text-muted-foreground">
    Or call <a href="tel:8312752566" class="font-semibold text-foreground">(831) 275-2566</a>
  </p>
</div>
```

- [ ] **Step 2: Create PricingBlock.astro**

Create `src/components/PricingBlock.astro`:

```astro
---
interface Props {
  customNote?: string;
}
const { customNote } = Astro.props;
---

<div class="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
  <h3 class="text-xl font-bold mb-4">Pricing</h3>
  <div class="space-y-3">
    <div class="flex justify-between items-baseline gap-4 border-b border-primary/10 pb-3">
      <span class="text-muted-foreground">Adults (group of 4+)</span>
      <span class="font-semibold">$45 <span class="font-normal text-muted-foreground text-sm">per person</span></span>
    </div>
    <div class="flex justify-between items-baseline gap-4 border-b border-primary/10 pb-3">
      <span class="text-muted-foreground">Solo, couple, or trio</span>
      <span class="font-semibold">$180 <span class="font-normal text-muted-foreground text-sm">flat — full private-group experience</span></span>
    </div>
    <div class="flex justify-between items-baseline gap-4 border-b border-primary/10 pb-3">
      <span class="text-muted-foreground">Children 12 & under</span>
      <span class="font-semibold" style="color: #ed672d;">Free</span>
    </div>
    <div class="flex justify-between items-baseline gap-4">
      <span class="text-muted-foreground">Groups 8+ & corporate</span>
      <span class="font-semibold">Custom — <a href="mailto:hello@walksantacruz.com?subject=Tour%20Booking" class="text-primary underline">email for quote</a></span>
    </div>
  </div>
  {customNote && <p class="mt-4 text-sm text-muted-foreground italic">{customNote}</p>}
</div>
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 4: Commit**

```bash
git add src/components/BookingCTA.astro src/components/PricingBlock.astro
git commit -m "Add BookingCTA and PricingBlock reusable components"
```

---

## Task 3: Update Header navigation

**Files:**
- Modify: `src/components/Header.astro`

**Interfaces:**
- Consumes: existing nav link pattern in Header.astro

- [ ] **Step 1: Update the desktop Tours dropdown**

In the dropdown div (around line 43–58), add "Custom" as the 4th item after the `<div class="border-t">` divider, and remove the "Private Tours" item:

```astro
<div class="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
  <div class="py-2">
    <a href="/tours/surfing-beach-culture" data-astro-reload class={`block px-4 py-2 text-foreground hover:bg-muted hover:text-primary transition-colors ${currentPath === '/tours/surfing-beach-culture' ? 'font-bold text-primary' : ''}`}>
      Santa Cruz Surf Walk
    </a>
    <a href="/tours/downtown-mission-hill" data-astro-reload class={`block px-4 py-2 text-foreground hover:bg-muted hover:text-primary transition-colors ${currentPath === '/tours/downtown-mission-hill' ? 'font-bold text-primary' : ''}`}>
      Heart of Downtown
    </a>
    <a href="/tours/beach-hill-loop" data-astro-reload class={`block px-4 py-2 text-foreground hover:bg-muted hover:text-primary transition-colors ${currentPath === '/tours/beach-hill-loop' ? 'font-bold text-primary' : ''}`}>
      Beach Hill Loop
    </a>
    <div class="border-t border-border my-1"></div>
    <a href="/private-tours" class={`block px-4 py-2 text-foreground hover:bg-muted hover:text-primary transition-colors ${currentPath === '/private-tours' ? 'font-bold text-primary' : ''}`}>
      Custom Tours
    </a>
  </div>
</div>
```

- [ ] **Step 2: Update desktop nav links**

Replace the desktop nav links section. Change "Team Activities" label to "Corporate", remove the standalone "Private Tours" link, add "Contact" and "FAQ":

```astro
<a href="/team-offsites" class={`text-white font-medium pb-1 border-b-[3px] ${currentPath === '/team-offsites' ? 'font-bold border-[#ed672d]' : 'border-transparent'}`}>
  Corporate
</a>

<a href="/about" class={`text-white font-medium pb-1 border-b-[3px] ${currentPath === '/about' ? 'font-bold border-[#ed672d]' : 'border-transparent'}`}>
  About
</a>

<a href="/contact" class={`text-white font-medium pb-1 border-b-[3px] ${currentPath === '/contact' ? 'font-bold border-[#ed672d]' : 'border-transparent'}`}>
  Contact
</a>

<a href="/faq" class={`text-white font-medium pb-1 border-b-[3px] ${currentPath === '/faq' ? 'font-bold border-[#ed672d]' : 'border-transparent'}`}>
  FAQ
</a>

<a href="/#free-guide" data-astro-reload class="btn">Free Guide</a>
```

- [ ] **Step 3: Update mobile Tours dropdown**

In the mobile nav, add "Custom Tours" to the dropdown and remove "Private Tours" as standalone:

```astro
<a href="/tours/surfing-beach-culture" data-astro-reload class={`text-white ${currentPath === '/tours/surfing-beach-culture' ? 'font-bold' : ''}`}>
  Santa Cruz Surf Walk
</a>
<a href="/tours/downtown-mission-hill" data-astro-reload class={`text-white ${currentPath === '/tours/downtown-mission-hill' ? 'font-bold' : ''}`}>
  Heart of Downtown
</a>
<a href="/tours/beach-hill-loop" data-astro-reload class={`text-white ${currentPath === '/tours/beach-hill-loop' ? 'font-bold' : ''}`}>
  Beach Hill Loop
</a>
<a href="/private-tours" class={`text-white ${currentPath === '/private-tours' ? 'font-bold' : ''}`}>
  Custom Tours
</a>
```

- [ ] **Step 4: Update mobile top-level links**

Replace mobile "Team Activities" → "Corporate", remove "Private Tours", add "Contact" and "FAQ":

```astro
<a href="/team-offsites" class={`text-white font-medium ${currentPath === '/team-offsites' ? 'font-bold' : ''}`}>
  Corporate
</a>

<a href="/about" class={`text-white font-medium ${currentPath === '/about' ? 'font-bold' : ''}`}>
  About
</a>

<a href="/contact" class={`text-white font-medium ${currentPath === '/contact' ? 'font-bold' : ''}`}>
  Contact
</a>

<a href="/faq" class={`text-white font-medium ${currentPath === '/faq' ? 'font-bold' : ''}`}>
  FAQ
</a>
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 6: Commit**

```bash
git add src/components/Header.astro
git commit -m "Restructure nav: add Custom Tours, rename Corporate, add Contact + FAQ"
```

---

## Task 4: Create tours/index.astro — tours landing page

**Files:**
- Create: `src/pages/tours/index.astro`

**Interfaces:**
- Consumes: `tours` array from `src/data/tours.ts`, `PricingBlock` component, `BookingCTA` component

- [ ] **Step 1: Create the file**

Create `src/pages/tours/index.astro`:

```astro
---
import { Image } from "astro:assets";
import Layout from "../../layouts/Layout.astro";
import PricingBlock from "../../components/PricingBlock.astro";
import BookingCTA from "../../components/BookingCTA.astro";
import { tours } from "../../data/tours";
import mapBg from "../../assets/map-bg.jpg";
---

<Layout
  title="Walking Tours in Santa Cruz | Walk Santa Cruz"
  description="Four custom walking tours in Santa Cruz — Surf Walk, Heart of Downtown, Beach Hill Loop, and Custom. $45/person, kids 12 & under free. Email to reserve."
>
  <!-- Hero -->
  <section class="container pt-10 pb-8 md:pt-16 md:pb-12">
    <div class="max-w-3xl mx-auto text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">Our Tours</h1>
      <p class="text-xl text-muted-foreground leading-relaxed">
        Four custom walking experiences in Santa Cruz. Email us with your preferred tour, date, and group size — we'll confirm availability and get you set up.
      </p>
    </div>
  </section>

  <!-- Pricing -->
  <section class="container pb-8">
    <div class="max-w-2xl mx-auto">
      <PricingBlock />
    </div>
  </section>

  <!-- Tour Cards -->
  <section class="container pb-12 md:pb-20">
    <div class="max-w-5xl mx-auto">
      <div class="grid md:grid-cols-2 gap-6">
        {tours.map((tour) => (
          <a
            href={`/tours/${tour.slug}`}
            data-astro-reload
            class="card p-0 flex flex-col overflow-hidden group"
          >
            <div class="overflow-hidden">
              <Image
                src={tour.cardImage}
                alt={tour.cardImageAlt}
                class="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                quality={75}
              />
            </div>
            <div class="px-6 pt-4 pb-6 flex flex-col flex-1">
              <h2 class="text-xl font-bold mb-2">{tour.title}</h2>
              <p class="text-muted-foreground mb-4 flex-1">{tour.shortDescription}</p>
              <ul class="text-sm text-muted-foreground space-y-1 mb-5 [&_strong]:text-foreground">
                <li><strong>Duration:</strong> {tour.duration}</li>
                <li><strong>Schedule:</strong> {tour.schedule}</li>
                <li><strong>Price:</strong> {tour.price}</li>
              </ul>
              <span class="btn w-full text-center">Explore this tour →</span>
            </div>
          </a>
        ))}

        <!-- Custom Tours card -->
        <a
          href="/private-tours"
          class="card p-0 flex flex-col overflow-hidden group"
        >
          <div class="overflow-hidden bg-primary/10 flex items-center justify-center h-56">
            <div class="text-center p-8">
              <p class="text-5xl mb-3">🗺️</p>
              <p class="text-lg font-semibold text-primary">Build Your Own Tour</p>
            </div>
          </div>
          <div class="px-6 pt-4 pb-6 flex flex-col flex-1">
            <h2 class="text-xl font-bold mb-2">Custom Tours</h2>
            <p class="text-muted-foreground mb-4 flex-1">
              Not seeing exactly what you want? Tell us your vision — we'll design a route around your group's interests, timeline, and pace.
            </p>
            <ul class="text-sm text-muted-foreground space-y-1 mb-5 [&_strong]:text-foreground">
              <li><strong>Duration:</strong> Flexible</li>
              <li><strong>Schedule:</strong> On request</li>
              <li><strong>Price:</strong> Custom quote</li>
            </ul>
            <span class="btn w-full text-center">Design your tour →</span>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="container pb-16 md:pb-24">
    <div class="max-w-2xl mx-auto">
      <BookingCTA subject="Tour Booking" />
    </div>
  </section>
</Layout>
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: `/tours` now appears as a built page in dist output.

- [ ] **Step 3: Commit**

```bash
git add src/pages/tours/index.astro
git commit -m "Add /tours landing page with pricing and all four tour cards"
```

---

## Task 5: Update tours/[slug].astro — replace FareHarbor calendar

**Files:**
- Modify: `src/pages/tours/[slug].astro`

**Interfaces:**
- Consumes: `BookingCTA`, `PricingBlock` components; `tour.slug` for subject line mapping

- [ ] **Step 1: Add imports and subject line mapping**

At the top of the frontmatter in `src/pages/tours/[slug].astro`, add the new imports and subject map after the existing imports:

```astro
import BookingCTA from "../../components/BookingCTA.astro";
import PricingBlock from "../../components/PricingBlock.astro";
```

After `const tour = getTourBySlug(slug)!;` (or wherever the tour is resolved), add:

```astro
const subjectMap: Record<string, string> = {
  "surfing-beach-culture": "Surf Walk Booking",
  "downtown-mission-hill": "Heart of Downtown Booking",
  "beach-hill-loop": "Beach Hill Booking",
};
const bookingSubject = subjectMap[tour.slug] ?? "Tour Booking";
```

- [ ] **Step 2: Replace the FareHarbor calendar block**

Find the block that starts with `{/* FareHarbor Calendar */}` or `<!-- FareHarbor Calendar -->` (around line 257–271). Replace the entire conditional block:

```astro
<!-- REMOVE THIS ENTIRE BLOCK: -->
{tour.fareharborCalendarId && (
  <div class="mb-12 text-center">
    ...
  </div>
)}

<!-- REPLACE WITH: -->
<PricingBlock />
<BookingCTA subject={bookingSubject} />
```

- [ ] **Step 3: Update the Surf Walk Quick Questions block**

Find the Surf Walk "Quick Questions" block (around line 233–255). Remove the last two Q&A items ("How far in advance do I need to book?" and its answer mentioning FareHarbor availability + refund policy):

Keep only:
- "Do I need to surf to enjoy this tour?"
- "What should I wear?"
- "Is this OK for kids?" — update answer: change `"Kids 6–17 are $30 and kids 5 and under are free"` → `"Kids 12 and under are free with a paying adult."`

Remove:
- "How far in advance do I need to book?" (entire Q&A)

- [ ] **Step 4: Update any pricing display strings in the tour page**

Search for `$30` or `childPrice` references in `[slug].astro` outside the components above. If any remain, remove or update them to reflect "kids 12 & under free."

Also find the "See All Tours Availability" link (links to `/#book`) and remove it — the `#book` FareHarbor section no longer exists.

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: clean build, no TypeScript errors on missing `fareharborCalendarId`.

- [ ] **Step 6: Commit**

```bash
git add src/pages/tours/[slug].astro
git commit -m "Replace FareHarbor calendar on tour pages with PricingBlock + BookingCTA"
```

---

## Task 6: Update homepage (index.astro)

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Update hero headline and CTA**

Find the `<h1>` in the hero section (around line 86–89). Replace:

```astro
<!-- REMOVE: -->
<h1 ...>
  Santa Cruz<br class="sm:hidden" /> Walking Tours<br />with Local Guides
</h1>

<!-- REPLACE WITH: -->
<h1
  class="text-[calc((100vw_-_1.5rem)/9.6)] leading-[1.05] sm:text-[2.6rem] sm:leading-none md:text-6xl lg:text-7xl xl:text-[6rem] font-bold mb-3 md:mb-6 text-white drop-shadow-md px-3 md:px-0"
>
  Custom Walking Tours<br />in Santa Cruz
</h1>
```

Find the hero CTA button area (around line 95–99). Replace:

```astro
<!-- REMOVE: -->
<div class="flex flex-col items-center gap-3">
  <a href="#tours" class="btn btn-lg xl:h-[60px] xl:px-9 xl:text-[1.3rem]">Book Your Tour Now</a>
</div>

<!-- REPLACE WITH: -->
<div class="flex flex-col sm:flex-row items-center justify-center gap-3">
  <a
    href="mailto:hello@walksantacruz.com?subject=Tour%20Booking"
    class="btn btn-lg xl:h-[60px] xl:px-9 xl:text-[1.3rem]"
  >
    Email to Reserve →
  </a>
  <a
    href="#tours"
    class="btn btn-lg xl:h-[60px] xl:px-9 xl:text-[1.3rem] btn-secondary"
  >
    View Tours
  </a>
</div>
```

- [ ] **Step 2: Update tour card pricing text**

In each of the 3 inline tour cards on the homepage, find and update the `<li>` showing price info:

```astro
<!-- REMOVE in all 3 cards: -->
<li>
  <strong>Price:</strong> $45 adult · $30 child · Kids 5 &amp; under free
</li>

<!-- REPLACE WITH: -->
<li>
  <strong>Price:</strong> $45/person · Kids 12 &amp; under free · Solo/couple/trio: $180 flat
</li>
```

- [ ] **Step 3: Add Custom Tours as 4th card**

After the closing `</div>` of the `md:grid-cols-2` secondary tours grid (around line 270), add a new Custom Tours card before the closing `</div>` of the max-w-5xl container:

```astro
<!-- Custom Tours card — add to the secondary tours grid as 3rd item -->
<!-- Change the grid from md:grid-cols-2 to md:grid-cols-3 -->
```

Update `<div class="grid md:grid-cols-2 gap-8 mt-10">` → `<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">`, then add:

```astro
<!-- Card 4: Custom Tours -->
<a
  href="/private-tours"
  class="card p-0 flex flex-col overflow-hidden group"
>
  <div class="overflow-hidden bg-primary/10 flex items-center justify-center h-56">
    <div class="text-center p-6">
      <p class="text-5xl mb-2">🗺️</p>
      <p class="font-semibold text-primary">Build Your Own</p>
    </div>
  </div>
  <div class="px-6 pt-3 pb-6 flex flex-col flex-1">
    <span class="self-start text-xs font-bold uppercase tracking-widest rounded-full px-3 py-1 mb-3" style="background-color: #d0eef5; color: #007a99;">Your vision, your route</span>
    <h3 class="text-xl font-bold mb-3">Custom Tours</h3>
    <p class="text-muted-foreground mb-4 flex-1">
      Design your own walk — surf history, architecture, food, filming locations, or anything in between.
    </p>
    <ul class="text-sm text-muted-foreground space-y-1 mb-6 [&_strong]:text-foreground">
      <li><strong>Best for:</strong> groups with a specific vision</li>
      <li><strong>Duration:</strong> Flexible</li>
      <li><strong>Price:</strong> Custom quote</li>
    </ul>
    <span class="btn w-full md:w-auto text-center">Design your tour →</span>
  </div>
</a>
```

- [ ] **Step 4: Remove the FareHarbor #book section**

Find and delete the entire `<section id="book" ...>` block (from the opening `<section id="book"` tag to its closing `</section>`). This section contains the FareHarbor calendar script and the "Ready to Book?" heading. Replace with a simple CTA section:

```astro
<!-- Replace the entire #book section with: -->
<section class="container pt-4 pb-16 md:pt-4 md:pb-24">
  <div class="max-w-2xl mx-auto text-center">
    <h3 class="text-2xl md:text-3xl font-bold mb-4">Ready to book your tour?</h3>
    <p class="text-muted-foreground mb-6">
      Email us with your preferred tour, date, and group size — we'll confirm availability and get you set up.
    </p>
    <a
      href="mailto:hello@walksantacruz.com?subject=Tour%20Booking"
      class="btn btn-lg"
    >
      Email to Reserve →
    </a>
    <p class="text-sm text-muted-foreground mt-4">
      Or call <a href="tel:8312752566" class="font-semibold text-foreground">(831) 275-2566</a>
    </p>
  </div>
</section>
```

- [ ] **Step 5: Hide Gift Cards section**

Find the Gift Cards section (the teal full-bleed section with "🎁 Gift Cards"). Wrap the entire `<section>` in an HTML comment:

```astro
<!-- GIFT CARDS HIDDEN — restore by removing these comment tags
<section class="full-bleed py-16 md:py-20" style="background-color: #007a99;">
  ...
</section>
-->
```

- [ ] **Step 6: Update Partner Perks redemption copy**

Find the text `"show your tour confirmation"` (or `"Show your tour confirmation"`) in the Partner Perks section. Update to:

```
Show your tour confirmation email to redeem.
```

(Search for all occurrences — there may be one in the section intro and one in individual partner blocks.)

- [ ] **Step 7: Verify build**

```bash
npm run build
```

Expected: clean build, gift card section gone from output.

- [ ] **Step 8: Commit**

```bash
git add src/pages/index.astro
git commit -m "Homepage: update hero, pricing, add Custom card, remove FareHarbor, hide gift cards"
```

---

## Task 7: Repurpose private-tours.astro as Custom Tours

**Files:**
- Modify: `src/pages/private-tours.astro`

- [ ] **Step 1: Update page metadata and heading**

In the frontmatter `<Layout>` call, update:

```astro
<Layout
  title="Custom Tours - Design Your Own Santa Cruz Experience | Walk Santa Cruz"
  description="Design a custom walking tour in Santa Cruz. Tell us your vision — surf history, architecture, food, filming locations, or anything in between. We'll build it around your group."
>
```

Update the `<h1>`:
```astro
<!-- REMOVE: -->
<h1 class="text-4xl md:text-5xl font-bold mb-4">Your Santa Cruz. Your Schedule. Your Story.</h1>

<!-- REPLACE WITH: -->
<h1 class="text-4xl md:text-5xl font-bold mb-4">Custom Tours</h1>
<p class="text-2xl text-muted-foreground font-medium mb-2">Design your own Santa Cruz experience.</p>
```

- [ ] **Step 2: Replace the old pricing block**

Find the pricing block div (`<div class="bg-primary/5 border border-primary/20 ...">` containing `Starts at $250 for up to 6 guests`). Replace it entirely with:

```astro
<div class="bg-primary/5 border border-primary/20 rounded-xl px-6 py-5 mb-8">
  <p class="font-bold text-foreground mb-1">Pricing</p>
  <p class="text-muted-foreground">
    Custom pricing based on your group, interests, and vision. Solo travelers, couples, and small groups welcome — we'll provide a quote based on your needs.
    <a href="mailto:hello@walksantacruz.com?subject=Custom%20Tour%20Inquiry" class="text-primary underline ml-1">Email us to get started.</a>
  </p>
</div>
```

- [ ] **Step 3: Replace the booking form with email CTA + optional form**

Find the `<!-- Contact/Booking Section -->` section at the bottom. Replace the heading and the form:

```astro
<section class="container py-12 md:py-16">
  <div class="max-w-2xl mx-auto">
    <div class="text-center mb-10">
      <h2 class="text-3xl md:text-4xl font-bold mb-4" id="contact">
        Tell Us Your Vision
      </h2>
      <p class="text-xl text-muted-foreground">
        Email us with your group size, preferred date, and what you'd like to explore.
      </p>
    </div>

    <!-- Primary: email CTA -->
    <div class="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center mb-10">
      <a
        href="mailto:hello@walksantacruz.com?subject=Custom%20Tour%20Inquiry"
        class="btn btn-lg mb-4 inline-block"
      >
        Email to Get Started →
      </a>
      <p class="text-sm text-muted-foreground">
        Or call <a href="tel:8312752566" class="font-semibold text-foreground">(831) 275-2566</a>
      </p>
    </div>

    <!-- Secondary: optional inquiry form -->
    <details class="group">
      <summary class="cursor-pointer text-center text-primary font-semibold mb-6 list-none flex items-center justify-center gap-2">
        <span>Or fill out a quick form and we'll reach out to you</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-open:rotate-180"><path d="m6 9 6 6 6-6"/></svg>
      </summary>

      <form
        name="custom-tour"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        class="form space-y-5 pt-4"
      >
        <input type="hidden" name="form-name" value="custom-tour" />
        <p class="hidden"><label>Don't fill this out: <input name="bot-field" /></label></p>

        <div>
          <label for="name" class="block font-semibold mb-2">Name *</label>
          <input type="text" id="name" name="name" required class="w-full" />
        </div>
        <div>
          <label for="email" class="block font-semibold mb-2">Email *</label>
          <input type="email" id="email" name="email" required class="w-full" />
        </div>
        <div>
          <label for="groupsize" class="block font-semibold mb-2">Group size</label>
          <input type="text" id="groupsize" name="group-size" placeholder="e.g. 2 adults, 1 child" class="w-full" />
        </div>
        <div>
          <label for="date" class="block font-semibold mb-2">Preferred date</label>
          <input type="text" id="date" name="preferred-date" placeholder="e.g. July 15 or any Tuesday in August" class="w-full" />
        </div>
        <div>
          <label for="interests" class="block font-semibold mb-2">What would you like to explore? *</label>
          <textarea
            id="interests"
            name="interests"
            rows="4"
            required
            placeholder="Surf history, Victorian architecture, filming locations, food tour, UCSC campus, nature walk..."
            class="w-full"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-lg w-full">Send Inquiry</button>
      </form>
    </details>

  </div>
</section>
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 5: Commit**

```bash
git add src/pages/private-tours.astro
git commit -m "Repurpose private-tours as Custom Tours with email CTA and optional form"
```

---

## Task 8: Update team-offsites.astro — Corporate page

**Files:**
- Modify: `src/pages/team-offsites.astro`

- [ ] **Step 1: Add email CTA and Stripe note**

Read the current content of `src/pages/team-offsites.astro` fully. Find the `<!-- Contact/Booking Section -->` or the `id="contact"` anchor. If there's a form, replace it. If there's just a CTA button, update it.

Add this section before the closing `</Layout>` tag (or replace any existing contact/form section):

```astro
<section class="container py-12 md:py-16" id="contact">
  <div class="max-w-2xl mx-auto">
    <div class="text-center mb-8">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
      <p class="text-xl text-muted-foreground">
        Tell us about your group — we'll put together an experience worth talking about.
      </p>
    </div>

    <div class="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center mb-8">
      <p class="text-muted-foreground mb-6">
        Email us with your company/group name, group size, preferred date, and goals.
      </p>
      <a
        href="mailto:hello@walksantacruz.com?subject=Team%20Tour%20Inquiry"
        class="btn btn-lg mb-4 inline-block"
      >
        Email to Get Started →
      </a>
      <p class="text-sm text-muted-foreground">
        Or call <a href="tel:8312752566" class="font-semibold text-foreground">(831) 275-2566</a>
      </p>
    </div>

    <div class="bg-muted/50 rounded-xl p-6 text-sm text-muted-foreground">
      <p class="font-semibold text-foreground mb-1">Payment for corporate bookings</p>
      <p>After we confirm your booking, we'll send a custom Stripe invoice — easy for team expense submissions. We also accept Venmo, Zelle, and other common payment methods.</p>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/team-offsites.astro
git commit -m "Corporate page: add email CTA and Stripe payment note"
```

---

## Task 9: Update faq.astro

**Files:**
- Modify: `src/pages/faq.astro`

- [ ] **Step 1: Add 5 new booking Q&A cards at the top**

After the FAQ image block and before the existing first card (`<!-- Parking -->`), insert these 5 new cards:

```astro
<!-- How to book -->
<div class="card p-6 md:p-8">
  <h2 class="text-2xl font-bold mb-4 flex items-start gap-3">
    <Icon name="lucide:mail" class="w-6 h-6 text-primary mt-1 flex-shrink-0" />
    <span>How do I book a tour?</span>
  </h2>
  <div class="prose prose-lg max-w-none text-muted-foreground ml-9">
    <p>
      Email us at <a href="mailto:hello@walksantacruz.com?subject=Tour%20Booking" class="text-primary hover:underline">hello@walksantacruz.com</a> with your preferred tour, date, and group size. We'll confirm availability and arrange payment details directly with you. No booking platform, no calendar widget — just a quick email and you're set.
    </p>
  </div>
</div>

<!-- Small groups -->
<div class="card p-6 md:p-8">
  <h2 class="text-2xl font-bold mb-4 flex items-start gap-3">
    <Icon name="lucide:users" class="w-6 h-6 text-primary mt-1 flex-shrink-0" />
    <span>What if my group is smaller than 4 people?</span>
  </h2>
  <div class="prose prose-lg max-w-none text-muted-foreground ml-9">
    <p>
      No problem — solos, couples, and trios are warmly welcome. The minimum tour cost is $180 (the 4-person rate at $45/person), which means you get the full private-group experience: a knowledgeable guide, relaxed pace, and the full route — just for your group. Kids 12 and under are always free.
    </p>
  </div>
</div>

<!-- Payment methods -->
<div class="card p-6 md:p-8">
  <h2 class="text-2xl font-bold mb-4 flex items-start gap-3">
    <Icon name="lucide:credit-card" class="w-6 h-6 text-primary mt-1 flex-shrink-0" />
    <span>What payment methods do you accept?</span>
  </h2>
  <div class="prose prose-lg max-w-none text-muted-foreground ml-9">
    <p>
      For individual and group tours, we arrange payment directly via email after your booking is confirmed. We accept Venmo, Zelle, and other common payment methods. For team activities and large group bookings, we can also send custom Stripe invoices — just mention it when you email.
    </p>
  </div>
</div>

<!-- Tour options -->
<div class="card p-6 md:p-8">
  <h2 class="text-2xl font-bold mb-4 flex items-start gap-3">
    <Icon name="lucide:map" class="w-6 h-6 text-primary mt-1 flex-shrink-0" />
    <span>What tours do you offer?</span>
  </h2>
  <div class="prose prose-lg max-w-none text-muted-foreground ml-9">
    <p>
      We offer four custom walking tours: the <a href="/tours/surfing-beach-culture" class="text-primary hover:underline">Santa Cruz Surf Walk</a>, <a href="/tours/downtown-mission-hill" class="text-primary hover:underline">Heart of Downtown</a>, <a href="/tours/beach-hill-loop" class="text-primary hover:underline">Beach Hill Loop</a>, and <a href="/private-tours" class="text-primary hover:underline">Custom Tours</a> — where we design a route around your group's interests. For team offsites and corporate groups, visit the <a href="/team-offsites" class="text-primary hover:underline">Corporate page</a>.
    </p>
  </div>
</div>

<!-- Custom tours -->
<div class="card p-6 md:p-8">
  <h2 class="text-2xl font-bold mb-4 flex items-start gap-3">
    <Icon name="lucide:wand" class="w-6 h-6 text-primary mt-1 flex-shrink-0" />
    <span>Can I book a custom or private tour?</span>
  </h2>
  <div class="prose prose-lg max-w-none text-muted-foreground ml-9">
    <p>
      Absolutely. All our tours are personal experiences — but if you want something fully tailored to your group, check out our <a href="/private-tours" class="text-primary hover:underline">Custom Tours page</a> or email us with your vision. We'll design a route around your interests, timeline, and group size.
    </p>
  </div>
</div>
```

- [ ] **Step 2: Update the cancellation policy card**

Find the `<!-- Cancellation -->` card. Replace the answer text:

```astro
<!-- REMOVE: -->
<p>
  We offer a full refund for cancellations made 24 or more hours before the tour start time. Cancellations within 24 hours are not eligible for a refund.
</p>

<!-- REPLACE WITH: -->
<p>
  If you need to cancel or reschedule, email us as early as possible and we'll do our best to accommodate. We're a small operation and appreciate the heads-up.
</p>
```

- [ ] **Step 3: Update the kids FAQ card**

Find the `<!-- Kids -->` card. Update the child pricing line:

```astro
<!-- REMOVE: -->
<p class="mt-4">
  Children ages 6–17 are $30, and kids 5 and under are free with a paid adult ticket.
</p>

<!-- REPLACE WITH: -->
<p class="mt-4">
  Kids 12 and under are free with a paying adult — no ticket purchase needed for them.
</p>
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/pages/faq.astro
git commit -m "FAQ: add 5 booking Q&As, update cancellation policy and kids pricing"
```

---

## Task 10: Cleanup pass — gallery, BookingModal, Layout, contact

**Files:**
- Modify: `src/pages/gallery.astro`
- Modify: `src/components/BookingModal.astro`
- Modify: `src/layouts/Layout.astro`
- Modify: `src/pages/contact.astro`

- [ ] **Step 1: Update gallery.astro**

Find the CTA section at the bottom of `src/pages/gallery.astro` (around lines 172–177). Replace:

```astro
<!-- REMOVE: -->
<div class="flex flex-col sm:flex-row gap-4 justify-center">
  <!-- FareHarbor book button -->
  <a href="https://fareharbor.com/embeds/book/walksantacruz/?full-items=yes" class="btn btn-lg">Book a Tour</a>
  <!-- Stripe (disabled): ... -->
  <a href="/private-tours" class="btn btn-lg btn-secondary">Book a Private Tour</a>
</div>

<!-- REPLACE WITH: -->
<div class="flex flex-col sm:flex-row gap-4 justify-center">
  <a href="mailto:hello@walksantacruz.com?subject=Tour%20Booking" class="btn btn-lg">Email to Reserve →</a>
  <a href="/tours" class="btn btn-lg btn-secondary">View All Tours</a>
</div>
```

- [ ] **Step 2: Update BookingModal.astro**

Replace the FareHarbor link inside the modal:

```astro
<!-- REMOVE: -->
<div class="bg-muted/50 rounded-lg p-6 text-center">
  <!-- FareHarbor book button -->
  <a href="https://fareharbor.com/embeds/book/walksantacruz/?full-items=yes" class="btn btn-lg">Book a Tour</a>
  <!-- Stripe (disabled): ... -->
</div>

<!-- REPLACE WITH: -->
<div class="bg-muted/50 rounded-lg p-6 text-center">
  <p class="text-muted-foreground mb-4">Email us with your preferred tour, date, and group size.</p>
  <a href="mailto:hello@walksantacruz.com?subject=Tour%20Booking" class="btn btn-lg">Email to Reserve →</a>
  <p class="text-sm text-muted-foreground mt-3">
    Or call <a href="tel:8312752566" class="font-semibold text-foreground">(831) 275-2566</a>
  </p>
</div>
```

- [ ] **Step 3: Remove FareHarbor script from Layout.astro**

Open `src/layouts/Layout.astro`, find the commented-out FareHarbor Lightframe API script block (around lines 239–240):

```html
<!-- FareHarbor Lightframe API - DISABLED FOR NOW - Uncomment when ready to use FareHarbor -->
<!-- <script src="https://fareharbor.com/embeds/api/v1/?autolightframe=yes"></script> -->
```

Delete both lines entirely.

- [ ] **Step 4: Update contact.astro intro copy**

In `src/pages/contact.astro`, find the hero subheading:

```astro
<!-- REMOVE: -->
<p class="text-xl text-muted-foreground">
  Questions? Want to book a private tour or team offsite? We'd love to hear from you.
</p>

<!-- REPLACE WITH: -->
<p class="text-xl text-muted-foreground">
  To book a tour, email us with your tour choice, preferred date, and group size — we'll confirm availability and get you set up. For general questions, press inquiries, or partnerships, use the form below.
</p>
```

- [ ] **Step 5: Final build verification**

```bash
npm run build 2>&1 | grep -E "error|warning|Error|Warning|fareharbor|FareHarbor"
```

Expected: zero matches. Then run the full build clean:

```bash
npm run build
```

Expected: 15+ pages built, 0 errors.

- [ ] **Step 6: Grep for any remaining FareHarbor references**

```bash
grep -rn "fareharbor\|FareHarbor" src/ --include="*.astro" --include="*.ts"
```

Expected: zero results. If any remain, fix them before committing.

- [ ] **Step 7: Final commit**

```bash
git add src/pages/gallery.astro src/components/BookingModal.astro src/layouts/Layout.astro src/pages/contact.astro
git commit -m "Cleanup: remove FareHarbor from gallery, modal, layout, and contact page"
```

---

## Post-Implementation Checklist

Before pushing, verify each of these manually with `npm run dev`:

- [ ] `/` — hero says "Custom Walking Tours in Santa Cruz", email CTA visible, gift cards section gone, partner perks say "confirmation email"
- [ ] `/tours` — new landing page loads with pricing table and 4 cards
- [ ] `/tours/surfing-beach-culture` — no FareHarbor calendar, PricingBlock and BookingCTA visible
- [ ] `/tours/downtown-mission-hill` — same as above
- [ ] `/tours/beach-hill-loop` — same as above
- [ ] `/private-tours` — heading is "Custom Tours", email CTA is primary, form is under a disclosure triangle
- [ ] `/team-offsites` — email CTA present, Stripe mention in payment section
- [ ] `/faq` — 5 new Q&As at top, cancellation policy updated, kids pricing updated
- [ ] `/gallery` — no FareHarbor button, mailto CTA present
- [ ] `/contact` — intro copy updated
- [ ] Nav — "Corporate" label, no "Private Tours" standalone item, Custom in Tours dropdown, Contact + FAQ visible
- [ ] All mailto links open with correct pre-filled subject lines
- [ ] No broken links (`npm run build` is clean)
- [ ] Mobile nav works correctly
