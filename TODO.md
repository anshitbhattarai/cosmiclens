# CosmicLens — TODO

- [x] TASK 1: Replace `src/components/SkyMapTab.tsx` with the new dark interactive canvas sky map:
  - [x] Import `Observation` + `OBSERVATIONS` from `ExploreDetail`
  - [x] Hardcoded x/y positions for the 6 observations
  - [x] Glowing colored dots with tooltip + legend
  - [x] Mini detail card + “View Full Details →” CTA
  - [x] Props: `onViewDetail: (obs: Observation) => void`

- [x] TASK 2: Update `src/components/Tabs.tsx`:
  - [x] Add shared state `selected: Observation | null` at Tabs level
  - [x] Import `Observation` from `ExploreDetail`
  - [x] Render SkyMapTab with `onViewDetail` that sets `selected` and activates Explore
  - [x] Pass `selected` + `onSelect` down to `ExploreTab`

- [x] TASK 3: Update `src/components/ExploreTab.tsx`:
  - [x] Accept `selected` and `onSelect` as props instead of internal state
  - [x] Wire props into `ExploreLeft` and `ExploreDetail`

- [x] TASK 4: Update `src/components/Navbar.tsx`:
  - [x] Add prop `apiConnected: boolean` (default false)
  - [x] Indicator text + dot color:
    - [x] false: amber dot + “API NOT CONNECTED”
    - [x] true: green dot + “LIVE · L2 ORBIT”

- [x] [x] Run `npm run build` and fix all TypeScript errors
