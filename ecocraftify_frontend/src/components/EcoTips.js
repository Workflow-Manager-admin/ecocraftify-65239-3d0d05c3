import React, { useEffect, useState } from "react";

/**
 * EcoTips: Visually lush, interactive, and card-based eco living guide—delivers
 * tips, facts, myths, and articles with rich theming, eco icons/illustrations,
 * animated highlights, and lively responsive effects—now highly polished for engagement and clarity.
 */
// PUBLIC_INTERFACE
function EcoTips() {
  // Wikipedia article state — async/fallback
  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  // Section content
  const WIKI_TOPICS = [
    { key: "Composting", label: "Composting" },
    { key: "Recycling", label: "Recycling" },
    { key: "Reduce,_reuse,_recycle", label: "Reduce, Reuse, Recycle" },
  ];
  const FALLBACK_ARTICLES = [
    {
      title: "Composting",
      summary:
        "Composting recycles organic waste (food scraps, yard trimmings) into nutrient-rich soil — a fun, easy way to reduce your trash and supercharge your garden.",
      link: "https://en.wikipedia.org/wiki/Composting",
    },
    {
      title: "Recycling",
      summary:
        "Recycling transforms used materials—like paper, glass, and cans—into valuable new products. Every recycled item saves resources, energy, and reduces pollution.",
      link: "https://en.wikipedia.org/wiki/Recycling",
    },
    {
      title: "Reduce, Reuse, Recycle",
      summary:
        "Think before you toss! The 3 R's cut waste, conserve resources, and protect the environment. Make them your daily habit.",
      link: "https://en.wikipedia.org/wiki/Reduce,_reuse,_recycle",
    },
  ];
  const ECO_FUN_FACTS = [
    "🍃 Recycling one aluminum can saves enough energy to run a laptop for 3 hours!",
    "🌎 Over 60% of household trash could be recycled or composted.",
    "🌱 Composting at home can shrink your waste by 30% and boost plant health.",
    "💧 Every plastic bottle takes up to 500 years to break down in a landfill.",
    "♻️ Glass is 100% recyclable and can be recycled endlessly!",
  ];
  const ECO_MYTHS = [
    {
      myth: "All plastics are recyclable.",
      fact: "🚫 Only specific plastics (check the triangle numbers!) can be recycled. Others belong in trash or specialized drop-offs.",
    },
    {
      myth: "Composting is always smelly.",
      fact: "🙃 A healthy bin should have an earthy scent. Bad smells mean you can easily adjust your carbon/nitrogen blend!",
    },
    {
      myth: "Recycling uses more energy than creating new products.",
      fact: "🔋 Recycling saves both energy and raw materials—it's vastly more efficient for most materials.",
    },
    {
      myth: "Paper bags are always greener than plastic ones.",
      fact: "🌳 Actually, reusing bags (regardless of material) is always best for the environment.",
    },
  ];
  const GREEN_TIPS = [
    {
      tip: "Switch to reusable bottles and cups.",
      icon: <ReusableIcon />,
    },
    {
      tip: "Unplug chargers and small appliances when not in use.",
      icon: <PlugIcon />,
    },
    {
      tip: "Compost your kitchen scraps to nourish your garden.",
      icon: <CompostIcon />,
    },
    {
      tip: "Bring cloth bags whenever you shop—no matter the store.",
      icon: <BagIcon />,
    },
    {
      tip: "Repurpose glass jars for food storage or crafts.",
      icon: <JarIcon />,
    },
  ];

  // Wikipedia fetch
  useEffect(() => {
    let cancelled = false;
    async function fetchArticles() {
      setLoadingArticles(true);
      try {
        const fetches = WIKI_TOPICS.map(topic =>
          fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${topic.key}`
          ).then(res => (res.ok ? res.json() : null))
        );
        const results = await Promise.all(fetches);
        const articlesFetched = results.map(
          (item, idx) =>
            item && item.title && item.extract
              ? {
                  title: item.title,
                  summary: item.extract,
                  link:
                    item.content_urls?.desktop?.page ||
                    FALLBACK_ARTICLES[idx]?.link,
                }
              : FALLBACK_ARTICLES[idx]
        );
        if (!cancelled) setArticles(articlesFetched);
      } catch {
        if (!cancelled) setArticles(FALLBACK_ARTICLES);
      } finally {
        if (!cancelled) setLoadingArticles(false);
      }
    }
    fetchArticles();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line
  }, []);

  // ---- Animated/fancy highlight for "Tip of the Day" ----
  const todaysTip = GREEN_TIPS[new Date().getDay() % GREEN_TIPS.length];

  return (
    <div
      className="ecotips-root-ecocraftify"
      style={{
        ...rootStyle,
        background:
          "repeating-linear-gradient(110deg, #eafced 0px, #eafced 45px, #fafdff 145px, #e5f6df 355px, #fafdff 470px)",
        position: "relative",
        borderRadius: 22,
        boxShadow: "0 4px 36px 0 rgba(67,175,80,0.10)",
        overflow: "visible"
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -19, left: 18,
          width: 128, height: 32,
          zIndex: 22,
          pointerEvents: "none",
        }}
      >
        {ecoRibbonSvg}
      </div>
      <h1 style={headerStyle}>
        <span
          style={{
            verticalAlign: "sub",
            marginRight: 7,
            fontSize: "2.05rem",
            filter: "drop-shadow(0 2.5px 10px #b2f1c966)",
            textShadow: "0 .5px #fff, 0 0 12px #e8fbe224"
          }}
        >
          🌿
        </span>
        Eco Tips & Green Wisdom
      </h1>
      <div
        className="ecotips-card-columns"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "28px 17px",
          justifyContent: "space-between",
          marginTop: 12,
          zIndex: 2,
          width: "100%"
        }}
      >
        {/* --------- Card 1: Green Tip of the Day --------- */}
        <TipCard
          iconBg="linear-gradient(135deg, #e2f6d2 70%, #bdf3b1 140%)"
          highlight
          icon={todaysTip.icon}
          title="Green Tip of the Day"
          description={todaysTip.tip}
          tipsList={GREEN_TIPS}
        />
        {/* --------- Card 2: Eco Articles --------- */}
        <ArticleCard
          iconBg="linear-gradient(120deg, #eafced 65%, #f0fbec 100%)"
          icon={<BookIcon animated />}
          title="Eco Articles & Guides"
          loading={loadingArticles}
          articles={articles}
        />
        {/* --------- Card 3: Fun Eco Facts --------- */}
        <FactCard
          iconBg="linear-gradient(135deg,#fffbe8,#eaffb5 88%)"
          icon={<LeafIcon animated />}
          title="Surprising Eco-Facts"
          facts={ECO_FUN_FACTS}
        />
        {/* --------- Card 4: Eco Myths Busted --------- */}
        <MythCard
          iconBg="linear-gradient(120deg,#fbeedb 60%,#fff4cc 130%)"
          icon={<AlertIcon animated />}
          title="Eco Myths – Busted"
          myths={ECO_MYTHS}
        />
      </div>
      <style>
        {`
        .ecotips-card-columns { z-index: 3; }
        .ecotips-tipcard-ecocraftify:hover {
          box-shadow: 0 4px 28px 0 rgba(76, 175, 80, 0.23), 0 0 0 4px #eafccc6a;
          transform: translateY(-7px) scale(1.048);
          border-color: var(--primary-green);
          background: linear-gradient(110deg,#e5f6df 80%,#edffe7 120%) !important;
        }
        .ecotips-tipcard-ecocraftify {
          transition: box-shadow 0.23s, transform 0.19s, border-color 0.26s, background 0.20s cubic-bezier(.44,1.44,0.33,1);
        }
        .ecotips-tip-flash {
          animation: tip-flash-bounce 1.3s cubic-bezier(.87,0,.63,1.09) 2;
          background: linear-gradient(98deg,#e6ffcb 60%,#eafced 100%);
          filter: drop-shadow(0 1.5px 10px #c9eda599);
        }
        @keyframes tip-flash-bounce {
          0% { box-shadow: 0 0 0px #B2F1C9;}
          15% { box-shadow: 0 0 17px #C9EDA5;}
          35% { box-shadow: 0 0 2px #B2F1C9;}
          48% { box-shadow: 0 0 18px #8BC34A;}
          67% { box-shadow: 0 0 0px #B2F1C9;}
          100%{ box-shadow: 0 0 0px #B2F1C9;}
        }
        .ecotips-article-box-ecocraftify:hover {
          background: linear-gradient(97deg,#dafab7 65%, #d6fbe2 100%) !important;
          box-shadow: 0 5px 25px 0 rgba(67,175,80,0.19);
          transform: scale(1.035) translateY(-3px);
        }
        .ecotips-article-box-ecocraftify {
          transition: box-shadow 0.22s, background 0.23s, transform 0.16s cubic-bezier(.44,1.4,.61,1);
        }
        .ecotips-fact-pop:hover {
          background: linear-gradient(89deg,#f8ffe3 60%,#fbffe7 130%) !important;
          color: var(--accent-yellow) !important;
          box-shadow: 0 1.2px 13px #ffe99747;
          transform: scale(1.022) translateY(-2px);
        }
        .ecotips-fact-pop {
          transition: color 0.17s, background 0.22s, box-shadow 0.22s, transform 0.18s;
        }
        .ecotips-myth-row-eco:hover {
          background: linear-gradient(102deg,#e6f3df 80%,#f6ffe0 105%);
          transform: translateX(3px) scale(1.021);
          box-shadow: 0 3.5px 10px #c9eda535;
        }
        .ecotips-myth-row-eco {
          transition: transform 0.20s, background 0.20s, box-shadow 0.22s;
        }
        .ecotips-icon-circle {
          box-shadow: 0 3.5px 20px 0 rgba(96,200,75,0.08), 0 1px 2.5px #b2f1c933;
          outline: 3px solid #eafced77;
          outline-offset: 1.5px;
          animation: icon-glow 2.15s cubic-bezier(.41,.03,.55,1.29) infinite alternate;
        }
        @keyframes icon-glow {
          0% { box-shadow: 0 0 12px #d0ffb324,0 1.5px 10px #c3f6ce22; }
          55% { box-shadow: 0 0 22px #c9eda555, 0 1.5px 4px #fffbe8; }
          100% { box-shadow: 0 0 12px #b2f1c933,0 1.5px 9px #edfab399; }
        }
        .ecotips-card-columns > * {
          margin-bottom: 0;
        }
        /* Eco ribbon - blur glow below ribbon */
        .ecotips-eco-ribbon-glow {
          position: absolute; left: 0; top: 8px;
          width: 140px; height: 29px;
          background: linear-gradient(90deg,#bdf3b1 30%,#eafced 100%);
          filter: blur(8px) brightness(1.14);
          border-radius: 25px;
          opacity: 0.60;
          z-index: 1;
        }
        @media (max-width: 830px) {
          .ecotips-card-columns {
            flex-direction: column;
            gap: 19px !important;
            width: 100% !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }
      `}
      </style>
    </div>
  );
}

const ecoRibbonSvg = (
  <svg
    width="128"
    height="32"
    viewBox="0 0 128 32"
    aria-hidden="true"
    style={{ position: "absolute", zIndex: 3, pointerEvents: "none" }}
  >
    <defs>
      <linearGradient id="ecoRibbon" x1="0%" y1="0%" x2="97%" y2="0%">
        <stop offset="0%" stopColor="#bdf3b1" />
        <stop offset="46%" stopColor="#88e393" />
        <stop offset="80%" stopColor="#e8fbe2" />
      </linearGradient>
      <filter id="eco-ribbon-glow" x="-22%" y="-55%" width="160%" height="270%">
        <feGaussianBlur stdDeviation="9" result="glow" />
        <feBlend in="SourceGraphic" in2="glow" mode="screen" />
      </filter>
    </defs>
    <rect
      x="6" y="5" rx="20" ry="16"
      width="116" height="22"
      fill="url(#ecoRibbon)"
      stroke="#4CAF50"
      strokeWidth="0.6"
      filter="url(#eco-ribbon-glow)"
      opacity="0.86"
    />
    <text
      x="50%" y="55%"
      textAnchor="middle"
      fontFamily="Inter,sans-serif"
      fontSize="15"
      fontWeight="700"
      fill="#4CAF50"
      opacity="0.91"
      style={{ letterSpacing: "0.04em" }}
      dominantBaseline="middle"
    >
      EcoCraftify
    </text>
  </svg>
);

// ---- Section/Card Components ----

function TipCard({ icon, highlight, title, description, tipsList, iconBg }) {
  return (
    <div
      className={`ecotips-tipcard-ecocraftify${highlight ? " ecotips-tip-flash" : ""}`}
      style={{
        ...cardBaseStyle,
        minWidth: 260,
        maxWidth: 390,
        background:
          "linear-gradient(103deg,#fafdff 80%,#eafccc 120%)",
        border: highlight
          ? "2.5px solid var(--primary-green)"
          : "1.7px solid var(--border-color)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          className="ecotips-icon-circle"
          style={{
            ...iconCircleStyle,
            background: iconBg || "#e8fbe2",
          }}
        >
          {icon}
        </div>
        <div>
          <h2 style={cardHeaderStyle}>{title}</h2>
        </div>
      </div>
      <div
        style={{
          fontSize: "1.07em",
          color: "var(--secondary-green)",
          margin: "9px 0 6px 0",
          fontWeight: 600,
          letterSpacing: "0.01em",
        }}
      >
        {description}
      </div>
      <ul
        style={{
          margin: "7px 0 0 0",
          paddingLeft: 15,
          color: "var(--primary-green)",
          fontWeight: 500,
          fontSize: "0.97em",
        }}
      >
        {tipsList &&
          tipsList.map((t, i) => (
            <li key={i} style={{ marginBottom: 2 }}>
              {typeof t === "object" ? (t.icon ? (
                <span style={{ verticalAlign: "middle", marginRight: 5, fontSize: "1.09em" }}>{t.icon}</span>
              ) : null) : null}
              {typeof t === "object" ? t.tip : t}
            </li>
          ))}
      </ul>
    </div>
  );
}

function ArticleCard({ icon, iconBg, title, loading, articles }) {
  return (
    <div style={{ ...cardBaseStyle, minWidth: 260, maxWidth: 370 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div className="ecotips-icon-circle" style={{ ...iconCircleStyle, background: iconBg || "#eafced" }}>
          {icon}
        </div>
        <h2 style={cardHeaderStyle}>{title}</h2>
      </div>
      {loading ? (
        <div style={{ color: "#6eae52", fontStyle: "italic", marginTop: 18 }}>Loading green articles...</div>
      ) : (
        <div>
          {articles.map((article, idx) => (
            <div
              key={article.title + idx}
              className="ecotips-article-box-ecocraftify"
              style={{
                background: "#e8fbe2",
                border: "1.2px solid #B2F1C9",
                borderRadius: 9,
                padding: "11px 13px 8px 13px",
                marginBottom: 10,
                boxShadow: "0 1.5px 8px 0 rgba(67,175,80,0.08)",
                cursor: "pointer",
              }}
              tabIndex={0}
              aria-label={"Read " + article.title}
              onClick={() => window.open(article.link, "_blank", "noopener,noreferrer")}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") {
                  window.open(article.link, "_blank", "noopener,noreferrer");
                }
              }}
            >
              <div style={{ fontWeight: 600, color: "var(--primary-green)", fontSize: "1.07em" }}>
                <BookIcon style={{ marginRight: 6, fontSize: "1.10em" }} />
                {article.title}
              </div>
              <div
                style={{
                  fontSize: "0.97em",
                  color: "var(--text-secondary)",
                  margin: "1.5px 0 7px",
                  lineHeight: 1.5,
                  opacity: 0.95,
                }}
              >
                {article.summary}
              </div>
              <span style={{ color: "var(--secondary-green)", fontWeight: 500, fontSize: "0.96em" }}>
                Read more &rarr;
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FactCard({ icon, iconBg, title, facts }) {
  return (
    <div style={{ ...cardBaseStyle, minWidth: 245, maxWidth: 360 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div className="ecotips-icon-circle" style={{ ...iconCircleStyle, background: iconBg || "#fffbe8" }}>
          {icon}
        </div>
        <h2 style={cardHeaderStyle}>{title}</h2>
      </div>
      <ul style={{ marginTop: 12, marginBottom: 0, paddingLeft: 16, color: "#688A3B", fontWeight: 500, fontSize: "1.01em" }}>
        {facts.map((fact, i) => (
          <li
            key={i}
            className="ecotips-fact-pop"
            style={{
              marginBottom: 10,
              color: "var(--primary-green)",
              background: "#fafdff",
              borderRadius: 7,
              padding: "5px 10px 5px 8px",
              transition: "background 0.21s, color 0.15s",
              willChange: "background,color",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
            aria-label="Fun eco fact"
          >
            <LeafIcon style={{ marginRight: 7, fontSize: "1.17em" }} />
            <span>{fact}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MythCard({ icon, iconBg, title, myths }) {
  return (
    <div style={{ ...cardBaseStyle, minWidth: 245, maxWidth: 370 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div className="ecotips-icon-circle" style={{ ...iconCircleStyle, background: iconBg || "#fff3d7" }}>
          {icon}
        </div>
        <h2 style={cardHeaderStyle}>{title}</h2>
      </div>
      <ul style={{ marginTop: 10, marginBottom: 0, paddingLeft: 6, fontSize: "0.97em" }}>
        {myths.map((m, i) => (
          <li
            key={i}
            className="ecotips-myth-row-eco"
            style={{
              background: "#fbeedb",
              borderRadius: 9,
              padding: "6px 10px 7px 11px",
              marginBottom: 7,
              boxShadow: "0 0.5px 2px 0 rgba(219,167,94,0.02)",
              cursor: "help",
              transition: "background 0.16s",
              willChange: "background,transform",
            }}
            tabIndex={0}
            aria-label={`Myth: ${m.myth}. Fact: ${m.fact}`}
          >
            <strong style={{ color: "#ba8f17" }}>
              Myth:&nbsp;
              <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>{m.myth}</span>
            </strong>
            <div
              style={{
                color: "var(--primary-green)",
                marginLeft: 3,
                paddingLeft: 1,
                fontWeight: 600,
                marginTop: 3,
                lineHeight: 1.32,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span aria-label="Fact" role="img" style={{ fontSize: "1.12em" }}>
                ✔
              </span>
              {m.fact}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/*
 * Animated and visually-rich icon components.
 * All are accessible. When "animated" prop is present, render SVG/CSS animation.
 */
function LeafIcon({ animated = false, ...props }) {
  if (!animated) {
    return (
      <span
        role="img"
        aria-label="leaf"
        {...props}
        style={{
          color: "#51c651",
          filter: "drop-shadow(0 2px 4px #7ad786af)",
          ...props?.style,
        }}
      >
        🌱
      </span>
    );
  }
  // Lively SVG: animated glow, eco-bounce, green gradients
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 34 36"
      style={{
        marginRight: 1,
        verticalAlign: "middle",
        filter: "drop-shadow(0 1.5px 9px #b2f1c9aa)",
        animation: "eco-bounce .85s cubic-bezier(.53,1.6,.33,1.04) infinite alternate",
        ...props?.style
      }}
      aria-label="leaf"
      className="eco-animated-leaf-svg"
    >
      <defs>
        <linearGradient id="lg1" x1="0" y1="30" x2="34" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#bdf3b1"/>
          <stop offset="0.54" stopColor="#88e393" />
          <stop offset="1" stopColor="#6ED37D" />
        </linearGradient>
      </defs>
      <path
        d="M20 0 Q25 16 13 28 Q33 22 20 0 Z"
        fill="url(#lg1)"
        stroke="#4CAF50"
        strokeWidth="2"
        opacity="0.98"
        style={{ filter:"drop-shadow(0 1.5px 6px #c9eda599)" }}
      />
      <path d="M17 4 Q18 18 13 27" stroke="#6ed37d" strokeWidth="1.2" fill="none" opacity="0.62"/>
    </svg>
  );
}
function BookIcon({ animated = false, ...props }) {
  if (!animated) {
    return (
      <span
        role="img"
        aria-label="book"
        {...props}
        style={{
          color: "#ba8f17",
          textShadow: "0 1.5px #ffc10744",
          ...props?.style,
        }}
      >
        📖
      </span>
    );
  }
  // Animated SVG book: gentle page "flip"
  return (
    <svg
      width="33"
      height="32"
      viewBox="0 0 33 32"
      aria-label="book"
      style={{
        marginRight: 1, verticalAlign: "middle",
        filter: "drop-shadow(0 2.5px 7px #fffbe899)",
        animation: "eco-flip 1.8s linear infinite alternate",
        ...props?.style
      }}
    >
      <defs>
        <linearGradient id="bk1" x1="0" y1="26" x2="31" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fbeedb"/>
          <stop offset="0.74" stopColor="#fffbe8" />
          <stop offset="1" stopColor="#ffe997" />
        </linearGradient>
      </defs>
      <rect x="4" y="6" width="25" height="18" rx="4" fill="url(#bk1)" stroke="#ba8f17" strokeWidth="1.3"/>
      <path className="eco-page-flip" d="M16.5,6 V25" stroke="#fffbe8" strokeWidth="2.2"/>
      <ellipse cx="16.5" cy="26" rx="12.2" ry="2.3" fill="#eddec6" opacity="0.19"/>
    </svg>
  );
}
function AlertIcon({ animated = false, ...props }) {
  if (!animated) {
    return (
      <span
        role="img"
        aria-label="alert"
        {...props}
        style={{
          color: "#FFA726",
          textShadow: "0 1.5px #ffc10744",
          ...props?.style,
        }}
      >
        ⚠️
      </span>
    );
  }
  // Animated SVG: pulsing triangle
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      aria-label="alert"
      className="eco-animated-alert-icon"
      style={{
        marginLeft:1, marginRight:2,
        verticalAlign:"middle",
        filter: "drop-shadow(0 2.5px 7px #ffd96699)",
        animation: "eco-alert-pulse 1.32s cubic-bezier(.45,1.4,.47,1.09) infinite alternate",
        ...props?.style
      }}
    >
      <polygon points="15,3 28,27 2,27" fill="#FFC107" stroke="#ba8f17" strokeWidth="1.4"/>
      <rect x="13" y="12" width="4" height="8" rx="1.3" fill="#fffbe8"/>
      <circle cx="15" cy="23" r="1.25" fill="#8b6537"/>
    </svg>
  );
}
function ReusableIcon(props) {
  // Water bottle/cup, bounce animated
  return (
    <span
      role="img"
      aria-label="reusable"
      {...props}
      style={{
        fontSize: "1.22em",
        color: "#8BC34A",
        filter: "drop-shadow(0 2.5px 10px #bdf3b169)",
        animation: "eco-bounce .9s cubic-bezier(.44,1.44,.33,1.12) infinite alternate",
        ...props?.style
      }}
    >
      🥤
    </span>
  );
}
function PlugIcon(props) {
  return (
    <span
      role="img"
      aria-label="plug"
      {...props}
      style={{
        fontSize: "1.13em",
        color: "#FFD966",
        filter: "drop-shadow(0 2.5px 10px #ffe99766)",
        animation: "eco-bounce .88s cubic-bezier(.44,1.44,.33,1.12) infinite alternate-reverse",
        ...props?.style
      }}
    >
      🔌
    </span>
  );
}
function BagIcon(props) {
  return (
    <span
      role="img"
      aria-label="bag"
      {...props}
      style={{
        fontSize: "1.14em",
        color: "#FFC107",
        filter: "drop-shadow(0 2px 8px #ffe99744)",
        ...props?.style
      }}
    >
      🛍️
    </span>
  );
}
function CompostIcon(props) {
  return (
    <span
      role="img"
      aria-label="compost"
      {...props}
      style={{
        fontSize: "1.17em",
        color: "#4CAF50",
        filter: "drop-shadow(0 2.5px 8px #bdf3b177)",
        ...props?.style
      }}
    >
      🌾
    </span>
  );
}
function JarIcon(props) {
  return (
    <span
      role="img"
      aria-label="jar"
      {...props}
      style={{
        fontSize: "1.13em",
        color: "#b2f1c9",
        filter: "drop-shadow(0 2.5px 8px #bdf3b144)",
        ...props?.style
      }}
    >
      🫙
    </span>
  );
}

// Extra CSS keyframes for icons & bounce/flip
// See style block below: .eco-bounce, .eco-flip, .eco-animated-leaf-svg, .eco-animated-alert-icon

// ---- Styling ----
const rootStyle = {
  marginTop: "72px",
  marginBottom: "44px",
  padding: "0 0 22px 0",
  minHeight: 500,
  width: "100%",
  boxSizing: "border-box",
};
const headerStyle = {
  fontFamily: "Inter,Arial,sans-serif",
  fontWeight: 800,
  fontSize: "2.19rem",
  color: "var(--primary-green)",
  letterSpacing: "-0.01em",
  marginBottom: 13,
  marginTop: 6,
  textAlign: "left",
  lineHeight: 1.16,
};
const iconCircleStyle = {
  width: 52,
  height: 52,
  minWidth: 52,
  minHeight: 52,
  background: "linear-gradient(120deg,#eafced 70%,#bdf3b1 130%)",
  borderRadius: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2rem",
  boxShadow:
    "0 3.5px 20px 0 rgba(96,200,75,0.10), 0 1px 2.5px #b2f1c922",
  border: "2.5px solid #bdf3b144",
  outline: "2px solid #b2f1c966",
  outlineOffset: "0.5px",
  zIndex: 2,
  position: "relative"
};

const cardBaseStyle = {
  background: "linear-gradient(118deg,#fafdff 75%,#e6fbe0 150%)",
  border: "2.2px solid #c9eda588",
  borderRadius: 19,
  padding: "27px 22px 24px 23px",
  marginBottom: 0,
  minWidth: 245,
  maxWidth: 420,
  boxShadow: "0 5px 32px 0 rgba(67,175,80,0.10), 0 2px 17px #c9eda544",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  position: "relative",
  flex: "1 1 265px",
  overflow: "visible",
  zIndex: 2
};

const cardHeaderStyle = {
  fontSize: "1.21rem",
  fontWeight: 700,
  color: "var(--primary-green)",
  marginBottom: 3,
  letterSpacing: "0.01em",
  marginTop: 0,
  textShadow: "0 1.5px #bdf3b1aa"
};

export default EcoTips;

/* Add advanced keyframes (for icon animation and lively effects) */
const advancedEffectStyle = `
@keyframes eco-bounce {
  0% { transform: scale(1) translateY(0px);}
  44%{ transform: scale(1.06,0.92);}
  60%{ transform: scale(1.09,0.92) translateY(-4px);}
  85% { transform: scale(0.98,1.05) translateY(1.5px);}
  100% { transform: scale(1) translateY(0);}
}
@keyframes eco-flip {
  0% { transform: skewY(0deg);}
  33% { transform: skewY(-7deg);}
  60% { transform: skewY(8deg);}
  100% { transform: skewY(0);}
}
@keyframes eco-alert-pulse {
  0% { filter: drop-shadow(0 0 3.5px #ffd96677) brightness(1);}
  40% { filter: drop-shadow(0 0 23px #ffc10780) brightness(1.23);}
  100% { filter: drop-shadow(0 0 7px #ffde5062) brightness(1);}
}
/* .eco-animated-leaf-svg, .eco-animated-alert-icon uses bounce/pulse animations */
`;
if (typeof document !== "undefined" && !document.getElementById("eco-adv-effect-style")) {
  const style = document.createElement("style");
  style.id = "eco-adv-effect-style";
  style.innerHTML = advancedEffectStyle;
  document.head.appendChild(style);
}
