import React, { useState } from "react";

/**
 * SurpriseMe: "Surprise Me!" page/component for creative random ideas.
 * On button click, fetches a random idea from BoredAPI or a local fallback pool.
 * Display is styled for EcoCraftify's modern, green theme.
 */
// PUBLIC_INTERFACE
function SurpriseMe() {
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // Fallback local pool if BoredAPI fails, mildly eco/DIY themed
  const LOCAL_IDEA_POOL = [
    {
      activity: "Make a bird feeder using an old milk carton.",
      type: "diy"
    },
    {
      activity: "Organize an upcycle challenge at home.",
      type: "social"
    },
    {
      activity: "Create art using bottle caps collected from the kitchen.",
      type: "recreational"
    },
    {
      activity: "Turn a glass jar into a mini indoor garden.",
      type: "diy"
    },
    {
      activity: "Repurpose old t-shirts as tote bags.",
      type: "diy"
    },
    {
      activity: "Plant kitchen scraps (like green onions) to regrow food.",
      type: "education"
    },
    {
      activity: "Design your own jewelry using upcycled paper.",
      type: "creative"
    },
    {
      activity: "Paint rocks you find outside with positive eco messages.",
      type: "recreational"
    },
    {
      activity: "Write an eco tip and stick it on your fridge.",
      type: "education"
    }
  ];

  // Fetch random idea from BoredAPI, fallback to our local ideas if needed
  async function fetchSurpriseIdea() {
    setLoading(true);
    setErr("");
    setIdea(null);

    try {
      // BoredAPI gives basic & random activities
      const res = await fetch("https://www.boredapi.com/api/activity?type=diy,recreational,education,creative");
      if (res.ok) {
        const data = await res.json();
        if (data?.activity) {
          setIdea({
            activity: data.activity,
            type: data.type || "random"
          });
          setLoading(false);
          return;
        }
      }
      // If API "ok", but no good data, fallback
      throw new Error("No activity");
    } catch (e) {
      // Fallback: pick random local entry
      const pick = LOCAL_IDEA_POOL[Math.floor(Math.random() * LOCAL_IDEA_POOL.length)];
      setIdea(pick);
      setErr("Could not connect to BoredAPI. Showing a local creative idea.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      style={{
        background: "#fafdff",
        borderRadius: 15,
        padding: "38px 25px 32px 25px",
        maxWidth: 520,
        margin: "40px auto 0 auto",
        boxShadow: "0 2px 16px 0 rgba(67,175,80,0.10)",
        textAlign: "center",
        border: "1.6px solid var(--border-color)",
      }}
    >
      <h2
        style={{
          color: "var(--primary-green)",
          fontWeight: 700,
          fontSize: "2.1rem",
          letterSpacing: "-0.018em",
          marginBottom: 5,
        }}
      >
        🎁 Surprise Me!
      </h2>
      <div
        style={{
          color: "var(--secondary-green)",
          fontWeight: 500,
          fontSize: "1.08rem",
          marginBottom: 18,
        }}
      >
        Click to get a random creative DIY or green activity idea.
      </div>
      <button
        className="btn btn-large"
        type="button"
        onClick={fetchSurpriseIdea}
        disabled={loading}
        style={{
          background: "var(--primary-green)",
          fontWeight: 600,
          fontSize: "1.07rem",
          padding: "11px 34px",
          marginBottom: 23,
        }}
      >
        {loading ? "Surprising..." : "Surprise Me!"}
      </button>

      {err && (
        <div
          style={{
            color: "#b36c1a",
            background: "#fffbe7",
            borderRadius: 7,
            padding: "7px 12px",
            margin: "0 auto 12px auto",
            fontSize: "0.97em",
            maxWidth: 410,
          }}
        >
          {err}
        </div>
      )}

      {idea && (
        <div
          style={{
            marginTop: 9,
            background: "#e8fbe2",
            borderLeft: "6px solid var(--primary-green)",
            borderRadius: 12,
            padding: "23px 18px",
            boxShadow: "0 3px 13px 0 rgba(67,175,80,0.08)",
            fontSize: "1.33em",
            color: "var(--primary-green)",
            fontWeight: 600,
            lineHeight: 1.32,
            position: "relative",
            minHeight: 60,
            marginBottom: 6,
            textAlign: "center",
            maxWidth: 430,
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <span style={{ fontSize: "1.45em", verticalAlign: "top", opacity: 0.88 }}>
            ❗
          </span>{" "}
          {idea.activity}
        </div>
      )}
      <div style={{ fontSize: "0.89em", color: "var(--text-secondary)", marginTop: 13 }}>
        Powered by <a href="https://www.boredapi.com/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--secondary-green)" }}>BoredAPI</a>
        {" "}and creative upcycling ideas.
      </div>
    </section>
  );
}

export default SurpriseMe;
