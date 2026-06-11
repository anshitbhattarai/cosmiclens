"use client";

import { useEffect, useState } from "react";
import { IoTelescopeSharp } from "react-icons/io5";

export interface NavbarProps {
  apiConnected?: boolean;
}

export default function Navbar({ apiConnected }: NavbarProps) {
  const [probeLive, setProbeLive] = useState(false);

  useEffect(() => {
    if (apiConnected !== undefined) return;

    let mounted = true;
    fetch("/api/jwst?q=connectivity-test")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        // If API returns { url: ... } (including null), it's still connected.
        // If the route ever errors and returns shape { error }, treat as disconnected.
        const isConnected = !!data && typeof data === "object" && !("error" in data);
        setProbeLive(isConnected);
      })
      .catch(() => {
        if (!mounted) return;
        setProbeLive(false);
      });

    return () => {
      mounted = false;
    };
  }, [apiConnected]);

  const apiLive = apiConnected !== undefined ? apiConnected : probeLive;

  return (
    <>
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(34,197,94,0.6); }
          50%       { opacity: 0.6; transform: scale(1.3); box-shadow: 0 0 0 4px rgba(34,197,94,0); }
        }
        @keyframes pulse-dot-amber {
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
        {/* Left -- logo + subtitle */}
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

        {/* Right -- API status */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.45rem",
        }}>
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: apiLive ? "#22c55e" : "#f59e0b",
              animation: apiLive
                ? "pulse-dot 2s ease-in-out infinite"
                : "pulse-dot-amber 2s ease-in-out infinite",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: "0.7rem",
              fontFamily: "var(--font-geist-mono), monospace",
              color: apiLive ? "#22c55e" : "#f59e0b",
              letterSpacing: "0.08em",
              fontWeight: 500,
            }}
          >
            {apiLive ? "LIVE \u00B7 L2 ORBIT" : "API NOT CONNECTED"}
          </span>
        </div>
      </nav>
    </>
  );
}
