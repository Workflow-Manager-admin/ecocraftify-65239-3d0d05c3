import React from "react";

/**
 * UserProfile Component
 *
 * Displays the user's profile information, favorite projects, and project history.
 * All sections are scaffolded with placeholder content, ready for future integration.
 */

// PUBLIC_INTERFACE
function UserProfile() {
  // Placeholder for user profile data (in the future use localStorage/api/local state)
  const userStub = {
    name: "EcoCrafter",
    avatarUrl: "",
    joinDate: "2024-06-01",
  };

  // Dicebear avatar URL - deterministic per user
  const dicebearAvatarUrl = `https://avatars.dicebear.com/api/bottts/${encodeURIComponent(
    userStub.name
  )}.svg`;

  // Placeholder arrays – to be fetched from localStorage/state/backend in implementation phase
  const favoritesStub = [
    // { id: 101, name: "Tin Can Lanterns" }, ...
  ];
  const historyStub = [
    // { id: 201, project: "Bottle Cap Mosaic", date: "2024-06-04" }, ...
  ];

  return (
    <div style={profileOuterStyle}>
      {/* User "avatar" and name section */}
      <div style={headerStyle}>
        <div style={avatarStubStyle}>
          {/* PUBLIC_INTERFACE: Render Dicebear SVG avatar for user */}
          <img
            src={dicebearAvatarUrl}
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
          <div style={displayNameStyle}>{userStub.name}</div>
          <div style={secondaryTextStyle}>
            Joined: {userStub.joinDate}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={dividerStyle}></div>

      {/* Favorites Section */}
      <div>
        <div style={sectionTitleStyle}>Favorite Projects</div>
        <ul style={listStyle}>
          {favoritesStub.length > 0 ? (
            favoritesStub.map((fav) => (
              <li key={fav.id} style={itemStyle}>
                {fav.name}
                {/* Placeholder: Add/remove favorite functionality will go here */}
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
          {historyStub.length > 0 ? (
            historyStub.map((h) => (
              <li key={h.id} style={itemStyle}>
                {h.project} <span style={historyDateStyle}>({h.date})</span>
              </li>
            ))
          ) : (
            <li style={fadedStyle}>
              <em>No project history yet.</em>
            </li>
          )}
        </ul>
      </div>

      {/* Placeholder: Stubs for useEffect, local state, and localStorage integration */}
      {/* 
      // Example for future:
      // useEffect(() => {
      //   const savedFavorites = window.localStorage.getItem("favoriteProjects");
      //   // setFavorites(JSON.parse(savedFavorites) || []);
      // }, []);
      */}
    </div>
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
