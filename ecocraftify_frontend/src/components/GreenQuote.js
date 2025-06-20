import React, { useEffect, useState } from "react";

/**
 * GreenQuote: Fetches and displays the "Green Quote of the Day"
 * using the ZenQuotes API, with eco-themed styling.
 * Displays the quote and author, with a focus on positivity and sustainability.
 */
// PUBLIC_INTERFACE
function GreenQuote() {
  const [quote, setQuote] = useState(null);
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function fetchQuote() {
      setLoading(true);
      setErr("");
      try {
        const res = await fetch("https://zenquotes.io/api/random");
        if (!res.ok) throw new Error(`API request failed (${res.status})`);
        const data = await res.json();
        if (!cancelled && Array.isArray(data) && data[0]?.q && data[0]?.a) {
          setQuote(data[0].q);
          setAuthor(data[0].a);
        } else if (!cancelled) {
          setErr("Could not load quote. Try again.");
        }
      } catch (e) {
        if (!cancelled) setErr("Could not load quote. Please refresh.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchQuote();
    return () => { cancelled = true; }
  }, []);

  return (
    <div style={{
      background: "#e8fbe2",
      borderLeft: "6px solid var(--primary-green)",
      borderRadius: 10,
      padding: "23px 30px 19px 30px",
      color: "var(--primary-green)",
      margin: "0 auto 20px auto",
      maxWidth: 620,
      fontFamily: "Georgia,serif",
      boxShadow: "0 1px 14px 0 rgba(67, 175, 80, 0.08)"
    }}>
      <div style={{
        fontWeight: 700,
        fontSize: "1.11em",
        color: "var(--secondary-green)",
        marginBottom: 7,
        letterSpacing: "0.01em"
      }}>
        🌱 Green Quote of the Day
      </div>
      {loading && (
        <div style={{ color: "#689566", fontStyle: "italic" }}>Loading inspiring quote...</div>
      )}
      {!loading && err && (
        <div style={{ color: "brown", fontWeight: 500 }}>{err}</div>
      )}
      {!loading && quote && (
        <>
          <blockquote style={{
            margin: 0,
            fontSize: "1.24em",
            fontWeight: 600,
            color: "var(--primary-green)",
            position: "relative",
            lineHeight: 1.37
          }}>
            <span style={{ fontSize: "1.34em", marginRight: 8, opacity: 0.8, verticalAlign: "top" }}>&ldquo;</span>
            {quote}
            <span style={{ fontSize: "0.93em", marginLeft: 7, color: "var(--secondary-green)" }}>&rdquo;</span>
          </blockquote>
          <div style={{ marginTop: 8, fontWeight: 500, color: "#649861", fontSize: "1em" }}>– {author}</div>
        </>
      )}
    </div>
  );
}

export default GreenQuote;
