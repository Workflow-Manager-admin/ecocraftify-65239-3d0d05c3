import React from "react";
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

  return (
    <div className="project-suggestions-list" style={listStyle}>
      {suggestedProjects.map((proj, projIdx) => (
        <div key={proj.title + projIdx} className="project-card-ecocraftify" style={cardStyle}>
          <h3 style={projectTitleStyle}>{proj.title}</h3>
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
