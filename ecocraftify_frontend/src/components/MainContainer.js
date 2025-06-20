import React, { useState, useEffect } from "react";
import "../App.css";
import WasteItemInput from "./WasteItemInput";
import ProjectSuggestions from "./ProjectSuggestions";
import UserProfile from "./UserProfile";

/**
 * Top-level SVG assets for plant branding/animations
 */
const plantSproutSvg = (
  <svg
    className="plant-animated-sprout"
    width="72"
    height="58"
    viewBox="0 0 70 50"
    fill="none"
  >
    <ellipse cx="38" cy="47" rx="19" ry="6" fill="#D5F7DA" />
    <path d="M38 45 Q39 20 10 11 Q24 6 38 22 Q53 0 66 7 Q48 23 38 45 Z"
      fill="var(--plant-green)" stroke="#319c44" strokeWidth="2"
      style={{ filter: "drop-shadow(0 1px 3px #65d49322)" }} />
    <ellipse cx="52" cy="17" rx="3" ry="5" transform="rotate(-23 52 17)" fill="#6ED37D" />
    <ellipse cx="24" cy="18" rx="3" ry="5" transform="rotate(23 24 18)" fill="#7AD786" />
  </svg>
);
const plantLeafSvg = (
  <svg
    className="plant-animated-leaf"
    width="52"
    height="52"
    viewBox="0 0 52 52"
    fill="none"
  >
    <ellipse cx="30" cy="47" rx="19" ry="5" fill="#D5F7DA" />
    <path d="M26 47 Q31 33 44 34 Q31 31 30 12 Q34 24 14 37 Q29 38 26 47 Z"
      fill="var(--secondary-green)" stroke="#6ED37D" strokeWidth="1.7" />
    <ellipse cx="17" cy="39" rx="3" ry="5" transform="rotate(-13 17 39)" fill="#b2f1c9" />
    <ellipse cx="36" cy="41" rx="3" ry="4" fill="#84e497" />
  </svg>
);

// PUBLIC_INTERFACE
function MainContainer() {
  // State and localStorage sync for waste items
  const [wasteItems, setWasteItems] = useState(() => {
    const saved = window.localStorage.getItem("wasteItems");
    return saved ? JSON.parse(saved) : [];
  });
  // State and localStorage sync for user profile
  const [userProfile, setUserProfile] = useState(() => {
    const saved = window.localStorage.getItem("trash2treasureUser");
    return (
      saved
        ? JSON.parse(saved)
        : {
          name: "TreasureMaker",
          avatarUrl: "",
          joinDate: new Date().toISOString().substring(0, 10),
          favorites: [],
          history: [],
        }
    );
  });

  useEffect(() => {
    window.localStorage.setItem("wasteItems", JSON.stringify(wasteItems));
  }, [wasteItems]);
  useEffect(() => {
    window.localStorage.setItem("trash2treasureUser", JSON.stringify(userProfile));
  }, [userProfile]);

  // Event handlers to pass down
  function handleSetWasteItems(items) {
    setWasteItems(items);
  }
  function handleAddFavorite(project) {
    setUserProfile(up => ({
      ...up,
      favorites: Array.isArray(up.favorites)
        ? [...up.favorites, project]
        : [project],
    }));
  }
  function handleUpdateUserProfile(profileChanges) {
    setUserProfile((up) => ({ ...up, ...profileChanges }));
  }

  // --- HERO/INTRO SECTION ---
  return (
    <>
      <section
        className="hero"
        style={{
          position: "relative",
          background: "#f5ffef",
          borderRadius: "0 0 16px 16px"
        }}
      >
        <div style={{ position: "absolute", left: 0, top: -25, zIndex: 0 }}>
          {plantSproutSvg}
        </div>
        <div style={{ position: "absolute", right: 0, bottom: -30, zIndex: 0 }}>
          {plantLeafSvg}
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="subtitle">Welcome to</div>
          <h1 className="title" style={{ fontFamily: "Inter,sans-serif", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Trash2Treasure
          </h1>
          <div
            style={{
              fontWeight: 600,
              color: "var(--secondary-green)",
              fontSize: "1.28rem",
              margin: "9px 0 16px 0",
              fontFamily: "inherit"
            }}
          >
            Craft, Compost, Create – Nothing Goes to Waste!
          </div>
          <div className="description" style={{ marginBottom: 22 }}>
            Your home is full of possibilities—even in its waste!
          </div>
        </div>
        <div
          className="feature-cards-container"
          style={{
            display: "flex",
            gap: 22,
            justifyContent: "center",
            flexWrap: "wrap",
            maxWidth: 920,
            margin: "0 auto",
          }}
        >
          {/* Feature 1: Upcycle */}
          <FeatureCard
            icon="🛠️"
            title="Upcycle"
            details={[
              "Input old or unused items (like bottles, boxes, socks)",
              "Get craft ideas for decor, tools, gifts, toys, and school projects",
            ]}
          />
          {/* Feature 2: Compost */}
          <FeatureCard
            icon="🌱"
            title="Compost"
            details={[
              "Enter vegetable peels, fruit waste, coffee grounds, etc.",
              "Learn how to convert them into natural compost",
              "Get step-by-step guidance for home compost bins, garden usage, and composting dos and don'ts"
            ]}
          />
          {/* Feature 3: Eco Tips & Daily Ideas */}
          <FeatureCard
            icon="🌿"
            title="Eco Tips & Daily Ideas"
            details={[
              "Daily upcycling or composting tips",
              "Quotes and eco challenges to build good green habits"
            ]}
          />
        </div>
      </section>

      {/* App's input/suggestions/profile main feature layout */}
      <div className="main-container-ecocraftify" style={{ position: "relative", marginTop: 46 }}>
        {/* Waste Item Input */}
        <section className="waste-item-input" style={{ position: "relative" }}>
          <h2>Waste Item Input</h2>
          {plantSproutSvg}
          <WasteItemInput wasteItems={wasteItems} setWasteItems={handleSetWasteItems} />
        </section>
        <section className="project-suggestions" style={{ position: "relative" }}>
          <h2>Project Suggestions</h2>
          <ProjectSuggestions wasteItems={wasteItems} onFavorite={handleAddFavorite} />
        </section>
        <section className="user-profile" style={{ position: "relative" }}>
          <h2>User Profile</h2>
          {plantLeafSvg}
          <UserProfile userProfile={userProfile} updateProfile={handleUpdateUserProfile} />
        </section>
      </div>
    </>
  );
}

// --- Feature Highlight Card: styled for green/eco branding ---
function FeatureCard({ icon, title, details }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1.5px solid var(--border-color)",
        borderRadius: "15px",
        padding: "28px 22px 18px 22px",
        boxShadow: "0 2px 14px 0 rgba(67, 175, 80, 0.07)",
        minWidth: 240,
        maxWidth: 320,
        flex: "1 1 265px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        position: "relative",
        zIndex: 2,
        margin: "10px 0"
      }}
    >
      <div style={{
        fontSize: "2.2rem",
        marginBottom: 6,
        fontFamily: "inherit"
      }}>{icon}</div>
      <div style={{
        fontWeight: 600,
        fontSize: "1.15rem",
        color: "var(--primary-green)",
        marginBottom: 5,
        letterSpacing: "0.02em"
      }}>{title}</div>
      <ul style={{ color: "var(--text-secondary)", paddingLeft: 18, marginBottom: 0, fontSize: "1.01rem" }}>
        {details.map((line, idx) =>
          <li key={idx} style={{ marginBottom: 4, lineHeight: "1.42" }}>{line}</li>
        )}
      </ul>
    </div>
  );
}

export default MainContainer;
