"use client";

"use client";

import { useState, useEffect } from "react";
import { IoSearchSharp, IoVideocamSharp } from "react-icons/io5";
import type { Observation } from "./ExploreDetail";
import { OBSERVATIONS } from "./ExploreDetail";

const TYPE_FILTERS = ["All", "Nebula", "Galaxy", "Exoplanet", "Galaxy Cluster"] as const;
const INST_FILTERS = ["All", "NIRCam", "MIRI", "NIRISS"] as const;

// ─── Type badge colours ───────────────────────────────────────────────────────

const TYPE_PALETTE: Record<string, { bg: string; color: string; border: string }> = {
  "Nebula":         { bg: "rgba(129,140,248,0.15)", color: "#818cf8", border: "rgba(129,140,248,0.4)" },
  "Galaxy Cluster": { bg: "rgba(244,114,182,0.15)", color: "#f472b6", border: "rgba(244,114,182,0.4)" },
  "Galaxy Group":   { bg: "rgba(251,146,60,0.15)",  color: "#fb923c", border: "rgba(251,146,60,0.4)"  },
  "Galaxy":         { bg: "rgba(251,191,36,0.15)",  color: "#fbbf24", border: "rgba(251,191,36,0.4)"  },
  "Exoplanet":      { bg: "rgba(52,211,153,0.15)",  color: "#34d399", border: "rgba(52,211,153,0.4)"  },
};

// ─── ObservationCard ──────────────────────────────────────────────────────────

interface CardProps {
  observation: Observation;
  isSelected:  boolean;
  onSelect:    () => void;
}

function ObservationCard({ observation, isSelected, onSelect }: CardProps) {
  const [hovered, setHovered] = useState(false);
  const { title, type, instrument, date, distance } = observation;
  const badge = TYPE_PALETTE[type] ?? { bg: "rgba(100,116,139,0.15)", color: "#94a3b8", border: "rgba(100,116,139,0.4)" };

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding:     "12px 14px",
        borderRadius: "8px",
        background:  isSelected
          ? "rgba(96,165,250,0.08)"
          : hovered
            ? "rgba(255,255,255,0.05)"
            : "rgba(255,255,255,0.02)",
        border:      isSelected
          ? "1px solid rgba(96,165,250,0.4)"
          : `1px solid ${hovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)"}`,
        cursor:      "pointer",
        transition:  "background 0.15s ease, border-color 0.15s ease",
        display:     "flex",
        flexDirection: "column",
        gap:         "6px",
      }}
    >
      {/* Title + type badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
        <span style={{
          fontSize:   "13px",
          fontWeight: 600,
          color:      isSelected ? "#93c5fd" : "#e2e8f0",
          lineHeight: 1.3,
          flex:       1,
          transition: "color 0.15s ease",
        }}>
          {title}
        </span>
        <span style={{
          fontSize:     "10px",
          fontWeight:   500,
          letterSpacing: "0.06em",
          padding:      "2px 7px",
          borderRadius: "999px",
          background:   badge.bg,
          color:        badge.color,
          border:       `1px solid ${badge.border}`,
          whiteSpace:   "nowrap",
          flexShrink:   0,
        }}>
          {type}
        </span>
      </div>

      {/* Instrument + date */}
      <div style={{
        fontSize:     "11px",
        color:        "#475569",
        letterSpacing: "0.05em",
        fontFamily:   "var(--font-geist-mono), monospace",
      }}>
        {instrument} · {date}
      </div>

      {/* Distance */}
      <div style={{
        fontSize:     "11px",
        color:        "#334155",
        letterSpacing: "0.05em",
        fontFamily:   "var(--font-geist-mono), monospace",
      }}>
        {distance}
      </div>
    </div>
  );
}

// ─── FilterPill ───────────────────────────────────────────────────────────────

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding:      "3px 10px",
        borderRadius: "999px",
        fontSize:     "11px",
        fontWeight:   active ? 600 : 400,
        letterSpacing: "0.06em",
        cursor:       "pointer",
        outline:      "none",
        fontFamily:   "var(--font-geist-mono), monospace",
        transition:   "all 0.15s ease",
        background:   active ? "rgba(96,165,250,0.2)"  : hovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
        color:        active ? "#93c5fd"               : hovered ? "#94a3b8"                : "#475569",
        border:       active ? "1px solid rgba(96,165,250,0.5)" : "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {label}
    </button>
  );
}

// ─── ExploreLeft ──────────────────────────────────────────────────────────────

interface ExploreLeftProps {
  selected: Observation | null;
  onSelect: (obs: Observation) => void;
}

export default function ExploreLeft({ selected, onSelect }: ExploreLeftProps) {
  const [search,      setSearch]      = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [activeType,  setActiveType]  = useState("All");
  const [activeInst,  setActiveInst]  = useState("All");
  const [apod, setApod] = useState<{
    title: string;
    url: string;
    date: string;
    media_type: string;
  } | null>(null);
  const [apodLoading, setApodLoading] = useState(true);

  useEffect(() => {
    fetch("/api/apod")
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setApod(data);
      })
      .catch(() => {})
      .finally(() => setApodLoading(false));
  }, []);

  const filtered = OBSERVATIONS.filter((o) => {
    const matchSearch = o.title.toLowerCase().includes(search.toLowerCase());
    const matchType   = activeType === "All" || o.type === activeType;
    const matchInst   = activeInst === "All" || o.instrument.includes(activeInst);
    return matchSearch && matchType && matchInst;
  });

  return (
    <div style={{
      width:       "300px",
      flexShrink:  0,
      display:     "flex",
      flexDirection: "column",
      height:      "100%",
      borderRight: "1px solid rgba(255,255,255,0.06)",
      background:  "rgba(2,8,23,0.6)",
    }}>

      {/* ── Top controls ── */}
      <div style={{ padding: "16px 14px 12px", display: "flex", flexDirection: "column", gap: "14px" }}>

        {/* APOD Card */}
        {apodLoading && (
          <div style={{
            padding: "10px 12px",
            background: "rgba(255,255,255,0.03)",
            borderRadius: "10px",
            marginBottom: "12px",
            fontSize: "11px",
            color: "#475569",
          }}>
            Loading today&apos;s image...
          </div>
        )}
        {!apodLoading && apod && (
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "10px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px",
              marginBottom: "12px",
              cursor: "pointer",
            }}
            onClick={() => window.open("https://apod.nasa.gov/apod/", "_blank")}
          >
            {apod.media_type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={apod.url}
                alt={apod.title}
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  flexShrink: 0,
                }}
              />
            ) : (
              <div style={{
                width: "60px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "6px",
                flexShrink: 0,
              }}>
                <IoVideocamSharp size={20} style={{ color: "#64748b" }} />
              </div>
            )}
            <div style={{ overflow: "hidden" }}>
              <div style={{
                fontSize: "10px",
                color: "#60a5fa",
                letterSpacing: "0.1em",
                marginBottom: "3px",
              }}>
                TODAY&apos;S APOD
              </div>
              <div style={{
                fontSize: "12px",
                color: "#e2e8f0",
                lineHeight: "1.4",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}>
                {apod.title}
              </div>
              <div style={{
                fontSize: "10px",
                color: "#64748b",
                marginTop: "3px",
              }}>
                {apod.date}
              </div>
            </div>
          </div>
        )}

        {/* Search */}
        <div style={{ position: "relative" }}>
          <IoSearchSharp size={14} style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#475569",
            pointerEvents: "none",
          }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
            placeholder="Search observations..."
            style={{
              width:       "100%",
              padding:     "9px 12px 9px 34px",
              borderRadius: "8px",
              background:  "rgba(255,255,255,0.05)",
              border:      `1px solid ${searchFocus ? "#60a5fa" : "rgba(255,255,255,0.1)"}`,
              color:       "#f1f5f9",
              fontSize:    "12px",
              outline:     "none",
              fontFamily:  "var(--font-geist-sans), system-ui, sans-serif",
              transition:  "border-color 0.15s ease",
              boxSizing:   "border-box",
            }}
          />
        </div>

        {/* Object type filter */}
        <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
          <span style={{
            fontSize:      "9px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color:         "#334155",
            fontFamily:    "var(--font-geist-mono), monospace",
          }}>
            Object Type
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {TYPE_FILTERS.map((t) => (
              <FilterPill key={t} label={t} active={activeType === t} onClick={() => setActiveType(t)} />
            ))}
          </div>
        </div>

        {/* Instrument filter */}
        <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
          <span style={{
            fontSize:      "9px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color:         "#334155",
            fontFamily:    "var(--font-geist-mono), monospace",
          }}>
            Instrument
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {INST_FILTERS.map((i) => (
              <FilterPill key={i} label={i} active={activeInst === i} onClick={() => setActiveInst(i)} />
            ))}
          </div>
        </div>

        {/* Count */}
        <span style={{
          fontSize:      "9px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color:         "#334155",
          fontFamily:    "var(--font-geist-mono), monospace",
        }}>
          {filtered.length} Observations
        </span>
      </div>

      {/* ── Card list (scrollable) ── */}
      <div style={{
        flex:          1,
        overflowY:     "auto",
        padding:       "0 14px 16px",
        display:       "flex",
        flexDirection: "column",
        gap:           "6px",
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(255,255,255,0.08) transparent",
      }}>
        {filtered.length === 0 ? (
          <div style={{
            textAlign:     "center",
            color:         "#334155",
            fontSize:      "11px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontFamily:    "var(--font-geist-mono), monospace",
            marginTop:     "40px",
          }}>
            No observations found
          </div>
        ) : (
          filtered.map((o) => (
            <ObservationCard
              key={o.id}
              observation={o}
              isSelected={selected?.id === o.id}
              onSelect={() => onSelect(o)}
            />
          ))
        )}
      </div>

    </div>
  );
}
