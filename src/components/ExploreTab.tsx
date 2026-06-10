"use client";

import { useState } from "react";
import ExploreLeft from "./ExploreLeft";
import ExploreDetail from "./ExploreDetail";
import type { Observation } from "./ExploreDetail";

export default function ExploreTab() {
  const [selected, setSelected] = useState<Observation | null>(null);

  return (
    <div style={{
      display: "flex",
      flex: 1,
      minHeight: 0,
    }}>
      <ExploreLeft
        selected={selected}
        onSelect={setSelected}
      />
      <ExploreDetail
        selected={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
