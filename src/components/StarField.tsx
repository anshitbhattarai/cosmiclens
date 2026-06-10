"use client";

import { useEffect, useRef } from "react";

const STAR_COUNT = 120;

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

function generateStars(): Star[] {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 0.5 + Math.random() * 2,
    opacity: 0.3 + Math.random() * 0.7,
    duration: 2 + Math.random() * 3,
    delay: -(Math.random() * 5),
  }));
}

const stars = generateStars();

export default function StarField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const styleEl = document.createElement("style");
    styleEl.textContent = `
      @keyframes twinkle {
        0%, 100% { opacity: 0.2; transform: scale(0.8); }
        50%       { opacity: 1;   transform: scale(1.2); }
      }
    `;
    document.head.appendChild(styleEl);

    stars.forEach((star) => {
      const el = document.createElement("div");
      el.style.cssText = `
        position: absolute;
        top: ${star.y}%;
        left: ${star.x}%;
        width: ${star.size}px;
        height: ${star.size}px;
        border-radius: 50%;
        background-color: white;
        animation: twinkle ${star.duration}s ease-in-out infinite;
        animation-delay: ${star.delay}s;
      `;
      container.appendChild(el);
    });

    return () => {
      styleEl.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        backgroundColor: "#020817",
      }}
    />
  );
}
