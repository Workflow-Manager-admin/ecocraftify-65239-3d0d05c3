import React, { useEffect, useState } from "react";

/**
 * EcoTips: Card-based, visually green-themed section for eco-friendly tips,
 * Wikipedia articles highlights, fun facts & myths. Integrates live data fetch (Wikipedia API),
 * but ensures good fallback content in case of API failures.
 * Used as a main feature page in EcoCraftify.
 */
// PUBLIC_INTERFACE
function EcoTips() {
  // State for articles from Wikipedia (composting, recycling, etc), fallback if fetch fails
  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  // Wikipedia article titles (can be expanded/scoped further)
  const WIKI_TOPICS = [
    { key: "Composting", label: "Composting" },
    { key: "Recycling", label: "Recycling" },
    { key: "Reduce,_reuse,_recycle", label: "Reduce, Reuse, Recycle" },
  ];
  // Fallback "articles" used if Wikipedia fetch fails
  const FALLBACK_ARTICLES = [
    {
      title: "Composting",
      summary: "Composting is a natural process of recycling organic material such as food scraps and yard waste into a valuable fertilizer that can enrich soil and plants.",
      link: "https://en.wikipedia.org/wiki/Composting"
    },
    {
      title: "Recycling",
      summary: "Recycling is the process of collecting and processing materials that would otherwise be thrown away as trash and turning them into new products.",
      link: "https://en.wikipedia.org/wiki/Recycling"
    },
    {
      title: "Reduce, Reuse, Recycle",
      summary: "The three R's—Reduce, Reuse, Recycle—help cut down on the amount of waste we throw away. They conserve natural resources, landfill space, and energy.",
      link: "https://en.wikipedia.org/wiki/Reduce,_reuse,_recycle"
    }
  ];

  // Fun facts and eco myths, curated for educational/entertainment value
  const ECO_FUN_FACTS = [
    "Recycling one aluminum can saves enough energy to run a TV for three hours!",
    "More than 60% of the rubbish in the trash can could be recycled.",
    "Composting at home can reduce household waste by up to 30%.",
    "It takes up to 500 years for some plastics to decompose in landfills.",
    "Glass can be recycled endlessly without loss in quality or purity."
  ];
  const ECO_MYTHS = [
    { myth: "All plastics can be recycled.", fact: "Not all plastics are recyclable—check numbers and local facilities." },
    { myth: "Composting always smells bad.", fact: "A well-maintained compost pile smells earthy, not foul!" },
    { myth: "Recycling uses more energy than it saves.", fact: "Recycling conserves energy and resources overall compared to making things new." },
    { myth: "Paper bags are always greener than plastic.", fact: "Reusing bags—of any material—is always best for the environment." }
  ];
  const GREEN_TIPS = [
    "Switch to reusable water bottles and coffee cups.",
    "Unplug chargers and appliances when not in use to save energy.",
    "Compost food scraps to enrich your garden and reduce landfill waste.",
    "Bring reusable shopping bags when you go to any store.",
    "Repurpose glass jars for storage instead of throwing them away."
  ];

  // API: Wikipedia summary fetch for multiple topics, with basic error handling
  useEffect(() => {
    let cancelled = false;
    async function fetchArticles() {
      setLoadingArticles(true);
      try {
        // Wikipedia REST summary API: GET https://en.wikipedia.org/api/rest_v1/page/summary/{title}
        const fetches = WIKI_TOPICS.map(topic =>
          fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${topic.key}`)
            .then(res => res.ok ? res.json() : null)
        );
        const results = await Promise.all(fetches);
        const articlesFetched = results
          .map((item, idx) => item && item.title && item.extract
            ? {
                title: item.title,
                summary: item.extract,
                link: item.content_urls?.desktop?.page || FALLBACK_ARTICLES[idx]?.link
              } : FALLBACK_ARTICLES[idx]
          );
        if (!cancelled) setArticles(articlesFetched);
      } catch {
        if (!cancelled) setArticles(FALLBACK_ARTICLES);
      } finally {
        if (!cancelled) setLoadingArticles(false);
      }
    }
    fetchArticles();
    return () => { cancelled = true; };
    // eslint-disable-next-line
  }, []);

  // Section/card-style container, themed using app variables, highly readable and modern
  return (
    <div className="container" style={{ marginTop: 92, marginBottom: 48, paddingBottom: 12 }}>
      <h1 style={{
        fontFamily: "Inter,Arial,sans-serif", fontWeight: 700, fontSize: "2.7rem",
        color: "var(--primary-green)", marginBottom: 16, letterSpacing: "-0.01em",
        textAlign: "left"
      }}>
        🌱 Eco Tips & Green Living Guide
      </h1>
      <div className="main-container-ecocraftify" style={{ gap: 24, flexWrap: "wrap" }}>
        {/* Section 1: Green Tip of the Day (rotates/today's tip) */}
        <section style={cardStyle}>
          <h2 style={cardTitleStyle}>Green Tip of the Day</h2>
          <div style={{ fontSize: "1.10rem", color: "var(--secondary-green)", fontWeight: 500, marginBottom: 7 }}>
            {GREEN_TIPS[new Date().getDay() % GREEN_TIPS.length]}
          </div>
          <ul style={{ fontSize: "1rem", color: "var(--text-secondary)", marginTop: 8, paddingLeft: 18, marginBottom: 0 }}>
            {GREEN_TIPS.map((tip, i) =>
              <li key={i} style={{ marginBottom: 3, fontSize: "0.98em" }}>{tip}</li>
            )}
          </ul>
        </section>

        {/* Section 2: Article Highlights (Wikipedia/fallback) */}
        <section style={cardStyle}>
          <h2 style={cardTitleStyle}>Eco Articles & Guides</h2>
          {loadingArticles && (
            <div style={{ color: "#659b44", fontStyle: "italic" }}>Loading articles...</div>
          )}
          <div>
            {articles.map((article, idx) => (
              <div key={article.title + idx} style={articleBoxStyle}>
                <div style={{ fontWeight: 600, color: "var(--primary-green)", fontSize: "1.09em" }}>
                  {article.title}
                </div>
                <div style={{ fontSize: "0.99em", color: "var(--text-secondary)", margin: "4px 0 7px" }}>
                  {article.summary}
                </div>
                <a href={article.link} target="_blank" rel="noopener noreferrer" style={{
                  color: "var(--secondary-green)", fontWeight: 500, textDecoration: "underline dotted", fontSize: "0.98em"
                }}>Read more</a>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Fun Eco Facts */}
        <section style={cardStyle}>
          <h2 style={cardTitleStyle}>Fun Eco Facts</h2>
          <ul style={{
            color: "#3ea942", margin: 0, paddingLeft: 18, fontWeight: 500, fontSize: "1.03em"
          }}>
            {ECO_FUN_FACTS.map((fact, i) =>
              <li key={"eco-fact-" + i} style={{
                marginBottom: 9, color: "var(--primary-green)", letterSpacing: "0.005em"
              }}>
                {fact}
              </li>
            )}
          </ul>
        </section>

        {/* Section 4: Eco Myths - Busted! */}
        <section style={cardStyle}>
          <h2 style={cardTitleStyle}>Eco Myths – Busted!</h2>
          <ul style={{ margin: 0, paddingLeft: 8, fontSize: "0.97em" }}>
            {ECO_MYTHS.map((m, i) => (
              <li key={"eco-myth-" + i} style={{ marginBottom: 13 }}>
                <div style={{ fontWeight: 600, color: "#ba8f17" }}>Myth:{' '}
                  <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>{m.myth}</span>
                </div>
                <div style={{
                  fontWeight: 500, color: "var(--primary-green)", marginLeft: 5
                }}>
                  ✔ {m.fact}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
      {/* Style: container respects breakpoints, cards wrap vertically on small screens */}
    </div>
  );
}

// ---- Styles ----
const cardStyle = {
  background: "#fafdff",
  border: "1.7px solid var(--border-color)",
  borderRadius: 16,
  padding: "24px 20px 20px 20px",
  marginBottom: 0,
  minWidth: 245,
  maxWidth: 350,
  flex: "1 1 260px",
  boxShadow: "0 2px 16px 0 rgba(67,175,80,0.06)",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  position: "relative",
};

const cardTitleStyle = {
  fontSize: "1.22rem",
  fontWeight: 700,
  color: "var(--primary-green)",
  marginBottom: 7,
  letterSpacing: "0.01em",
};

const articleBoxStyle = {
  background: "#e8fbe2",
  border: "1px solid var(--secondary-green)",
  borderRadius: 10,
  padding: "12px 13px 8px 13px",
  marginBottom: 13,
  boxShadow: "0 1.5px 9px 0 rgba(67,175,80,0.07)",
};
// -----------------
export default EcoTips;
