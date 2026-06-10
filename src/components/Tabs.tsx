"use client";

import { useState } from "react";
import { IoPlanetSharp, IoStatsChartSharp, IoCompassSharp } from "react-icons/io5";
import ExploreLeft from "./ExploreLeft";

const TABS = [
  { id: "explore",   label: "Explore",   Icon: IoPlanetSharp     },
  { id: "telemetry", label: "Telemetry", Icon: IoStatsChartSharp },
  { id: "skymap",    label: "Sky Map",   Icon: IoCompassSharp    },
] as const;

type TabId = (typeof TABS)[number]["id"];

const PLACEHOLDERS: Record<"telemetry" | "skymap", string> = {
  telemetry: "Telemetry coming soon",
  skymap:    "Sky Map coming soon",
};

export default function Tabs() {
  const [active, setActive] = useState<TabId>("explore");

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>

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
      {active === "explore" ? (
        <div style={{ display: "flex", height: "calc(100vh - 128px)" }}>
          <ExploreLeft />
          <div style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#475569",
            fontSize: "12px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontFamily: "var(--font-geist-mono), monospace",
          }}>
            Select an observation
          </div>
        </div>
      ) : (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          color: "#475569",
          fontSize: "12px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontFamily: "var(--font-geist-mono), monospace",
        }}>
          {PLACEHOLDERS[active]}
        </div>
      )}

    </div>
  );
}
