"use client";

import ExploreLeft from "./ExploreLeft";
import ExploreDetail from "./ExploreDetail";
import type { Observation } from "./ExploreDetail";

export interface ExploreTabProps {
  selected: Observation | null;
  onSelect: (obs: Observation | null) => void;
}

export default function ExploreTab({ selected, onSelect }: ExploreTabProps) {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        minHeight: 0,
      }}
    >
      <ExploreLeft selected={selected} onSelect={(obs) => onSelect(obs)} />
      <ExploreDetail selected={selected} onClose={() => onSelect(null)} />
    </div>
  );
}
