"use client";

import { IoTelescopeSharp, IoCloudOfflineSharp } from "react-icons/io5";

export default function Navbar() {
  return (
    <>
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(234,179,8,0.6); }
          50%       { opacity: 0.6; transform: scale(1.3); box-shadow: 0 0 0 4px rgba(234,179,8,0); }
        }
      `}</style>

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.5rem",
          height: "64px",
          background: "rgba(2,8,23,0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Left — logo + subtitle */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <IoTelescopeSharp
            style={{
              fontSize: "1.6rem",
              color: "#a78bfa",
              flexShrink: 0,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            <span
              style={{
                fontWeight: 700,
                fontSize: "1.2rem",
                lineHeight: 1.1,
                background: "linear-gradient(to right, #60a5fa, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              CosmicLens
            </span>
            <span
              style={{
                fontSize: "0.55rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#64748b",
                fontFamily: "var(--font-geist-mono), monospace",
                lineHeight: 1,
              }}
            >
              James Webb Space Telescope Explorer
            </span>
          </div>
        </div>

        {/* Right — offline indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.45rem",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#eab308",
              animation: "pulse-dot 2s ease-in-out infinite",
              flexShrink: 0,
            }}
          />
          <IoCloudOfflineSharp
            style={{
              fontSize: "0.9rem",
              color: "#eab308",
            }}
          />
          <span
            style={{
              fontSize: "0.7rem",
              fontFamily: "var(--font-geist-mono), monospace",
              color: "#eab308",
              letterSpacing: "0.08em",
              fontWeight: 500,
            }}
          >
            API NOT CONNECTED
          </span>
        </div>
      </nav>
    </>
  );
}
