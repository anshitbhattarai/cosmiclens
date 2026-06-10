"use client";

import { useState, useEffect } from "react";
import {
  IoPlanetSharp,
  IoRocketSharp,
  IoTelescopeSharp,
  IoRadioSharp,
  IoCalendarSharp,
  IoLocationSharp,
  IoArrowUp,
  IoSwapHorizontalSharp,
  IoCloseSharp,
  IoArrowForwardSharp,
} from "react-icons/io5";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Observation {
  id: number;
  title: string;
  type: string;
  instrument: string;
  date: string;
  distance: string;
  description: string;
  program: string;
  ra: string;
  dec: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

export const OBSERVATIONS: Observation[] = [
  {
    id: 1,
    title: "Carina Nebula",
    type: "Nebula",
    instrument: "NIRCam",
    date: "2022-07-12",
    distance: "7,600 light-years",
    description: "Cosmic cliffs revealing previously invisible areas of star birth in stunning infrared detail.",
    program: "Early Release Observations",
    ra: "10h 45m",
    dec: "-59° 52′",
  },
  {
    id: 2,
    title: "Webb Deep Field",
    type: "Galaxy Cluster",
    instrument: "NIRCam",
    date: "2022-07-11",
    distance: "4.6B light-years",
    description: "The deepest infrared image of the universe ever captured, revealing thousands of galaxies.",
    program: "Early Release Observations",
    ra: "07h 23m",
    dec: "-73° 27′",
  },
  {
    id: 3,
    title: "Southern Ring Nebula",
    type: "Nebula",
    instrument: "MIRI",
    date: "2022-07-12",
    distance: "2,500 light-years",
    description: "A dying star surrounded by shells of gas nearly half a light-year across.",
    program: "Early Release Observations",
    ra: "10h 07m",
    dec: "-40° 26′",
  },
  {
    id: 4,
    title: "Stephan's Quintet",
    type: "Galaxy Group",
    instrument: "NIRCam + MIRI",
    date: "2022-07-12",
    distance: "290M light-years",
    description: "Four galaxies locked in a gravitational cosmic dance, reshaping each other.",
    program: "Early Release Observations",
    ra: "22h 36m",
    dec: "+33° 58′",
  },
  {
    id: 5,
    title: "Pillars of Creation",
    type: "Nebula",
    instrument: "NIRCam",
    date: "2022-10-19",
    distance: "6,500 light-years",
    description: "Star-forming towers of gas and dust in the Eagle Nebula, reimagined in infrared.",
    program: "Cycle 1",
    ra: "18h 19m",
    dec: "-13° 49′",
  },
  {
    id: 6,
    title: "WASP-96b",
    type: "Exoplanet",
    instrument: "NIRISS",
    date: "2022-07-12",
    distance: "1,150 light-years",
    description: "Detailed atmospheric analysis of a hot gas giant reveals water vapor signatures.",
    program: "Early Release Observations",
    ra: "01h 21m",
    dec: "-23° 52′",
  },
];

// ─── Type badge colours ───────────────────────────────────────────────────────

const TYPE_PALETTE: Record<string, { bg: string; color: string; border: string }> = {
  "Nebula":         { bg: "rgba(129,140,248,0.15)", color: "#818cf8", border: "rgba(129,140,248,0.4)" },
  "Galaxy Cluster": { bg: "rgba(244,114,182,0.15)", color: "#f472b6", border: "rgba(244,114,182,0.4)" },
  "Galaxy Group":   { bg: "rgba(251,146,60,0.15)",  color: "#fb923c", border: "rgba(251,146,60,0.4)"  },
  "Galaxy":         { bg: "rgba(251,191,36,0.15)",  color: "#fbbf24", border: "rgba(251,191,36,0.4)"  },
  "Exoplanet":      { bg: "rgba(52,211,153,0.15)",  color: "#34d399", border: "rgba(52,211,153,0.4)"  },
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface ExploreDetailProps {
  selected: Observation | null;
  onClose: () => void;
}

// ─── Data Grid Cell ───────────────────────────────────────────────────────────

function DataCell({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "8px",
      padding: "10px 12px",
      display: "flex",
      flexDirection: "column",
      gap: "3px",
    }}>
      <span style={{
        fontSize: "10px",
        color: "#64748b",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontFamily: "var(--font-geist-mono), monospace",
        marginBottom: "3px",
      }}>
        {label}
      </span>
      <span style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "12px",
        color: "#e2e8f0",
        fontFamily: "var(--font-geist-mono), monospace",
      }}>
        {icon}
        {value}
      </span>
    </div>
  );
}

// ─── ExploreDetail ────────────────────────────────────────────────────────────

export default function ExploreDetail({ selected, onClose }: ExploreDetailProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(false);
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, [selected]);

  return (
    <>
      <style>{`
        @keyframes detailFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
      }}>
        {!selected ? (
          /* ── STATE 1: Nothing selected ── */
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            gap: "16px",
            padding: "24px",
          }}>
            <IoPlanetSharp size={48} style={{ color: "#64748b" }} />
            <span style={{
              fontSize: "18px",
              fontWeight: 500,
              color: "#94a3b8",
            }}>
              Select an observation
            </span>
            <span style={{
              fontSize: "13px",
              color: "#475569",
              maxWidth: "280px",
              textAlign: "center",
              lineHeight: 1.6,
            }}>
              Choose any JWST image to explore its data, coordinates, and details.
            </span>
            <div style={{
              marginTop: "12px",
              padding: "16px",
              borderRadius: "10px",
              background: "rgba(96,165,250,0.05)",
              border: "1px solid rgba(96,165,250,0.3)",
              boxShadow: "0 0 20px rgba(96,165,250,0.08)",
              maxWidth: "320px",
              textAlign: "center",
            }}>
              <span style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                fontSize: "12px",
                color: "#94a3b8",
                lineHeight: 1.6,
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              }}>
                <IoRocketSharp size={14} />
                LIVE DATA — Connect to jwstapi.com for real observation data and api.nasa.gov for mission updates.
              </span>
            </div>
          </div>
        ) : (
          /* ── STATE 2: Observation selected ── */
          <div
            key={selected.id}
            style={{
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
              animation: mounted ? "detailFadeIn 0.3s ease forwards" : "none",
              opacity: mounted ? 1 : 0,
              padding: "28px",
            }}
          >
            {/* Top bar: badge + close */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}>
              {(() => {
                const badge = TYPE_PALETTE[selected.type] ?? { bg: "rgba(100,116,139,0.15)", color: "#94a3b8", border: "rgba(100,116,139,0.4)" };
                return (
                  <span style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    padding: "3px 10px",
                    borderRadius: "999px",
                    background: badge.bg,
                    color: badge.color,
                    border: `1px solid ${badge.border}`,
                  }}>
                    {selected.type}
                  </span>
                );
              })()}
              <button
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "6px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#94a3b8",
                  fontSize: "12px",
                  padding: "4px 10px",
                  cursor: "pointer",
                  outline: "none",
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                }}
              >
                <IoCloseSharp size={14} />
              </button>
            </div>

            {/* Scrollable middle content */}
            <div style={{
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              marginTop: "16px",
              marginBottom: "16px",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.08) transparent",
            }}>
              {/* Title */}
              <h2 style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#f8fafc",
                margin: "0",
                marginBottom: "8px",
              }}>
                {selected.title}
              </h2>

              {/* Description */}
              <p style={{
                fontSize: "13px",
                color: "#94a3b8",
                lineHeight: 1.7,
                margin: "0",
                marginBottom: "20px",
              }}>
                {selected.description}
              </p>

              {/* Image placeholder */}
              <div style={{
                height: "180px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #0f172a, #1e1b4b)",
                border: "1px solid rgba(167,139,250,0.2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginBottom: "20px",
              }}>
                <IoTelescopeSharp size={32} style={{ color: "#64748b" }} />
                <span style={{
                  fontSize: "11px",
                  color: "#64748b",
                  letterSpacing: "0.06em",
                  fontFamily: "var(--font-geist-mono), monospace",
                }}>
                  JWST Image
                </span>
              </div>

              {/* Data grid: 3 cols x 2 rows */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "8px",
              }}>
                <DataCell icon={<IoRadioSharp size={12} />} label="Instrument" value={selected.instrument} />
                <DataCell icon={<IoCalendarSharp size={12} />} label="Observed" value={selected.date} />
                <DataCell icon={<IoLocationSharp size={12} />} label="Distance" value={selected.distance} />
                <DataCell icon={<IoTelescopeSharp size={12} />} label="Program" value={selected.program} />
                <DataCell icon={<IoArrowUp size={12} />} label="R.A." value={selected.ra} />
                <DataCell icon={<IoSwapHorizontalSharp size={12} />} label="Dec." value={selected.dec} />
              </div>
            </div>

            {/* ESA Portal button — pinned bottom */}
            <button
              onClick={() => window.open("https://esawebb.org", "_blank")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                outline: "none",
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                flexShrink: 0,
              }}
            >
              View on ESA Webb Portal
              <IoArrowForwardSharp size={14} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
