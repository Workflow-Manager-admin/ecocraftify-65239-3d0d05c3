import React from "react";

/**
 * MyCreations
 * Displays a list of the user's stored crafts/composting ideas.
 * Each item shows a thumbnail, the idea text, and an area for further actions.
 * - Shows a Dicebear avatar or placeholder for each idea.
 * - The list is provided via `creations` prop, or loads from localStorage as a fallback.
 * - Future: integrate with backend/user data.
 */

// PUBLIC_INTERFACE
function MyCreations({ creations: propCreations }) {
  // Load creations from prop or localStorage fallback.
  // Each "creation" should be an object: {id, ideaText, imageUrl (optional), createdAt, ...rest}
  const [creations, setCreations] = React.useState(() => {
    if (Array.isArray(propCreations)) return propCreations;
    // Fallback: try from localStorage (simple demo)
    try {
      const stored = window.localStorage.getItem("myCreations");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  React.useEffect(() => {
    if (Array.isArray(propCreations)) {
      setCreations(propCreations);
    }
  }, [propCreations]);

  // Helper to generate a deterministic Dicebear avatar for each creation (hash on text or id)
  function getIdeaAvatarUrl(idea, idx) {
    // Use Dicebear "bottts" style with the idea's text or id for uniqueness
    const seed = encodeURIComponent((idea.ideaText || "") + "_" + (idea.id ?? idx));
    // Public Dicebear style (bottts): SVG avatar
    return `https://avatars.dicebear.com/api/bottts-neutral/${seed}.svg`;
  }

  // Placeholder if no creations
  if (!Array.isArray(creations) || creations.length === 0) {
    return (
      <div style={emptyContainerStyle}>
        <div style={{ fontSize: "2.6rem", opacity: 0.17, marginBottom: 12 }}>🧑‍🎨</div>
        <div style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginBottom: 5 }}>
          No creations stored yet.
        </div>
        <div style={{ color: "var(--text-secondary)", fontSize: "0.98rem", opacity: 0.8 }}>
          Ideas you create or save (crafts, composting tips) will appear here.
        </div>
      </div>
    );
  }

  return (
    <section style={containerStyle}>
      <h2 style={titleStyle}>My Creations</h2>
      <ul style={listStyle}>
        {creations.map((idea, idx) => (
          <li key={idea.id || idx} style={itemStyle}>
            <div style={thumbBoxStyle}>
              {/* Show stored image or deterministic avatar */}
              {idea.imageUrl ? (
                <img
                  src={idea.imageUrl}
                  alt="Idea visual"
                  style={thumbnailStyle}
                  loading="lazy"
                />
              ) : (
                <img
                  src={getIdeaAvatarUrl(idea, idx)}
                  alt="Idea avatar"
                  style={thumbnailStyle}
                  loading="lazy"
                />
              )}
            </div>
            <div style={ideaContentStyle}>
              <div style={ideaTextStyle}>
                {idea.ideaText || <span style={{ color: "#BDBDBD" }}>[Untitled Idea]</span>}
              </div>
              {idea.createdAt && (
                <div style={dateStyle}>
                  Saved:{" "}
                  {new Date(idea.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              )}
              {/* Options area: for edit, delete, share, etc (stub for future) */}
              <div style={optionsStyle}>
                <button style={actionBtnStyle} title="Edit (coming soon)" disabled>
                  ✏️ Edit
                </button>
                <button style={actionBtnStyle} title="Delete (coming soon)" disabled>
                  🗑️ Delete
                </button>
                <button style={actionBtnStyle} title="Share (coming soon)" disabled>
                  📤 Share
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

// --- Minimal styles for modern card layout, fits green/ecocraftify theme ---

const containerStyle = {
  background: "#fafdff",
  border: "1.5px solid var(--border-color)",
  borderRadius: 12,
  boxShadow: "0 2px 14px 0 rgba(67, 175, 80, 0.04)",
  padding: "30px 18px 20px 18px",
  maxWidth: 620,
  margin: "28px auto 0 auto",
};

const titleStyle = {
  color: "var(--primary-green)",
  fontWeight: 600,
  fontSize: "1.23rem",
  margin: "0 0 18px 0",
  letterSpacing: "0.015em",
};

const listStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "22px",
};

const itemStyle = {
  display: "flex",
  alignItems: "flex-start",
  gap: "22px",
  padding: "17px 0",
  borderBottom: "1px solid var(--border-color)",
};

const thumbBoxStyle = {
  width: 64,
  height: 64,
  minWidth: 64,
  minHeight: 64,
  borderRadius: 12,
  overflow: "hidden",
  background: "#e8fbe2",
  border: "1.3px solid var(--secondary-green)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: 0,
  boxShadow: "0 1px 8px 0 rgba(70,200,120,0.07)",
};

const thumbnailStyle = {
  width: 54,
  height: 54,
  borderRadius: "50%",
  objectFit: "cover",
  display: "block",
  background: "#fff",
};

const ideaContentStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "7px",
};

const ideaTextStyle = {
  fontWeight: 500,
  color: "var(--primary-green)",
  fontSize: "1.09rem",
  marginBottom: 3,
};

const dateStyle = {
  color: "var(--text-secondary)",
  fontSize: "0.96em",
  marginBottom: 3,
};

const optionsStyle = {
  display: "flex",
  gap: "11px",
  marginTop: 5,
};

const actionBtnStyle = {
  background: "rgba(76,175,80,0.07)",
  color: "var(--secondary-green)",
  border: "1px solid var(--border-color)",
  borderRadius: 7,
  fontSize: "0.98em",
  padding: "3.2px 13px",
  cursor: "not-allowed",
  opacity: 0.7,
  transition: "background 0.15s",
};

const emptyContainerStyle = {
  background: "#fafdff",
  border: "1.5px solid var(--border-color)",
  borderRadius: 12,
  padding: "38px 16px 32px 16px",
  textAlign: "center",
  margin: "38px auto",
  maxWidth: 450,
  color: "var(--text-secondary)",
  fontSize: "1.1rem",
  boxShadow: "0 2px 12px 0 rgba(67,175,80,0.06)",
};

export default MyCreations;
