#  CosmicLens — James Webb Space Telescope Explorer

> An interactive web explorer for real NASA James Webb
> Space Telescope observations. Browse JWST discoveries,
> explore telescope telemetry, and navigate the sky map
> — all powered by live NASA APIs.


**Built for:** Stardance Hack Club 2026
**Stack:** Next.js 14 · TypeScript · NASA APIs

---

##  Features

###  Explore Tab
- Browse 6 real JWST observations with live NASA images
- Filter by object type (Nebula, Galaxy, Exoplanet, etc.)
- Filter by instrument (NIRCam, MIRI, NIRISS)
- Live search across all observations
- Detail panel with real coordinates, program info,
  and images fetched from NASA Image Library API
- Today's Astronomy Picture of the Day (APOD)
  in the sidebar via NASA APOD API
- Direct link to ESA Webb Portal for each observation

###  Telemetry Tab
- Real JWST instrument temperatures
  (NIRCam, NIRSpec, MIRI, FGS/NIRISS)
- Live telescope status and orbit information
- Warm/cool side spacecraft temperatures
- Mission statistics and observation counts

###  Sky Map Tab
- Interactive celestial coordinate map
- All 6 observations plotted by RA/Dec position
- Color-coded by object type with hover tooltips
- Click any object to preview its data inline
- Active selection with enhanced visual state

---

##  Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety |
| Framer Motion | Animations |
| react-icons | Icon library |
| NASA APOD API | Astronomy Picture of the Day |
| NASA Image Library API | JWST observation images |
| Vercel | Deployment |

---

##  Getting Started

### Prerequisites
- Node.js 18+
- NASA API key (free at [api.nasa.gov](https://api.nasa.gov))

### Installation

```bash
# Clone the repository
git clone https://github.com/anshitbhattacharai/cosmiclens
cd cosmiclens

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Add your NASA API key to .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

```env
NEXT_PUBLIC_NASA_API_KEY=your_nasa_api_key_here
```

Get a free API key at [https://api.nasa.gov](https://api.nasa.gov)
`DEMO_KEY` works for testing (100 requests/day limit)

---

##  Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── apod/         # NASA APOD proxy route
│   │   ├── jwst/         # NASA Image Library proxy route
│   │   └── image-proxy/  # Image proxy for CORS
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── components/
    ├── StarField.tsx     # Animated star background
    ├── Navbar.tsx        # Top navigation + API status
    ├── Tabs.tsx          # Tab navigation with shared state
    ├── ExploreTab.tsx    # Explore tab parent
    ├── ExploreLeft.tsx   # Observation list + filters
    ├── ExploreDetail.tsx # Observation detail panel
    ├── TelemetryTab.tsx  # Telescope telemetry data
    └── SkyMapTab.tsx     # Interactive sky map
```

---

##  NASA APIs Used

### APOD — Astronomy Picture of the Day
```
GET https://api.nasa.gov/planetary/apod?api_key=KEY
```
Displays today's featured astronomy image in the
sidebar with title and date.

### NASA Image and Video Library
```
GET https://images-api.nasa.gov/search?q=QUERY&media_type=image
```
No API key required. Used to fetch real Webb telescope
images for each observation in the detail panel.

---

##  How I Built This

**My role in the process:**
- Designed the overall architecture and feature set
- Wrote detailed prompt directing the AI agent
  at each build step
- Made all design decisions (color palette, layout,
  component structure, UX flow)
- Tested every feature after each build step
- Debugged issues — including hunting down correct
  NASA API image IDs manually via curl
- Validated real NASA API integration worked correctly
- Wrote the dev log documenting daily progress

**Tools used:**
- Kimi K2.6 as the primary model
- WakaTime for time tracking
- Git for version control with incremental commits

**What I learned:**
- How NASA's Image Library API works (two-step
  manifest fetch vs direct links array)
- Next.js API routes as server-side proxies
- How JWST instruments work (NIRCam, MIRI, NIRISS)
- What WASP-96b's transmission spectrum actually shows
- Why Stephan's Quintet isn't in NASA's image library

---

## 📄 License

MIT License — see [LICENSE](./LICENSE)
