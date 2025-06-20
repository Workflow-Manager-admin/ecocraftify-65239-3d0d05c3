import React, { useState, useEffect } from "react";

/**
 * UserProfile Component
 *
 * Editable user profile form. Allows update and persistence of user details (name, email, avatar, etc.).
 * Uses localStorage for persistence. Also displays favorite projects/history as stubs.
 */

// PUBLIC_INTERFACE
function UserProfile() {
  // Fields to be edited
  const defaultProfile = {
    name: "TreasureMaker",
    email: "",
    avatarUrl: "",
    joinDate: new Date().toISOString().substring(0, 10),
    favorites: [],
    history: [],
  };

  // Initialization (read from localStorage)
  const [profile, setProfile] = useState(() => {
    const saved = window.localStorage.getItem("trash2treasureUser");
    try {
      return saved ? { ...defaultProfile, ...JSON.parse(saved) } : defaultProfile;
    } catch {
      return { ...defaultProfile };
    }
  });

  // Editable field state (local-only until "Save" is clicked)
  const [editFields, setEditFields] = useState(() => ({
    name: profile.name || "",
    email: profile.email || "",
    avatarUrl: profile.avatarUrl || "",
  }));
  // Feedback message after save
  const [status, setStatus] = useState("");

  // Keep editFields in sync if profile changes from localStorage/etc.
  useEffect(() => {
    setEditFields({
      name: profile.name || "",
      email: profile.email || "",
      avatarUrl: profile.avatarUrl || "",
    });
  }, [profile]);

  // Save handler: persist to localStorage and state, show OK msg
  // PUBLIC_INTERFACE
  function handleSave(e) {
    e.preventDefault();
    const updatedProfile = {
      ...profile,
      name: editFields.name.trim() || defaultProfile.name,
      email: editFields.email.trim(),
      avatarUrl: editFields.avatarUrl.trim(),
    };
    setProfile(updatedProfile);
    window.localStorage.setItem("trash2treasureUser", JSON.stringify(updatedProfile));
    setStatus("Profile saved!");
    setTimeout(() => setStatus(""), 1700);
  }

  // Input change
  function handleChange(e) {
    const { name, value } = e.target;
    setEditFields(fields => ({ ...fields, [name]: value }));
  }

  // Live avatar preview (use avatarUrl if present, else generate by name)
  const avatarUrl =
    editFields.avatarUrl && editFields.avatarUrl.length > 6
      ? editFields.avatarUrl
      : `https://avatars.dicebear.com/api/bottts-neutral/${encodeURIComponent(
          editFields.name || "TreasureMaker"
        )}.svg`;

  // Favorites / History (use arrays from profile; fall back to empty)
  const favorites = profile.favorites || [];
  const history = profile.history || [];
  
  return (
    <form
      style={profileOuterStyle}
      autoComplete="off"
      onSubmit={handleSave}
    >
      {/* User avatar and editable fields */}
      <div style={headerStyle}>
        <div style={avatarStubStyle}>
          <img
            src={avatarUrl}
            alt="User avatar"
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "#f5ffef",
              display: "block",
              objectFit: "cover",
            }}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <label
            htmlFor="profile-name"
            style={{
              ...displayNameStyle,
              display: "block",
              paddingBottom: 2,
            }}
          >
            Name:
          </label>
          <input
            type="text"
            id="profile-name"
            name="name"
            value={editFields.name}
            minLength={2}
            maxLength={26}
            onChange={handleChange}
            style={{
              fontSize: "1.05em",
              fontWeight: 500,
              border: "1px solid var(--border-color)",
              borderRadius: 6,
              padding: "5px 10px",
              marginBottom: 2,
              color: "var(--primary-green)",
              width: "98%",
              maxWidth: 240,
            }}
            required
            placeholder="Your Name"
            autoComplete="off"
          />
          <div style={secondaryTextStyle}>
            Joined: {profile.joinDate}
          </div>
        </div>
      </div>
      {/* Email field */}
      <div style={{ marginBottom: 12, marginLeft: 59, maxWidth: 260}}>
        <label htmlFor="profile-email" style={{ display: "block", color: "var(--text-secondary)", fontWeight: 500, fontSize: "1em", paddingBottom: 3 }}>
          Email:
        </label>
        <input
          id="profile-email"
          name="email"
          type="email"
          value={editFields.email}
          onChange={handleChange}
          style={{
            fontSize: "0.97em",
            border: "1px solid var(--border-color)",
            borderRadius: 6,
            padding: "6px 10px",
            marginBottom: 2,
            width: "99%",
            maxWidth: 240,
          }}
          placeholder="user@email.com"
          autoComplete="off"
        />
      </div>
      {/* AvatarUrl field (optional) */}
      <div style={{ marginBottom: 12, marginLeft: 59, maxWidth: 260}}>
        <label htmlFor="profile-avatarUrl" style={{ display: "block", color: "var(--text-secondary)", fontWeight: 500, fontSize: "1em", paddingBottom: 3 }}>
          Avatar Image URL:
        </label>
        <input
          id="profile-avatarUrl"
          name="avatarUrl"
          type="url"
          value={editFields.avatarUrl}
          onChange={handleChange}
          style={{
            fontSize: "0.97em",
            border: "1px solid var(--border-color)",
            borderRadius: 6,
            padding: "6px 10px",
            marginBottom: 2,
            width: "99%",
            maxWidth: 300,
          }}
          placeholder="Paste image URL or leave blank"
          autoComplete="off"
        />
      </div>
      <button
        type="submit"
        className="btn btn-large"
        style={{
          marginLeft: 59,
          background: "var(--primary-green)",
          color: "#fff",
          fontWeight: 600,
          fontSize: "1.08em",
          padding: "8px 26px",
          border: "none",
          borderRadius: 8,
          marginTop: 3,
          marginBottom: 8,
          alignSelf: "flex-start"
        }}
      >
        Save
      </button>
      {status && (
        <span
          style={{
            color: "var(--primary-green)",
            marginLeft: 12,
            fontWeight: 600,
          }}
        >
          {status}
        </span>
      )}
      {/* Divider */}
      <div style={dividerStyle} />
      {/* Favorites Section */}
      <div>
        <div style={sectionTitleStyle}>Favorite Projects</div>
        <ul style={listStyle}>
          {favorites.length > 0 ? (
            favorites.map((fav, idx) => (
              <li key={fav.id || fav.name || idx} style={itemStyle}>
                {fav.name || fav.title || "[Unnamed]"}
              </li>
            ))
          ) : (
            <li style={fadedStyle}>
              <em>No favorites yet. Save a project to see it here.</em>
            </li>
          )}
        </ul>
      </div>
      {/* Divider */}
      <div style={dividerStyle}></div>
      {/* Project History Section */}
      <div>
        <div style={sectionTitleStyle}>Project History</div>
        <ul style={listStyle}>
          {history.length > 0 ? (
            history.map((h, idx) => (
              <li key={h.id || idx} style={itemStyle}>
                {(h.project || h.title || "[Unnamed]")}{" "}
                {h.date && (
                  <span style={historyDateStyle}>({h.date})</span>
                )}
              </li>
            ))
          ) : (
            <li style={fadedStyle}>
              <em>No project history yet.</em>
            </li>
          )}
        </ul>
      </div>
    </form>
  );
}

// --- Inline Styles (modern, accessible, matches brand) ---
const profileOuterStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.025)",
  border: "1px solid var(--border-color)",
  borderRadius: "12px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.035)",
  padding: "22px 16px 18px 16px",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  minHeight: "280px",
  fontSize: "1rem",
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  marginBottom: 8,
};

const avatarStubStyle = {
  width: 44,
  height: 44,
  background: "var(--primary-green)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2rem",
  color: "white",
  marginRight: 2,
};

const avatarIconStyle = {
  fontSize: "2rem",
};

const displayNameStyle = {
  fontWeight: 600,
  fontSize: "1.1rem",
  letterSpacing: "0.03em",
  color: "var(--primary-green)",
};

const secondaryTextStyle = {
  color: "var(--text-secondary)",
  fontSize: "0.96rem",
};

const sectionTitleStyle = {
  margin: "10px 0 2px 0",
  color: "var(--secondary-green)",
  fontWeight: 500,
  fontSize: "1.08rem",
  letterSpacing: "0.01em",
};

const dividerStyle = {
  height: 1,
  background: "var(--border-color)",
  margin: "13px 0 10px 0",
  border: 0,
};

const listStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  fontSize: "0.98rem",
  display: "flex",
  flexDirection: "column",
  gap: 6,
};

const itemStyle = {
  background: "rgba(60,255,180,0.07)",
  borderRadius: 5,
  padding: "5px 10px",
  color: "var(--text-color)",
};

const fadedStyle = {
  color: "var(--text-secondary)",
  fontStyle: "italic",
  opacity: 0.78,
  padding: "5px 0",
};

const historyDateStyle = {
  color: "var(--accent-yellow)",
  fontSize: "0.97em",
  marginLeft: 7,
};

export default UserProfile;
