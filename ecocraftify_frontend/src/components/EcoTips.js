import React, { useEffect, useState } from "react";

/**
 * EcoTips: Dramatically enhanced, highly visual, interactive, and card-based
 * eco living guide—delivers tips, facts, myths, and articles with rich theming,
 * eco icons/illustrations, hover/animated highlights, and responsive design.
 * Branded to Trash2Treasure/EcoCraftify for deep engagement.
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
    <div className="ecotips-root-ecocraftify" style={rootStyle}>
      <h1 style={headerStyle}>
        <span
          style={{
            verticalAlign: "sub",
            marginRight: 7,
            fontSize: "2.05rem",
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
          gap: "32px 20px",
          justifyContent: "space-between",
          marginTop: 12,
        }}
      >
        {/* --------- Card 1: Green Tip of the Day --------- */}
        <TipCard
          iconBg="#e8fbe2"
          highlight
          icon={todaysTip.icon}
          title="Green Tip of the Day"
          description={todaysTip.tip}
          tipsList={GREEN_TIPS}
        />

        {/* --------- Card 2: Eco Articles --------- */}
        <ArticleCard
          iconBg="#eafced"
          icon={<BookIcon />}
          title="Eco Articles & Guides"
          loading={loadingArticles}
          articles={articles}
        />

        {/* --------- Card 3: Fun Eco Facts --------- */}
        <FactCard
          iconBg="#fffbe8"
          icon={<LeafIcon />}
          title="Surprising Eco-Facts"
          facts={ECO_FUN_FACTS}
        />

        {/* --------- Card 4: Eco Myths Busted --------- */}
        <MythCard
          iconBg="#fbeedb"
          icon={<AlertIcon />}
          title="Eco Myths – Busted"
          myths={ECO_MYTHS}
        />
      </div>
      <style>
        {`
        .ecotips-tipcard-ecocraftify:hover {
          box-shadow: 0 4px 20px 0 rgba(76, 175, 80, 0.20);
          transform: translateY(-4px) scale(1.037);
          border-color: var(--primary-green);
          background: #e5f6df;
        }
        .ecotips-tipcard-ecocraftify {
          transition: box-shadow 0.23s, transform 0.18s, border-color 0.24s;
        }
        .ecotips-tip-flash {
          animation: tip-flash-bounce 1.25s cubic-bezier(.87,0,.63,1.09) 2;
          background: linear-gradient(90deg,#e6ffcb 60%,#eafced 100%);
        }
        @keyframes tip-flash-bounce {
          0% { box-shadow: 0 0 0px #B2F1C9;}
          20% { box-shadow: 0 0 14px #C9EDA5;}
          35% { box-shadow: 0 0 0px #B2F1C9;}
          48% { box-shadow: 0 0 12px #8BC34A;}
          70% { box-shadow: 0 0 0px #B2F1C9;}
          100%{ box-shadow: 0 0 0px #B2F1C9;}
        }
        .ecotips-article-box-ecocraftify:hover {
          background: #d6fbe2;
          box-shadow: 0 2.5px 18px 0 rgba(67,175,80,0.14);
          transform: scale(1.023);
        }
        .ecotips-article-box-ecocraftify {
          transition: box-shadow 0.18s, background 0.21s, transform 0.18s;
        }
        .ecotips-fact-pop:hover {
          background: #f8ffe3 !important;
          color: var(--accent-yellow) !important;
        }
        .ecotips-fact-pop {
          transition: color 0.16s, background 0.18s;
        }
        .ecotips-myth-row-eco:hover {
          background: #e6f3df;
          transform: translateX(3px) scale(1.019);
        }
        .ecotips-myth-row-eco {
          transition: transform 0.18s, background 0.17s;
        }
        .ecotips-icon-circle {
          box-shadow: 0 1px 6px 0 rgba(32,100,50,0.09);
        }
        @media (max-width: 830px) {
          .ecotips-card-columns {
            flex-direction: column;
            gap: 22px !important;
          }
        }
      `}
      </style>
    </div>
  );
}

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

// ---- Icon/Illustration Components ----
function LeafIcon(props) {
  return (
    <span role="img" aria-label="leaf" {...props} style={{ color: "#4CAF50", ...props?.style }}>
      🌱
    </span>
  );
}
function BookIcon(props) {
  return (
    <span role="img" aria-label="book" {...props} style={{ color: "#ba8f17", ...props?.style }}>
      📖
    </span>
  );
}
function AlertIcon(props) {
  return (
    <span role="img" aria-label="alert" {...props} style={{ color: "#FFA726", ...props?.style }}>
      ⚠️
    </span>
  );
}
function ReusableIcon(props) {
  // Water bottle/cup
  return (
    <span role="img" aria-label="reusable" {...props} style={{ fontSize: "1.22em", color: "#8BC34A", ...props?.style }}>
      🥤
    </span>
  );
}
function PlugIcon(props) {
  return (
    <span role="img" aria-label="plug" {...props} style={{ fontSize: "1.10em", color: "#FFD966", ...props?.style }}>
      🔌
    </span>
  );
}
function BagIcon(props) {
  return (
    <span role="img" aria-label="bag" {...props} style={{ fontSize: "1.1em", color: "#FFC107", ...props?.style }}>
      🛍️
    </span>
  );
}
function CompostIcon(props) {
  return (
    <span role="img" aria-label="compost" {...props} style={{ fontSize: "1.17em", color: "#4CAF50", ...props?.style }}>
      🌾
    </span>
  );
}
function JarIcon(props) {
  return (
    <span role="img" aria-label="jar" {...props} style={{ fontSize: "1.15em", color: "#b2f1c9", ...props?.style }}>
      🫙
    </span>
  );
}

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
  width: 49,
  height: 49,
  minWidth: 49,
  minHeight: 49,
  background: "#eafced",
  borderRadius: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2rem",
  boxShadow: "0 1px 6px 0 rgba(32,100,50,0.08)",
};
const cardBaseStyle = {
  background: "#fafdff",
  border: "1.7px solid var(--border-color)",
  borderRadius: 16,
  padding: "24px 20px 23px 22px",
  marginBottom: 0,
  minWidth: 245,
  boxShadow: "0 2px 14px 0 rgba(67,175,80,0.06)",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  position: "relative",
  flex: "1 1 257px",
  overflow: "visible",
};
const cardHeaderStyle = {
  fontSize: "1.17rem",
  fontWeight: 700,
  color: "var(--primary-green)",
  marginBottom: 3,
  letterSpacing: "0.01em",
  marginTop: 0,
};

export default EcoTips;
