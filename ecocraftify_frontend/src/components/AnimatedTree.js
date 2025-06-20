import React from "react";

/**
 * AnimatedTree: A visually prominent, vertically oriented SVG tree.
 * The trunk sways gently, leaves "breathe", and color is brand-eco.
 * Designed for eco-friendly Trash2Treasure aesthetic.
 */
// PUBLIC_INTERFACE
function AnimatedTree({ style }) {
  return (
    <div
      className="ecocraftify-animated-tree-sidebar"
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 112,
        minHeight: 480,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 1,
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        width="88"
        height="470"
        viewBox="0 0 88 470"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animated-tree-svg"
        style={{
          display: "block",
          width: 88,
          height: "98%",
          maxHeight: 440,
        }}
      >
        {/* --- Trunk --- */}
        <g>
          <path
            className="animated-tree-trunk"
            d="M44,80 Q41,160 47,240 Q36,330 44,470"
            stroke="#547d40"
            strokeWidth="13"
            fill="none"
            strokeLinecap="round"
          />
          <path
            className="animated-tree-trunk-highlight"
            d="M46,80 Q44,160 48,240 Q42,335 46,470"
            stroke="#8BC34A"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity="0.13"
          />
        </g>

        {/* --- Main canopy leaves (large green blob) --- */}
        <g className="animated-tree-leaves-main">
          <ellipse
            cx="45"
            cy="54"
            rx="40"
            ry="28"
            fill="#6ed37d"
            opacity="0.94"
          />
          <ellipse
            cx="25"
            cy="60"
            rx="18"
            ry="10"
            fill="#B2F1C9"
            opacity="0.79"
          />
          <ellipse
            cx="65"
            cy="48"
            rx="18"
            ry="12"
            fill="#7AD786"
            opacity="0.79"
          />
        </g>

        {/* --- Side branches (with leaves) --- */}
        <g>
          <path
            className="animated-tree-branch branch-1"
            d="M43 150 Q14 140 7 100"
            stroke="#8BC34A"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse
            className="animated-tree-leaf branch-1-leaf"
            cx="9"
            cy="114"
            rx="11"
            ry="8"
            fill="#4CAF50"
            opacity="0.93"
          />
        </g>
        <g>
          <path
            className="animated-tree-branch branch-2"
            d="M47 190 Q80 200 85 155"
            stroke="#8BC34A"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse
            className="animated-tree-leaf branch-2-leaf"
            cx="80"
            cy="171"
            rx="9"
            ry="6"
            fill="#45b257"
            opacity="0.88"
          />
        </g>
        <g>
          <path
            className="animated-tree-branch branch-3"
            d="M44 280 Q10 316 21 350"
            stroke="#8BC34A"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity="0.8"
          />
          <ellipse
            className="animated-tree-leaf branch-3-leaf"
            cx="17"
            cy="338"
            rx="10"
            ry="7"
            fill="#6ED37D"
            opacity="0.85"
          />
        </g>
        <g>
          <path
            className="animated-tree-branch branch-4"
            d="M47 345 Q78 372 83 355"
            stroke="#4CAF50"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse
            className="animated-tree-leaf branch-4-leaf"
            cx="76"
            cy="360"
            rx="7"
            ry="6"
            fill="#8BC34A"
            opacity="0.88"
          />
        </g>

        {/* --- Ground shadow --- */}
        <ellipse
          cx="44"
          cy="466"
          rx="21"
          ry="4"
          fill="#D5F7DA"
          opacity="0.53"
        />
      </svg>
    </div>
  );
}

export default AnimatedTree;
