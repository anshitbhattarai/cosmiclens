"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { IoMapSharp } from "react-icons/io5";
import type { Observation } from "./ExploreDetail";
import { OBSERVATIONS } from "./ExploreDetail";

const TYPE_PALETTE: Record<string, { bg: string; color: string; border: string }> = {
  Nebula: { bg: "rgba(129,140,248,0.15)", color: "#818cf8", border: "rgba(129,140,248,0.4)" },
  "Galaxy Cluster": { bg: "rgba(244,114,182,0.15)", color: "#f472b6", border: "rgba(244,114,182,0.4)" },
  "Galaxy Group": { bg: "rgba(251,146,60,0.15)", color: "#fb923c", border: "rgba(251,146,60,0.4)" },
  Galaxy: { bg: "rgba(251,191,36,0.15)", color: "#fbbf24", border: "rgba(251,191,36,0.4)" },
  Exoplanet: { bg: "rgba(52,211,153,0.15)", color: "#34d399", border: "rgba(52,211,153,0.4)" },
};

function typeColor(type: string): string {
  return TYPE_PALETTE[type]?.color ?? "#94a3b8";
}

type XY = { x: string; y: string };

const HARD_CODED_POSITIONS: Record<number, XY> = {
  1: { x: "18%", y: "72%" }, // Carina Nebula
  2: { x: "8%", y: "82%" }, // Webb Deep Field
  3: { x: "15%", y: "58%" }, // Southern Ring
  4: { x: "82%", y: "28%" }, // Stephan's Quintet
  5: { x: "65%", y: "68%" }, // Pillars of Creation
  6: { x: "5%", y: "62%" }, // WASP-96b
};

export default function SkyMapTab() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Observation | null>(null);

  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const hoveredObs = useMemo(() => {
    if (hoveredId == null) return null;
    return OBSERVATIONS.find((o) => o.id === hoveredId) ?? null;
  }, [hoveredId]);

  const tooltipStyle = useMemo((): React.CSSProperties => {
    if (!hoveredObs) return { display: "none" };
    const p = HARD_CODED_POSITIONS[hoveredObs.id];
    if (!p) return { display: "none" };
    return {
      left: p.x,
      top: `calc(${p.y} - 22px)`,
      transform: "translate(-50%, -100%)",
      display: "block",
    };
  }, [hoveredObs]);

  // Ensure layout height is respected while resizing (no heavy canvas)
  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    // No-op: placeholder to keep behavior stable if you later add canvas drawing.
  }, []);

  return (
    <div
      style={{
        height: "calc(100vh - 128px)",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      {/* Title section */}
      <div style={{ paddingTop: 4 }}>
        <div
          style={{
            fontSize: 10,
            color: "#64748b",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            fontFamily: "var(--font-geist-mono), monospace",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            <IoMapSharp size={14} style={{ color: "#64748b" }} />
          </span>
          JWST OBSERVATION SKY MAP
        </div>
        <div
          style={{
            fontSize: 11,
            color: "#334155",
            letterSpacing: 0.02,
            marginTop: 4,
            lineHeight: 1.4,
          }}
        >
          Right Ascension vs Declination · Click any object to explore
        </div>
      </div>

      {/* Map */}
      <div
        style={{
          marginTop: 16,
          width: "100%",
          height: 420,
          background: "rgba(0,0,0,0.4)",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.06)",
          position: "relative",
          overflow: "hidden",
          marginBottom: 20,
        }}
        ref={mapRef}
      >
        {/* Grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
          }}
        >
          {/* Vertical 4 lines */}
          {Array.from({ length: 4 }).map((_, idx) => {
            const leftPct = ((idx + 1) / 5) * 100; // 20,40,60,80
            return (
              <div
                key={`v-${idx}`}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: `${leftPct}%`,
                  width: 1,
                  background: "rgba(255,255,255,0.04)",
                }}
              />
            );
          })}
          {/* Horizontal 4 lines */}
          {Array.from({ length: 4 }).map((_, idx) => {
            const topPct = ((idx + 1) / 5) * 100; // 20,40,60,80
            return (
              <div
                key={`h-${idx}`}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: `${topPct}%`,
                  height: 1,
                  background: "rgba(255,255,255,0.04)",
                }}
              />
            );
          })}
        </div>

        {/* Axis labels */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: 10,
            transform: "translateX(-50%)",
            fontSize: 9,
            color: "#334155",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontFamily: "var(--font-geist-mono), monospace",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          RIGHT ASCENSION →
        </div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 8,
            transform: "translateY(-50%) rotate(-90deg)",
            fontSize: 9,
            color: "#334155",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontFamily: "var(--font-geist-mono), monospace",
            pointerEvents: "none",
            zIndex: 1,
            width: 120,
            textAlign: "center",
          }}
        >
          DECLINATION
        </div>

        {/* Plot dots */}
        {OBSERVATIONS.map((obs) => {
          const p = HARD_CODED_POSITIONS[obs.id];
          if (!p) return null;
          const c = typeColor(obs.type);
          const isSel = selected?.id === obs.id;

          return (
            <div
              key={obs.id}
              style={{
                position: "absolute",
                left: p.x,
                top: p.y,
                width: 14,
                height: 14,
                borderRadius: "50%",
                transform: isSel
                  ? "translate(-50%, -50%) scale(1.8)"
                  : "translate(-50%, -50%) scale(1)",
                outline: isSel ? "2px solid white" : "none",
                background: c,
                boxShadow: `0 0 10px ${c}88`,
                cursor: "pointer",
                transition: "transform 0.2s ease",
                zIndex: 2,
              }}
              onMouseEnter={() => setHoveredId(obs.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelected(obs)}
              role="button"
              aria-label={`Select ${obs.title}`}
            />
          );
        })}

        {/* Tooltip (hover) */}
        {hoveredObs && (
          <div
            style={{
              position: "absolute",
              ...tooltipStyle,
              background: "rgba(15,23,42,0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 6,
              padding: "6px 10px",
              fontSize: 11,
              color: "#e2e8f0",
              whiteSpace: "nowrap",
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
            {hoveredObs.title}
          </div>
        )}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
        {Object.keys(TYPE_PALETTE).map((t) => {
          const c = TYPE_PALETTE[t].color;
          return (
            <div
              key={`legend-${t}`}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: c,
                  boxShadow: `0 0 8px ${c}66`,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  color: "#64748b",
                  fontFamily: "var(--font-geist-mono), monospace",
                }}
              >
                {t}
              </span>
            </div>
          );
        })}
      </div>

      {!selected ? (
        <div style={{
          textAlign: 'center',
          padding: '32px',
          fontSize: '12px',
          color: '#334155'
        }}>
          ✦ Select any object on the map to preview its data
        </div>
      ) : (
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(96,165,250,0.2)',
          borderRadius: '12px',
          padding: '20px',
          marginTop: '16px',
          display: 'flex',
          gap: '20px',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '11px',
              color: '#64748b',
              letterSpacing: '0.12em',
              marginBottom: '6px'
            }}>
              {selected.type.toUpperCase()}
            </div>
            <div style={{
              fontSize: '20px',
              color: '#f8fafc',
              fontWeight: 700,
              marginBottom: '8px'
            }}>
              {selected.title}
            </div>
            <div style={{
              fontSize: '13px',
              color: '#94a3b8',
              lineHeight: 1.7
            }}>
              {selected.description}
            </div>
            <button
              onClick={() => setSelected(null)}
              style={{
                marginTop: '12px',
                padding: '6px 14px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#94a3b8',
                borderRadius: '6px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              ✕ Close
            </button>
          </div>
          <div style={{
            width: '200px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            alignContent: 'start'
          }}>
            {[
              ['📍', 'Distance', selected.distance],
              ['📅', 'Observed', selected.date],
              ['📡', 'Instrument', selected.instrument],
              ['🔭', 'Program', selected.program],
            ].map(([icon, label, value]) => (
              <div key={String(label)} style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '8px',
                padding: '10px'
              }}>
                <div style={{
                  fontSize: '10px',
                  color: '#64748b',
                  marginBottom: '3px'
                }}>
                  {icon} {label}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: '#e2e8f0',
                  fontFamily: 'monospace',
                  fontWeight: 600
                }}>
                  {String(value)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
