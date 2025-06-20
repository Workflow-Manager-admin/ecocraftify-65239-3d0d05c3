import React, { useMemo, useEffect, useState } from "react";

/**
 * LeafFallEffect: Gently animated SVG/CSS leaves falling down the page.
 * - Full viewport overlay (pointer-events: none)
 * - Leaves use EcoCraftify/Trash2Treasure greens
 * - Responsive: disabled or paused on small screens (mobile/tablet)
 * - Non-intrusive: Never blocks inputs or covers UI permanently (z-index low, pointer-events none)
 */
// --- Brand Greens ---
const LEAF_COLORS = [
  "#4CAF50",  // primary brand green
  "#8BC34A",  // secondary brand green
  "#45b257",  // plant highlight
  "#6ED37D",  // light leaf/branded
  "#B2F1C9",  // soft green
  "#7AD786",  // mid green
];
// Brand leaf accent (vein) color
const VEIN_COLOR = "#319c44";

// SVG leaf path data, several organic shapes
const SVG_LEAFS = [
  // Classic rounded brand leaf
  "M20 0 Q25 16 13 28 Q33 22 20 0 Z",
  // Pointy poplar leaf
  "M15 1 Q29 14 14 27 Q8 21 15 1 Z",
  // Wavy edge eco-leaf
  "M18 0 Q27 14 12 23 Q13 15 18 0 Z",
  // Droplet/teardrop leaf
  "M16 2 Q28 14 8 26 Q13 19 16 2 Z"
];

// For mobile detection: width <= 640px disables by default
function isMobile() {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= 640;
}

// PUBLIC_INTERFACE
function LeafFallEffect(props) {
  // Responsive – disable/stop leaves on mobile
  const [enabled, setEnabled] = useState(() => !isMobile());
  useEffect(() => {
    function check() {
      setEnabled(!isMobile());
    }
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // How many leaves? Moderate amount unless 'density' prop is set
  const numLeaves = props.density ||
    (window.innerWidth > 1400 ? 27 : window.innerWidth > 900 ? 19 : 12);

  // UseMemo to create the leaves' animation parameters just once per render
  const leaves = useMemo(() => {
    return Array.from({ length: numLeaves }).map((_, idx) => {
      // Randomize leaf shape, color, initial position, size, path, delay
      const shape = SVG_LEAFS[idx % SVG_LEAFS.length];
      const color = LEAF_COLORS[idx % LEAF_COLORS.length];
      const size = 18 + Math.random()*14 + Math.sin(idx)*7; // px
      const left = Math.random() * 100; // vw
      // Sway amplitude, slower/faster, unique for each
      const duration = 5.5 + Math.random()*7 + (idx%5)*1.1; // seconds
      const delay = Math.random()*6 + (idx%4); // sec
      // Sway
      const sway = 22+Math.random()*31; // px
      // Each leaf drifts down, has rotation + sway + opacity oscillation
      return {
        key: idx,
        shape, color, size, left,
        duration, delay, sway,
        rotate: -15 + Math.random()*45 * (Math.random() > 0.5 ? 1 : -1)
      };
    });
  // eslint-disable-next-line
  }, [numLeaves]);

  // Disabled on mobile? Do not render anything
  if (!enabled) return null;

  return (
    <div
      className="leaf-fall-effect"
      aria-hidden="true"
      style={{
        pointerEvents: "none",
        position: "fixed",
        left: 0, top: 0,
        width: "100vw", height: "100vh",
        zIndex: 1,
        overflow: "visible",
        mixBlendMode: "lighten",
        userSelect: "none",
        opacity: 0.96,
      }}
    >
      {leaves.map(leaf => (
        <svg
          key={leaf.key}
          width={leaf.size}
          height={leaf.size * 1.22}
          viewBox="0 0 34 34"
          style={{
            position: "absolute",
            left: `${leaf.left}vw`,
            top: `-${leaf.size*1.4}px`,
            opacity: 0.82 + Math.sin(leaf.key+1)*0.12,
            filter: "drop-shadow(0 1.5px 1.5px #a1efa222)",
            transform: `rotate(${leaf.rotate}deg)`,
            animation: `leaf-fall-anim ${leaf.duration}s ${leaf.delay}s linear infinite, leaf-sway-anim ${leaf.duration*1.11}s ${leaf.delay/2}s ease-in-out infinite alternate`
          }}
        >
          <path
            d={leaf.shape}
            fill={leaf.color}
            stroke={VEIN_COLOR}
            strokeWidth="1.3"
            opacity="1"
          />
          {/* Stylized midrib/vein */}
          <path
            d="M17 3 Q18 16 13 27"
            stroke={VEIN_COLOR}
            strokeWidth="0.8"
            fill="none"
            opacity="0.65"
          />
        </svg>
      ))}
      {/* Styles (scoped only if .leaf-fall-effect present on page) */}
      <style>{`
        @keyframes leaf-fall-anim {
          0%   { transform: translateY(0) rotate(var(--lf-rot, 0deg)); }
          70%  { opacity: 1; }
          100% { transform: translateY(95vh) rotate(var(--lf-rot, 0deg)); opacity: 0.38; }
        }
        @keyframes leaf-sway-anim {
          0%   { margin-left: 0; }
          50%  { margin-left: ${Math.round((Math.random()*19+10))}px; }
          100% { margin-left: 0; }
        }

        @media (max-width: 640px) {
          .leaf-fall-effect {
            display: none !important;
          }
        }
      `}
      </style>
    </div>
  );
}

export default LeafFallEffect;
