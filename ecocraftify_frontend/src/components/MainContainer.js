import React, { useState, useEffect } from "react";
import "../App.css";
import WasteItemInput from "./WasteItemInput";
import ProjectSuggestions from "./ProjectSuggestions";
import UserProfile from "./UserProfile";

/**
 * MainContainer: The modular layout root for EcoCraftify.
 * Handles state for waste item inputs, project suggestions, and user data.
 * Applies animated plant SVGs for visual effect on the homepage.
 */
// PUBLIC_INTERFACE
function MainContainer() {
  // --- Waste item state (shared between input & suggestions) ---
  const [wasteItems, setWasteItems] = useState(() => {
    // On load, try from localStorage (persist session)
    const saved = window.localStorage.getItem("wasteItems");
    return saved ? JSON.parse(saved) : [];
  });

  // --- User profile state, persists via localStorage ---
  const [userProfile, setUserProfile] = useState(() => {
    const saved = window.localStorage.getItem("ecocraftifyUser");
    return (
      saved
        ? JSON.parse(saved)
        : {
            name: "EcoCrafter",
            avatarUrl: "",
            joinDate: new Date().toISOString().substring(0, 10),
            favorites: [],
            history: [],
          }
    );
  });

  // --- Effect: Keep waste item state persistent (localStorage) ---
  useEffect(() => {
    window.localStorage.setItem("wasteItems", JSON.stringify(wasteItems));
  }, [wasteItems]);

  // --- Effect: Keep userProfile persistent (localStorage) ---
  useEffect(() => {
    window.localStorage.setItem("ecocraftifyUser", JSON.stringify(userProfile));
  }, [userProfile]);

  // WasteItemInput will push new items upward
  function handleSetWasteItems(items) {
    setWasteItems(items);
  }

  // ProjectSuggestions might allow saving favorites in future
  function handleAddFavorite(project) {
    setUserProfile(up => ({
      ...up,
      favorites: Array.isArray(up.favorites)
        ? [...up.favorites, project]
        : [project],
    }));
  }

  // UserProfile might want to save history etc.
  function handleUpdateUserProfile(profileChanges) {
    setUserProfile((up) => ({ ...up, ...profileChanges }));
  }

  // SVG graphics for animated plants
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

  return (
    <div className="main-container-ecocraftify" style={{ position: "relative" }}>
      {/* Plant SVG Sprout decor, visually on "Waste" section */}
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
        {/* Animated "leaf" SVG at bottom-right of profile */}
        {plantLeafSvg}
        <UserProfile userProfile={userProfile} updateProfile={handleUpdateUserProfile} />
      </section>
    </div>
  );
}

export default MainContainer;
