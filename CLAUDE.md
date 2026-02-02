# Walk Santa Cruz - Project Memory

## Assets

### Review Source Logos
- **Airbnb**: `src/assets/Airbnb_Logo_Over_Gradient.jpg` - used for Airbnb review cards
- **TripAdvisor**: `src/assets/tripadvisor.svg` - available for TripAdvisor review cards
- **Viator**: `src/assets/viator.webp` - available for Viator review cards
- **Google**: inline SVG with Google colors (no separate file)

## Reviews Section
- Located in `src/pages/index.astro`
- Carousel shows 3 cards on desktop, 1 on mobile
- Swipe support on mobile, arrow navigation on desktop
- Each review card includes: star rating, review text, author name, month/year, and source logo linking to the review platform
