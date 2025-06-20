import React from "react";
import "../App.css";

/**
 * ProjectSuggestions Component
 * Displays a list of eco-friendly DIY project ideas based on provided waste items.
 * For now, shows stub project cards and accepts props for future integration.
 * 
 * Props:
 *   wasteItems: Array of strings (waste material names), OPTIONAL.
 *     Will later be used for dynamic suggestions.
 */
/**
 * ProjectSuggestions Component
 * Displays a list of eco-friendly DIY project ideas based on provided waste items.
 * Reacts to `wasteItems` prop for suggestions.
 * 
 * Props:
 *   wasteItems: Array of strings (waste material names)
 *   onFavorite: function(project) (optional) - called to favorite a project.
 */
// PUBLIC_INTERFACE
function ProjectSuggestions({ wasteItems = [], onFavorite }) {
  // Simulated/fake suggested projects for demonstration
  const stubProjects = [
    {
      id: 1,
      title: "Bottle Cap Mosaic Art",
      materials: ["Bottle Caps", "Cardboard", "Glue"],
      description:
        "Upcycle colorful plastic bottle caps into stunning mosaic wall art. Easy, vibrant, and totally unique!",
    },
    {
      id: 2,
      title: "Tin Can Lanterns",
      materials: ["Tin Cans", "Nails", "Candles"],
      description:
        "Turn empty tin cans into lovely outdoor lanterns. Punch decorative holes and illuminate your garden with upcycled charm.",
    },
    {
      id: 3,
      title: "Fabric Scrap Coasters",
      materials: ["Fabric Scraps", "Thread", "Needle"],
      description:
        "Repurpose leftover fabric into trendy, washable coasters. Personalize with your favorite patterns!",
    },
  ];

  // Optionally filter/favor projects based on wasteItems for user interactivity
  const filteredProjects =
    Array.isArray(wasteItems) && wasteItems.length
      ? stubProjects.filter((p) =>
          p.materials.some((m) =>
            wasteItems.some(
              (wi) => wi.toLowerCase().includes(m.toLowerCase()) || m.toLowerCase().includes(wi.toLowerCase())
            )
          )
        )
      : stubProjects;

  return (
    <div className="project-suggestions-list" style={listStyle}>
      {filteredProjects.map((proj) => (
        <div key={proj.id} className="project-card-ecocraftify" style={cardStyle}>
          <h3 style={projectTitleStyle}>{proj.title}</h3>
          <div style={materialListStyle}>
            <span style={materialsLabelStyle}>Materials:</span>
            {proj.materials.map((m, idx) => (
              <span key={idx} style={materialChipStyle}>{m}</span>
            ))}
          </div>
          <p style={descStyle}>{proj.description}</p>
          {/* Example: In the future, clicking heart will favorite */}
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
      {filteredProjects.length === 0 && (
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
