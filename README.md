# CosmicLens

A web-based explorer for James Webb Space Telescope observations, built with Next.js. Browse JWST imagery, filter by object type and instrument, and view detailed observation data including coordinates, distance, and program information.

## Features

- **Explore Tab**: Browse JWST observations with search, type filters, and instrument filters
- **Detail Panel**: View full observation metadata, coordinates, and instrument data
- **Responsive Layout**: Adapts to any screen size with a scrollable detail area and pinned controls
- **Animated Transitions**: Smooth fade-in animations when selecting observations
- **Live Data Ready**: Designed to connect to jwstapi.com and api.nasa.gov for real-time observation data

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- React Icons (io5)
- Tailwind CSS (base only, zero utility classes in components)
- Geist + Geist Mono fonts

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  app/
    layout.tsx          # Root layout with navbar and star field
    page.tsx            # Home page, renders Tabs component
  components/
    Navbar.tsx          # Top navigation bar with offline indicator
    StarField.tsx       # Animated star background
    Tabs.tsx            # Tab bar (Explore, Telemetry, Sky Map)
    ExploreTab.tsx      # Parent wiring ExploreLeft + ExploreDetail
    ExploreLeft.tsx     # 300px left panel with search, filters, card list
    ExploreDetail.tsx   # Right panel with observation detail view
```

## API Integration

The app is designed to connect to:

- **jwstapi.com** -- Real JWST observation data
- **api.nasa.gov** -- Mission updates and metadata
- **esawebb.org** -- ESA Webb Portal for full observation pages

Currently using mock observation data. Replace the `OBSERVATIONS` array in `ExploreDetail.tsx` with API calls to enable live data.

## License

MIT