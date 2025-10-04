# Claude Code Rulebook: Walking Tour Marketing Site

## Tech Stack Requirements

### ✅ REQUIRED Stack
- **Astro** (latest stable version)
- **Tailwind CSS 4+** (v4.x only - NO v3.x or older)
- **Basecoat UI** (latest version from basecoatui.com)
- **Vanilla JavaScript** (for interactivity) or **Alpine.js** (lightweight library if needed)
- **Custom orangey theme** (shadcn format - directly compatible with Basecoat UI)

### ❌ FORBIDDEN Technologies (By Default)
- **NO React** - unless explicitly requested for a specific Astro island component
- **NO Tailwind v3.x or older**
- **NO Vue, Svelte, or other JS frameworks** - unless explicitly requested
- **NO heavy JavaScript libraries** - prefer vanilla JS or Alpine.js for interactivity

### 🏝️ Exception: Framework Islands
- React (or other frameworks) may ONLY be used if explicitly requested for an Astro island
- Example: "Add a React component for the interactive tour calendar"
- **Never add React by default** - always use vanilla JS/Alpine.js/Astro first
- Keep islands minimal and isolated
- Document why the island is needed

### ✅ Allowed Lightweight Libraries
- **Alpine.js** - lightweight (~15kb), pairs well with Basecoat UI
- Use Alpine for interactive UI (dropdowns, modals, tabs) when vanilla JS becomes verbose
- Basecoat components work seamlessly with Alpine

## Architecture Rules

### File Structure
```
/src
  /components     # Reusable Astro components
  /layouts        # Page layouts
  /pages          # Routes (index.astro, tours.astro, etc.)
  /styles         # Global CSS, Tailwind config, theme
  /assets         # Images, fonts
```

### Component Guidelines
1. **Use Astro components** (`.astro` files) for everything
2. **Leverage Basecoat UI classes** - prefer `btn`, `card`, `form`, `input` over custom utility soup
3. **Keep HTML semantic** - proper heading hierarchy, alt text, ARIA labels
4. **Component props over duplication** - make reusable components
5. **No inline styles** - use Tailwind utilities or CSS variables

### Basecoat UI Integration
- Import Basecoat CSS in your main layout
- Use Basecoat component classes: `btn`, `btn-outline`, `card`, `form`, `input`, `badge`, etc.
- Add Basecoat JS only for interactive components (modals, dropdowns, tabs)
- Basecoat uses minimal vanilla JS for interactivity - works well with Alpine.js if needed
- Refer to [basecoatui.com](https://basecoatui.com) docs for component usage

### Styling Approach
1. **Primary**: Custom orange theme in shadcn format (uses CSS variables, directly compatible with Basecoat UI)
2. **Secondary**: Basecoat UI component classes
3. **Tertiary**: Tailwind 4 utilities for layout/spacing
4. **Avoid**: Long chains of utility classes - prefer Basecoat's semantic classes

### JavaScript Guidelines
- **Default**: Vanilla JavaScript for simple interactivity
- **Optional**: Alpine.js for more complex interactive components (lightweight, pairs well with Basecoat)
- **Minimal JS**: Keep JavaScript usage minimal - leverage Astro's static-first approach
- **Progressive Enhancement**: Start with HTML/CSS, add JS only where necessary

## Third-Party Integrations

### FareHarbor Booking System
- **Purpose**: External booking/reservation system
- **Implementation**: Book buttons link to FareHarbor booking pages
- **Button Pattern**:
```html
<a href="https://fareharbor.com/embeds/book/[company-shortname]/items/[item-id]/" 
   class="btn" 
   target="_blank" 
   rel="noopener noreferrer">
  Book This Tour
</a>
```
- FareHarbor URLs will be provided per tour
- Do not build custom booking forms - all booking handled by FareHarbor

### Netlify Forms
- **Purpose**: Contact form submissions
- **Implementation**: Use Netlify's form handling (no backend needed)
- **Form Pattern**:
```html
<form name="contact" method="POST" data-netlify="true" class="form">
  <input type="hidden" name="form-name" value="contact" />
  
  <div>
    <label for="name">Name</label>
    <input type="text" id="name" name="name" required />
  </div>
  
  <div>
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required />
  </div>
  
  <div>
    <label for="message">Message</label>
    <textarea id="message" name="message" rows="5" required></textarea>
  </div>
  
  <button type="submit" class="btn">Send Message</button>
</form>
```
- Add honeypot field for spam protection: `<input type="hidden" name="bot-field" />`
- Forms automatically work when deployed to Netlify

## Project-Specific Requirements

### Site Purpose
Landing page funnel and marketing site for a walking tour business

### Production Details
- **Domain**: walksantacruz.com
- **Business Owner/Guide**: Matt O'Leary
- **Booking System**: FareHarbor (external - book buttons link to FareHarbor)
- **Contact Form**: Netlify Forms integration
- **Images**: Use placeholders initially until real tour photos are provided
- **Theme**: Custom orange palette in shadcn format (directly compatible with Basecoat UI)

### Key Pages/Sections Needed
- Hero section with booking CTA
- Tour listings/cards
- Booking buttons (link to FareHarbor)
- About section (Guide: Matt O'Leary)
- Testimonials/reviews
- Contact form (Netlify Forms)
- Gallery (tour photos - placeholders initially)

### Performance Requirements
- Minimal JavaScript (Astro defaults to zero JS)
- Optimized images (use Astro's Image component)
- Fast page loads
- Mobile-first responsive design

### Accessibility Requirements
- Semantic HTML throughout
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance
- Alt text on all images

## Development Workflow

### When Starting
1. Initialize Astro project with basic template
2. Install Tailwind 4 (follow Astro + Tailwind 4 docs)
3. Add Basecoat UI via CDN or npm
4. Apply custom orange theme
5. Build core layout structure first

### When Converting HTML Templates
1. Break HTML into logical Astro components
2. Replace utility class soup with Basecoat classes where possible
3. Extract repeated patterns into reusable components
4. Update all styling to use Tailwind 4 syntax
5. Add Astro's built-in optimizations (Image, head management)

### When Building New Features
1. Check if Basecoat has a component for it first
2. Use Astro component props for customization
3. Keep interactivity minimal - progressive enhancement
4. Test on mobile first
5. Ensure accessibility from the start

## Code Quality Standards

### Do
- Write clean, readable HTML
- Use meaningful component/variable names
- Comment complex logic
- Keep components small and focused
- Test in multiple browsers
- Validate HTML semantics

### Don't
- Use deprecated Tailwind 3 classes
- Add React "just because"
- Over-engineer simple solutions
- Duplicate code - make components
- Ignore mobile responsiveness
- Skip accessibility features

## Common Patterns

### Button (using Basecoat)
```html
<button class="btn">Book Tour</button>
<button class="btn-outline">Learn More</button>
```

### Card (using Basecoat)
```html
<div class="card">
  <header>
    <h2>Historic Downtown Tour</h2>
    <p>2 hours • $45/person</p>
  </header>
  <section>
    <p>Explore the city's rich history...</p>
  </section>
  <footer>
    <button class="btn">Book Now</button>
  </footer>
</div>
```

### Form (using Basecoat)
```html
<form class="form">
  <div>
    <label for="name">Name</label>
    <input type="text" id="name">
  </div>
  <button class="btn">Submit</button>
</form>
```

## Theme Integration

### Orange Theme (shadcn format)
- Theme is provided in shadcn/ui format with CSS custom properties
- **Direct compatibility** with Basecoat UI (Basecoat is shadcn/ui compatible)
- Theme variables define: colors, radii, typography, spacing
- Apply theme CSS variables to `:root` and `.dark` selectors
- No conversion needed - shadcn themes work natively with Basecoat

### Theme Application Example
```css
/* theme.css - shadcn format */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 20 14.3% 4.1%;
    --primary: 24.6 95% 53.1%; /* Orange primary */
    --primary-foreground: 60 9.1% 97.8%;
    /* ...other variables */
  }
  
  .dark {
    --background: 20 14.3% 4.1%;
    --foreground: 60 9.1% 97.8%;
    --primary: 20.5 90.2% 48.2%; /* Orange primary dark mode */
    /* ...other variables */
  }
}
```

### Using Theme Colors
- Basecoat components automatically use theme variables
- Access colors via Tailwind: `bg-primary`, `text-primary`, etc.
- Buttons, links, accents will all use the orange theme
- Ensure sufficient contrast for accessibility

### Dark Mode
- Support system preference
- Use Tailwind 4's dark mode utilities
- Ensure orange theme works in both modes

## SEO Best Practices

### Core SEO Requirements

| **SEO Element** | **Astro Implementation** |
|-----------------|--------------------------|
| Unique titles & descriptions | Pass props per page to layout components |
| Sitemap / robots.txt | Use `@astrojs/sitemap` integration |
| Server-rendered HTML | Astro prerender (`prerender = true` or SSG) |
| Fast performance | Astro ships minimal JS by default |
| Schema.org structured data | Add `<script type="application/ld+json">` |
| Local SEO | Include address, map, phone, LocalBusiness schema |

### Meta Tags Per Page

```astro
---
// In your Layout component
const { title, description, image, type = 'website' } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<head>
  <title>{title} | Walk Santa Cruz</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalURL} />
  
  <!-- Open Graph -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content={type} />
  <meta property="og:url" content={canonicalURL} />
  <meta property="og:image" content={image} />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />
</head>
```

### Structured Data (Schema.org)

**LocalBusiness Schema** - Add to homepage:
```astro
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Your Walking Tour Business",
  "description": "Historic walking tours in [City]",
  "image": "https://yoursite.com/logo.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "telephone": "+1-555-123-4567",
  "url": "https://yoursite.com",
  "priceRange": "$",
  "openingHours": "Mo-Su 09:00-18:00"
}
</script>
```

**TourReservation Schema** - Add to tour pages:
```astro
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "name": "Historic Downtown Tour",
  "description": "2-hour walking tour...",
  "image": "https://walksantacruz.com/tours/downtown.jpg",
  "touristType": ["History Enthusiasts", "Photographers"],
  "availableLanguage": ["English"],
  "offers": {
    "@type": "Offer",
    "price": "45",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
}
</script>
```

### Sitemap Setup

```bash
npm install @astrojs/sitemap
```

```js
// astro.config.mjs
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://walksantacruz.com',
  integrations: [sitemap()],
});
```

### Performance Optimization

1. **Image Optimization** - Always use Astro's Image component:
```astro
---
import { Image } from 'astro:assets';
import tourPhoto from '../assets/tour.jpg';
---
<Image src={tourPhoto} alt="Historic downtown tour" width={800} height={600} />
```

2. **Lazy Loading** - For below-fold images:
```astro
<Image src={photo} alt="..." loading="lazy" />
```

3. **Preload Critical Assets**:
```astro
<link rel="preload" href="/fonts/custom-font.woff2" as="font" type="font/woff2" crossorigin />
```

### Local SEO Checklist

- ✅ Google Business Profile listing
- ✅ NAP (Name, Address, Phone) consistent across site
- ✅ Embedded Google Maps on contact page
- ✅ City/location keywords in content
- ✅ LocalBusiness schema markup
- ✅ Local reviews/testimonials section
- ✅ Tour starting location addresses

### Content SEO

- Use descriptive headings (H1, H2, H3) with keywords
- Write unique meta descriptions (150-160 chars) for each page
- Include alt text on all images with descriptive keywords
- Create tour pages with rich content (history, highlights, what to expect)
- Add blog/resources section for content marketing

### Technical SEO

- ✅ HTTPS enabled
- ✅ Mobile responsive (test with Lighthouse)
- ✅ Fast Core Web Vitals
- ✅ Clean URL structure (`/tours/historic-downtown` not `/tour?id=123`)
- ✅ 404 page with helpful navigation
- ✅ Breadcrumb navigation for tour pages

## Reference Resources
- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS 4 Docs](https://tailwindcss.com)
- [Basecoat UI Docs](https://basecoatui.com)
- [Basecoat GitHub](https://github.com/hunvreus/basecoat)
- [Schema.org - Tourist Attraction](https://schema.org/TouristAttraction)
- [Schema.org - Local Business](https://schema.org/LocalBusiness)

---

**Last Updated**: Walk Santa Cruz walking tour business site | Matt O'Leary | walksantacruz.com