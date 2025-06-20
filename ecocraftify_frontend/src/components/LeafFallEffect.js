import React, { useMemo, useEffect, useState } from "react";

/**
 * LeafFallEffect: Visually lush, engaging leaf fall overlay.
 *  - More leaf shapes (including multi-color and stylized types)
 *  - Increased number/variety of leaves
 *  - Richer animation: randomized swaying, spinning, wobble, glowing, and drop-shadow for realism
 *  - Variable size, rotation, path, color, and UI depth
 *  - Responsive: disables on mobile/small screens (<=640px)
 */
// --- Greens and autumn accents for natural gradient effect ---
const LEAF_COLORS = [
  "#4CAF50", // primary green
  "#8BC34A", // secondary green
  "#45b257", // plant highlight
  "#6ED37D", // light
  "#B2F1C9", // pastel
  "#7AD786", // mid
  "#FFD966", // yellow accent for realism
  "#FF9C47", // orange
  "#DF715C", // rusty
  "#C9EDA5", // spring
];
const VEIN_COLOR = "#369543";
const LEAF_SHADOW = "0 2px 8px #99bc6e33";

// SVG paths for distinct, organic leaf shapes; mimic nature variety
const SVG_LEAFS = [
  // Eco round
  "M20 0 Q25 16 13 28 Q33 22 20 0 Z",
  // Elongated/pointy
  "M14 2 Q30 14 13 26 Q7 21 14 2 Z",
  // Wavy oak-like
  "M18 0 Q27 14 13 29 Q13 13 18 0 Z",
  // Droplet/teardrop
  "M17 2 Q29 14 8 27 Q13 19 17 2 Z",
  // Maple silhouette (stylized)
  "M17 3 L22 16 L32 16 L24 22 L27 32 L17 25 L7 32 L10 22 L2 16 L12 16 Z",
  // Heart leaf
  "M17 8 Q13 2 6 12 Q-2 22 17 32 Q36 22 28 12 Q21 2 17 8 Z",
];

// Subtle color offset for autumn glow
const LEAF_FILTERS = [
  "drop-shadow(0 3px 7px #8bc34a44)",
  "drop-shadow(0 2px 12px #c9eda588)",
  "drop-shadow(0 2px 9px #ffbb2a33)",
  "drop-shadow(0 3px 9px #e6c69355)",
  "drop-shadow(0 2px 9px #8fd26e55)"
];

// Gold/yellow for glow (autumn accent, not every leaf)
const getGlow = (color) =>
  color === "#FFD966" || color === "#FF9C47"
    ? "0 0 24px 2px #ffe5807a"
    : color === "#DF715C"
    ? "0 0 16px 2px #ffa87677"
    : "";

// Generate custom swaying and rotating keyframes for each leaf for realism
function genLeafKeyframe(idx) {
  const sway = 30 + Math.random() * 54;
  const rotA = -17 + Math.random() * 54 * (Math.random() > 0.5 ? 1 : -1);
  const rotB = rotA * (Math.random() > 0.4 ? -1 : 1) + Math.random() * 13;
  const skewA = -6 + Math.random() * 16;
  const skewB = skewA * (Math.random() > 0.5 ? -1 : 1) + Math.random() * 9;
  return `
@keyframes leaf-fall-path-${idx} {
  0%   { transform: translateY(0px) translateX(0px) rotate(${rotA}deg) skewX(${skewA}deg) scale(1);}
  9%   { transform: translateY(3%) translateX(-6px) rotate(${rotA - 7}deg) skewX(${skewA / 3}deg);}
  30%  { transform: translateY(${sway / 1.5}px) translateX(${sway}px) rotate(${rotB}deg) skewX(${skewB}deg);}
  55%  { transform: translateY(${sway * 2.1}px) translateX(${
    sway * -0.79
  }px) rotate(${rotB / 2}deg) skewX(${-skewB}deg);}
  80%  { transform: translateY(${sway * 3.5}px) translateX(0px) rotate(${
    rotB / 3
  }deg) skewX(${skewA}deg);}
  100% { transform: translateY(104vh) translateX(${sway}px) rotate(${
    rotA * 1.7
  }deg) skewX(${skewB}deg) scale(1.13);}
}
@keyframes leaf-spin-${idx} {
  0%   { filter: brightness(1.04) }
  22%  { filter: brightness(1.13); }
  50%  { filter: brightness(1.06) drop-shadow(0 2.5px 8px #b4f6ca88);}
  62%  { filter: brightness(1.07);}
  100% { filter: brightness(1.0); }
}
  `;
}

// For mobile detection: width <= 640px disables animation
function isMobile() {
  if (typeof window === "undefined" || !window.innerWidth) return false;
  return window.innerWidth <= 640;
}

// PUBLIC_INTERFACE
function LeafFallEffect(props) {
  // Responsive – disable on mobile
  const [enabled, setEnabled] = useState(() => !isMobile());
  useEffect(() => {
    function check() {
      setEnabled(!isMobile());
    }
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Many leaves for lush effect (overridable)
  const numLeaves = props.density
    || (window.innerWidth > 1500 ? 46 : window.innerWidth > 1080 ? 32 : 17);

  // Generate leaves and keyframes only once per render
  const [leafCss, leaves] = useMemo(() => {
    let dynamicCss = "";
    const leavesData = Array.from({ length: numLeaves }).map((_, idx) => {
      // Randomize organic details
      const shape = SVG_LEAFS[Math.floor(Math.random() * SVG_LEAFS.length)];
      const color = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)];
      const shadow = LEAF_FILTERS[Math.floor(Math.random() * LEAF_FILTERS.length)];
      const size = 17 + Math.random() * 28;
      const left = Math.random() * 98; // vw
      const z = Math.floor(Math.random() * 3) + 1; // for depth effect
      const opac = 0.7 + Math.random() * 0.28;
      const duration = 7 + Math.random() * 10 + (idx % 5) * 0.91;
      const delay = Math.random() * 8 + (idx % 8) * 0.7;
      const rotInit = -38 + Math.random() * 85 * (Math.random() > 0.4 ? 1 : -1);
      const glow = getGlow(color);
      // Keyframes for each leaf
      dynamicCss += genLeafKeyframe(idx);
      return {
        key: idx,
        shape,
        color,
        shadow,
        size,
        left,
        opac,
        duration,
        delay,
        z,
        rotInit,
        glow,
        kf_name: `leaf-fall-path-${idx}`,
        spin_name: `leaf-spin-${idx}`,
        isMaple: shape.indexOf("L22 16") > 0, // simple check for details
        isHeart: shape.indexOf("Q13 2") > 0
      };
    });
    return [dynamicCss, leavesData];
    // eslint-disable-next-line
  }, [numLeaves]);

  if (!enabled) return null;

  return (
    <div
      className="leaf-fall-effect"
      aria-hidden="true"
      style={{
        pointerEvents: "none",
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1,
        overflow: "visible",
        userSelect: "none",
        opacity: 0.99,
        mixBlendMode: "luminosity",
        background: "none",
      }}
    >
      {/* Distribute leaves naturally, use custom path, sizes, depth/z for realism */}
      {leaves.map((leaf) => (
        <svg
          key={leaf.key}
          width={leaf.size}
          height={leaf.size * 1.3}
          viewBox="0 0 34 36"
          style={{
            position: "absolute",
            left: `${leaf.left}vw`,
            top: `-${leaf.size * (0.7 + Math.random() * 0.85)}px`,
            opacity: leaf.opac,
            filter: `${leaf.shadow}${leaf.glow ? ` ${leaf.glow}` : ""}`,
            zIndex: leaf.z,
            transform: `rotate(${leaf.rotInit}deg) scale(${
              0.86 + Math.random() * 0.35
            }, ${0.86 + Math.random() * 0.20})`,
            // Individual leaf custom animation!
            animation: `${leaf.kf_name} ${leaf.duration}s ${leaf.delay}s linear infinite, ${leaf.spin_name} ${leaf.duration *
              (1.25 + Math.random() * 0.4)}s ${leaf.delay / 2}s ease-in-out infinite alternate`
          }}
        >
          <g>
            {/* Main leaf shape */}
            <path
              d={leaf.shape}
              fill={leaf.color}
              stroke={VEIN_COLOR}
              strokeWidth={leaf.isMaple ? "0.7" : "1.1"}
              opacity={leaf.isHeart ? "0.87" : "1"}
              style={{
                filter:
                  leaf.isHeart || leaf.isMaple
                    ? "drop-shadow(0 1.5px 2.9px #c2982977)"
                    : undefined
              }}
            />
            {/* Vein/midrib (organic, curved for non-autumn shapes) */}
            <path
              d={
                leaf.isMaple
                  ? "M17 4 L17 29"
                  : "M17 4 Q18 18 13 27"
              }
              stroke={VEIN_COLOR}
              strokeWidth={leaf.isMaple ? "0.62" : "0.88"}
              fill="none"
              opacity="0.52"
            />
            {/* Subtle left/right veins for extra detail */}
            {leaf.isMaple ? (
              <>
                <path
                  d="M17 10 L27 14"
                  stroke="#b67928"
                  strokeWidth="0.5"
                  fill="none"
                  opacity="0.37"
                />
                <path
                  d="M17 10 L7 14"
                  stroke="#b67928"
                  strokeWidth="0.5"
                  fill="none"
                  opacity="0.37"
                />
              </>
            ) : (
              <>
                <path
                  d="M15 13 Q17 16 19 17"
                  stroke="#abeb9a"
                  strokeWidth="0.62"
                  fill="none"
                  opacity="0.47"
                />
                <path
                  d="M15 17 Q16 21 13 22"
                  stroke="#81e678"
                  strokeWidth="0.5"
                  fill="none"
                  opacity="0.29"
                />
              </>
            )}
          </g>
        </svg>
      ))}
      {/* Dynamically generated keyframes for fluid, realistic, non-uniform movement */}
      <style>
        {`
        ${leafCss}
        @media (max-width: 640px) {
          .leaf-fall-effect { display: none !important; }
        }
      `}
      </style>
    </div>
  );
}

export default LeafFallEffect;
