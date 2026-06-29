# Design Spec: FareHarbor Removal + Email Booking Pivot
**Date:** 2026-06-29  
**Status:** Approved for implementation

---

## Overview

Remove all FareHarbor integrations and pivot to a direct email booking model. The site shifts from platform-mediated bookings to a personal, email-first experience. Four equal tour options (Surf Walk, Heart of Downtown, Beach Hill Loop, Custom) replace the old Group/Private split. All existing URLs are preserved — pages are updated in place.

---

## Pricing Model

| Audience | Price | Notes |
|---|---|---|
| Children 12 & under | FREE | No purchase needed |
| Adults, group of 4+ | $45/person | Standard rate |
| Solo / couple / trio | $180 flat | 4-person minimum guarantee — same great tour, just the flat rate |
| Groups 8+ & Corporate | Custom | Email for quote |

**Messaging principle:** Solos, couples, and trios are actively welcomed. Copy never frames the $180 as a penalty — it's framed as "you get the full private-group experience at the same price."

**Payment:** Venmo, Zelle, or other methods arranged via email after booking. Stripe mentioned only on the Corporate page.

---

## Availability / Scheduling Language

Never say "on-demand." Accurate framing: tours run on a set weekly schedule; email to check availability and reserve your date. Suggested copy: *"Email us with your preferred date and group size — we'll confirm availability and get you set up."*

Current schedule (keep visible where relevant):
- Surf Walk: Mon–Thu at 10am
- Heart of Downtown: Wed–Thu at 1pm  
- Beach Hill Loop: Mon–Tue at 1pm

---

## Navigation (Updated)

**Desktop + Mobile nav:**
```
Home | Tours ▾ | Corporate | About | Free Guide | Contact | FAQ
```

**Tours dropdown:**
- Surf Walk → `/tours/surfing-beach-culture`
- Heart of Downtown → `/tours/downtown-mission-hill`
- Beach Hill Loop → `/tours/beach-hill-loop`
- Custom → `/private-tours`

**Changes from current nav:**
- "Team Activities" label → "Corporate" (URL `/team-offsites` unchanged)
- "Private Tours" standalone item removed
- "Custom" added to Tours dropdown (points to `/private-tours`)
- "Contact" and "FAQ" added as top-level items

---

## Email CTAs — Subject Lines

| Page | Subject Line |
|---|---|
| Surf Walk | `Surf Walk Booking` |
| Heart of Downtown | `Heart of Downtown Booking` |
| Beach Hill Loop | `Beach Hill Booking` |
| Custom Tours | `Custom Tour Inquiry` |
| Corporate | `Team Tour Inquiry` |
| Homepage / General | `Tour Booking` |

All CTAs point to `hello@walksantacruz.com`. Phone `(831) 275-2566` visible but secondary.

---

## File-by-File Changes

### `src/components/Header.astro`
- Tours dropdown: add "Custom" as 4th item → `/private-tours`
- Remove "Private Tours" standalone nav link (desktop + mobile)
- Rename "Team Activities" label → "Corporate"
- Add "Contact" (`/contact`) and "FAQ" (`/faq`) to desktop + mobile nav

### `src/data/tours.ts`
- Remove `fareharborCalendarId` field from `Tour` interface and all 3 tour objects
- Remove FareHarbor `bookingUrl` values — replace with per-tour mailto strings
- Remove `childPrice` field (no paid child tier; kids 12 & under free)
- Update `price` string: `"$45/person · Kids 12 & under free"`

### `src/pages/index.astro`
- **Hero:** Update headline to "Custom Walking Tours in Santa Cruz" and subhead to reflect check-availability-via-email model (not "on-demand"). Swap hero CTA from `#tours` scroll to `mailto:hello@walksantacruz.com?subject=Tour%20Booking`.
- **Tours section:** Add a 4th "Custom Tours" card alongside the 3 existing tour cards. Each card's CTA becomes a tour-specific mailto link instead of "Explore this tour →" on the card — keep the card link to the tour page, add an email button.
- **Pricing:** The homepage card list items showing `$45 adult · $30 child · Kids 5 & under free` → update to `$45/person · Kids 12 & under free · Solo/couple/trio: $180 flat`.
- **`#book` section:** Remove the entire FareHarbor calendar section. Replace with a simple pricing summary + general email CTA.
- **Gift Cards section:** Wrap in HTML comment `<!-- GIFT CARDS HIDDEN -->` for easy future restore.
- **Partner perks section:** Update "show your tour confirmation" → "show your tour confirmation email".

### `src/pages/tours/[slug].astro`
- **Replace FareHarbor calendar block** with:
  1. **Pricing box** — styled card showing the pricing table
  2. **Email CTA block** — "Ready to book? Email us at hello@walksantacruz.com with your preferred date and group size." with a mailto button (tour-specific subject), plus phone number
- **Update pricing display** site-wide: child price $30 → kids 12 & under free
- **Surf Walk "Quick Questions" block:** Remove "How far in advance do I need to book?" question (references FareHarbor availability logic). Remove "Full refund if you cancel 24+ hours" language.
- **Per-tour FAQ content:** Audit each tour's FAQs for FareHarbor/cancellation/child-pricing references and update (the FAQs in `tours.ts` mention $30 child and cancellation policies).

### `src/pages/private-tours.astro` → Custom Tours
- Update page `<title>`, meta description, and `<h1>` to "Custom Tours"
- Keep the "What We Can Build for You" themed sections (fits Custom Tours perfectly)
- Keep the photo gallery
- Remove old pricing block (`$250 for up to 6 guests` etc.)
- Replace the booking form with:
  1. **Primary:** email CTA block with subject "Custom Tour Inquiry"
  2. **Secondary (optional):** lightweight inquiry form — Name, Email, Group size, Preferred date, Tour concept/interests. Label it "Or fill this out and we'll reach out to you." Form helps qualify leads; not required. Keep Netlify form handling.
- Add pricing note: "Custom pricing based on your group, interests, and vision. Email us — we'll put something together."

### `src/pages/team-offsites.astro` → Corporate
- Update `<h1>` if it still says anything private-tour-adjacent (currently fine — says "Team Activities")
- Remove any FareHarbor links
- Add email CTA block with subject "Team Tour Inquiry"
- Add payment note (Stripe only here): "For corporate bookings we send custom Stripe invoices — easy for team expense submissions."

### `src/pages/faq.astro`
- Add 5 new Q&A cards at the top (before parking):
  1. How do I book a tour?
  2. What if my group is smaller than 4 people? (welcome, $180 flat, not a penalty)
  3. What payment methods do you accept?
  4. What are my tour options?
  5. Can I book a custom/private tour?
- Update "cancellation policy" card: remove 24-hour FareHarbor language. New copy: "If you need to cancel or reschedule, just email us as early as possible and we'll do our best to accommodate."
- Update kids FAQ card: "Children ages 6–17 are $30" → "Kids 12 and under are free with a paying adult."

### `src/pages/gallery.astro`
- Remove FareHarbor "Book a Tour" button
- Replace with `mailto:hello@walksantacruz.com?subject=Tour%20Booking` CTA button

### `src/components/BookingModal.astro`
- Remove FareHarbor link. Replace with mailto CTA, or remove the component entirely if nothing else uses it.

### `src/layouts/Layout.astro`
- Remove the commented-out FareHarbor Lightframe API script block entirely.

### New: `src/pages/tours/index.astro`
- New tours landing page at `/tours`
- Sections: intro ("Four custom walking tours in Santa Cruz"), full pricing table, 4 tour cards (matching homepage card style), general email CTA at bottom
- This is the canonical "all tours + pricing" page linked from nav and cross-linked from tour pages

### `src/pages/contact.astro`
- Keep the general inquiry form (useful for press/partnerships)
- Update intro copy: "To book a tour, email us with your tour choice, preferred date, and group size — we'll confirm availability and get you set up."
- Ensure no FareHarbor references

---

## What's Not Changing
- All tour descriptions and storytelling copy in `tours.ts`
- Tour page structure (hero, itinerary, highlights, includes, gallery, FAQ sections)
- Reviews carousel and platform attribution logos
- Lead magnet / "3 Perfect Days" newsletter component
- About, Guide, Partners, Privacy, Signature Experience pages
- Footer structure and social links
- Signature Experience page (unchanged, still not in nav)

---

## Scope Notes
- No URL changes — all existing pages updated in place
- No new assets needed
- `fareharborCalendarId` and `childPrice` fields removed from Tour type — TypeScript will catch any remaining references at build time
- Gift cards section preserved in HTML comments for future restore
