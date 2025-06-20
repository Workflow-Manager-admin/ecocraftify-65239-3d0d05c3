import React, { useState } from "react";
import "../App.css";
import { getSuggestedProjects } from "../utils/suggestionEngine";

/**
 * ProjectSuggestions Component
 * Displays a list of eco-friendly DIY project ideas based on provided waste items via a suggestion engine.
 * 
 * Props:
 *   wasteItems: Array of strings (waste material names)
 *   onFavorite: function(project) (optional) - called to favorite a project.
 */
// PUBLIC_INTERFACE
function ProjectSuggestions({ wasteItems = [], onFavorite }) {
  // Retrieve suggested projects from the suggestion engine (rule/keyword based)
  const suggestedProjects = getSuggestedProjects(wasteItems);

  // State for BoredAPI suggestion
  const [apiIdea, setApiIdea] = useState(null);
  const [apiIdeaLoading, setApiIdeaLoading] = useState(false);
  const [apiIdeaError, setApiIdeaError] = useState(null);

  // PUBLIC_INTERFACE
  /**
   * Fetches a random DIY or eco-friendly activity from BoredAPI
   */
  const fetchBoredApiIdea = async () => {
    setApiIdea(null);
    setApiIdeaError(null);
    setApiIdeaLoading(true);

    try {
      // Prefer type 'diy', but fallback to eco-friendly if available in future
      const url = "https://www.boredapi.com/api/activity?type=diy";
      const res = await fetch(url);
      if (!res.ok) throw new Error(`API request failed with ${res.status}`);
      const activity = await res.json();
      setApiIdea(activity.activity || "Found a fun DIY tip!");
    } catch (err) {
      setApiIdeaError("Could not fetch a suggestion right now. Please try again.");
    } finally {
      setApiIdeaLoading(false);
    }
  };

  return (
    <div className="project-suggestions-list" style={listStyle}>
      {/* "Try This Idea" Button and API display */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
        <button
          type="button"
          className="btn"
          style={{
            background: "var(--primary-green)",
            color: "#fff",
            fontWeight: 600,
            fontSize: "1.01rem",
            letterSpacing: "0.01em",
            border: "none",
            borderRadius: 8,
            padding: "10px 22px",
            cursor: "pointer",
            boxShadow: "0 2px 8px 0 rgba(67, 175, 80, 0.09)",
            minWidth: 140,
          }}
          onClick={fetchBoredApiIdea}
          aria-label="Try a random upcycling/DIY idea"
          disabled={apiIdeaLoading}
        >
          {apiIdeaLoading ? "Fetching..." : "🌟 Try This Idea"}
        </button>
        {apiIdeaError && (
          <span style={{ color: "#D32F2F", fontWeight: 500, fontSize: "0.98em" }}>{apiIdeaError}</span>
        )}
      </div>
      {apiIdea && (
        <div
          style={{
            background: "#fafdff",
            borderLeft: "4px solid var(--accent-yellow)",
            borderRadius: "8px",
            padding: "13px 18px 9px 18px",
            marginBottom: 8,
            color: "var(--primary-green)",
            fontWeight: 600,
            fontSize: "1.06rem",
            boxShadow: "0 1px 7px 0 rgba(80,160,90,0.07)"
          }}
        >
          <span role="img" aria-label="sparkle" style={{ marginRight: 7 }}>💡</span>
          {apiIdea}
        </div>
      )}
      {suggestedProjects.map((proj, projIdx) => (
        <div key={proj.title + projIdx} className="project-card-ecocraftify" style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 3 }}>
            {/* PUBLIC_INTERFACE: Dicebear avatar using project title */}
            <img
              src={`https://avatars.dicebear.com/api/bottts/${encodeURIComponent(proj.title)}.svg`}
              alt="Project avatar"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "#f5ffef",
                flexShrink: 0,
                border: "2px solid var(--primary-green)",
                marginRight: 4,
                objectFit: "cover",
              }}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <h3 style={{ ...projectTitleStyle, marginBottom: 0 }}>{proj.title}</h3>
          </div>
          <div style={materialListStyle}>
            <span style={materialsLabelStyle}>Materials:</span>
            {/* Show related waste/materials */}
            {Array.isArray(proj.relatedWasteItems)
              ? proj.relatedWasteItems.map((m, idx) => (
                  <span key={idx} style={materialChipStyle}>{m}</span>
                ))
              : null}
          </div>
          <p style={descStyle}>{proj.description}</p>
          {/* Favorite button */}
          {onFavorite && (
            <button
              className="btn"
              style={{
                background: "var(--accent-yellow)",
                color: "#514200",
                marginTop: "7px",
                fontSize: "0.94em",
                fontWeight: 700,
              }}
              onClick={() => onFavorite(proj)}
              aria-label={`Favorite ${proj.title}`}
              type="button"
            >
              ★ Favorite
            </button>
          )}
        </div>
      ))}
      {suggestedProjects.length === 0 && (
        <div style={noSuggestionsStyle}>
          <em>No project ideas to suggest yet. Add some waste items!</em>
        </div>
      )}
    </div>
  );
}

// --- Basic, modern styling ---
const listStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  marginTop: 8,
};

const cardStyle = {
  border: "1px solid var(--border-color)",
  borderRadius: 12,
  background: "rgba(255,255,255,0.04)",
  boxShadow: "0 1px 4px 0 rgba(32,80,60,0.04)",
  padding: "18px 18px 13px 18px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

const projectTitleStyle = {
  fontSize: "1.08rem",
  color: "var(--primary-green)",
  fontWeight: 600,
  margin: "0 0 8px 0",
  letterSpacing: "0.01em",
};

const materialListStyle = {
  display: "flex",
  gap: "6px",
  marginBottom: 6,
  flexWrap: "wrap",
  alignItems: "center",
  fontSize: "0.97rem",
};

const materialsLabelStyle = {
  fontWeight: 500,
  color: "var(--secondary-green)",
  fontSize: "0.97em",
};

const materialChipStyle = {
  background: "var(--secondary-green)",
  color: "#fff",
  borderRadius: "14px",
  padding: "2px 10px",
  fontSize: "0.95em",
  marginLeft: "4px",
  display: "inline-block",
};

const descStyle = {
  marginTop: 6,
  color: "var(--text-secondary)",
  fontSize: "0.98rem",
  lineHeight: 1.45,
};

const noSuggestionsStyle = {
  marginTop: 20,
  textAlign: "center",
  color: "#aaa",
  opacity: 0.72,
};

export default ProjectSuggestions;
