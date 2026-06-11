"use client";

import {
  IoThermometerSharp,
  IoRocketSharp,
  IoSunnySharp,
  IoTrendingUpSharp,
} from "react-icons/io5";

// ─── Shared helpers ───────────────────────────────────────────────────────────

const PANEL_STYLE: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "14px",
  padding: "20px",
};

function PanelTitle({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      marginBottom: "16px",
    }}>
      {icon}
      <span style={{
        fontSize: "10px",
        color: "#64748b",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        fontFamily: "var(--font-geist-mono), monospace",
      }}>
        {label}
      </span>
    </div>
  );
}

function tempColor(temp: number): string {
  if (temp < -150) return "#60a5fa";
  if (temp < 0) return "#a78bfa";
  return "#fb923c";
}

function barPercent(temp: number): number {
  const min = -230;
  const max = 60;
  return Math.max(0, Math.min(100, ((temp - min) / (max - min)) * 100));
}

function TempBar({ label, temp }: { label: string; temp: number }) {
  const color = tempColor(temp);
  const pct = barPercent(temp);

  return (
    <div style={{ marginBottom: "12px" }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "6px",
      }}>
        <span style={{
          fontSize: "12px",
          color: "#94a3b8",
        }}>
          {label}
        </span>
        <span style={{
          fontSize: "12px",
          fontWeight: 700,
          color: color,
          fontFamily: "var(--font-geist-mono), monospace",
        }}>
          {temp > 0 ? "+" : ""}{temp}\u00B0C
        </span>
      </div>
      <div style={{
        height: "4px",
        borderRadius: "2px",
        background: "rgba(255,255,255,0.08)",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${pct}%`,
          borderRadius: "2px",
          background: color,
          transition: "width 0.6s ease",
        }} />
      </div>
    </div>
  );
}

function StatusRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 0",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
    }}>
      <span style={{
        fontSize: "12px",
        color: "#64748b",
      }}>
        {label}
      </span>
      <span style={{
        fontSize: "12px",
        fontWeight: 700,
        color: color,
        fontFamily: "var(--font-geist-mono), monospace",
      }}>
        {value}
      </span>
    </div>
  );
}

// ─── Panel 1: Instrument Temperatures ─────────────────────────────────────────

function InstrumentTemps() {
  return (
    <div style={PANEL_STYLE}>
      <PanelTitle
        icon={<IoThermometerSharp size={12} style={{ color: "#64748b" }} />}
        label="Instrument Temperatures"
      />
      <TempBar label="NIRCam" temp={-180} />
      <TempBar label="NIRSpec" temp={-168} />
      <TempBar label="MIRI" temp={-128} />
      <TempBar label="FGS/NIRISS" temp={-168} />
      <div style={{
        background: "rgba(96,165,250,0.06)",
        borderRadius: "8px",
        padding: "10px 12px",
        marginTop: "12px",
      }}>
        <span style={{
          fontSize: "11px",
          color: "#475569",
          lineHeight: 1.6,
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        }}>
          MIRI operates at the coldest temperature of any Webb instrument -- just 6 degrees above absolute zero.
        </span>
      </div>
    </div>
  );
}

// ─── Panel 2: Telescope Status ────────────────────────────────────────────────

function TelescopeStatus() {
  return (
    <div style={PANEL_STYLE}>
      <PanelTitle
        icon={<IoRocketSharp size={12} style={{ color: "#64748b" }} />}
        label="Telescope Status"
      />
      <StatusRow label="Current Status" value="Science Operations" color="#22c55e" />
      <StatusRow label="Orbit" value="L2 Lagrange Point" color="#60a5fa" />
      <StatusRow label="Distance from Earth" value="1.5M km" color="#a78bfa" />
      <StatusRow label="Mirror Segments" value="18 / 18 aligned" color="#22c55e" />
      <StatusRow label="Sunshield" value="Fully deployed" color="#22c55e" />
      <StatusRow label="Science Mode" value="Active" color="#22c55e" />
    </div>
  );
}

// ─── Panel 3: Spacecraft Temperatures ─────────────────────────────────────────

function SpacecraftTemps() {
  return (
    <div style={PANEL_STYLE}>
      <PanelTitle
        icon={<IoSunnySharp size={12} style={{ color: "#64748b" }} />}
        label="Spacecraft Temperatures"
      />
      <TempBar label="Warm Side 1 (Sun-facing)" temp={51} />
      <TempBar label="Warm Side 2" temp={12} />
      <TempBar label="Cool Side 1 (Space-facing)" temp={-217} />
      <TempBar label="Cool Side 2" temp={-213} />
    </div>
  );
}

// ─── Panel 4: Mission Statistics ──────────────────────────────────────────────

function MissionStats() {
  return (
    <div style={PANEL_STYLE}>
      <PanelTitle
        icon={<IoTrendingUpSharp size={12} style={{ color: "#64748b" }} />}
        label="Mission Statistics"
      />
      <StatusRow label="Launch Date" value="Dec 25, 2021" color="#94a3b8" />
      <StatusRow label="Science Start" value="Jul 12, 2022" color="#94a3b8" />
      <StatusRow label="Total Observations" value="12,000+" color="#60a5fa" />
      <StatusRow label="Programmes" value="350+" color="#a78bfa" />
      <StatusRow label="Papers Published" value="900+" color="#22c55e" />
      <StatusRow label="Primary Mirror" value="6.5 meters" color="#94a3b8" />
    </div>
  );
}

// ─── TelemetryTab ─────────────────────────────────────────────────────────────

export default function TelemetryTab() {
  return (
    <div style={{
      padding: "24px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
      height: "100%",
      overflowY: "auto",
      boxSizing: "border-box",
    }}>
      <InstrumentTemps />
      <TelescopeStatus />
      <SpacecraftTemps />
      <MissionStats />
    </div>
  );
}
