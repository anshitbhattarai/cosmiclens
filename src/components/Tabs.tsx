"use client";

import { useState } from "react";
import { IoPlanetSharp, IoStatsChartSharp, IoCompassSharp } from "react-icons/io5";
import ExploreTab from "./ExploreTab";
import TelemetryTab from "./TelemetryTab";
import SkyMapTab from "./SkyMapTab";
import type { Observation } from "./ExploreDetail";

const TABS = [
  { id: "explore", label: "Explore", Icon: IoPlanetSharp },
  { id: "telemetry", label: "Telemetry", Icon: IoStatsChartSharp },
  { id: "skymap", label: "Sky Map", Icon: IoCompassSharp },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function Tabs() {
  const [active, setActive] = useState<TabId>("explore");
  const [selected, setSelected] = useState<Observation | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      {/* ── Tab bar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {TABS.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "18px 0",
                border: "none",
                borderBottom: isActive ? "2px solid #60a5fa" : "2px solid transparent",
                background: "transparent",
                color: isActive ? "#93c5fd" : "#475569",
                fontWeight: isActive ? 600 : 400,
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "var(--font-geist-mono), monospace",
                outline: "none",
                textShadow: isActive ? "0 0 12px rgba(96,165,250,0.5)" : "none",
              }}
            >
              <Icon size={14} />
              {label}
            </button>
          );
        })}
      </div>

      {/* ── Tab content ── */}
      <div style={{ flex: 1, minHeight: 0 }}>
        {active === "explore" ? (
            <ExploreTab selected={selected} onSelect={(obs) => setSelected(obs)} />
        ) : active === "telemetry" ? (
          <TelemetryTab />
        ) : (
          <SkyMapTab
            onViewDetail={(obs) => {
              setSelected(obs);
              setActive("explore");
            }}
          />
        )}
      </div>
    </div>
  );
}
