import React, { useState } from 'react';
import './App.css';
import MainContainer from './components/MainContainer';
import WasteItemInput from './components/WasteItemInput';
import ProjectSuggestions from './components/ProjectSuggestions';
import UserProfile from './components/UserProfile';

/**
 * App: Trash2Treasure's main entry point.
 * Contains the navigation bar and handles view navigation.
 */
function App() {
  // Main navigation state
  const [currentView, setCurrentView] = useState("home");

  // Global state for Waste Items and User Profile, lifted up to persist between views
  const [wasteItems, setWasteItems] = useState(() => {
    const saved = window.localStorage.getItem("wasteItems");
    return saved ? JSON.parse(saved) : [];
  });
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

  // Sync state to localStorage
  React.useEffect(() => {
    window.localStorage.setItem("wasteItems", JSON.stringify(wasteItems));
  }, [wasteItems]);
  React.useEffect(() => {
    window.localStorage.setItem("trash2treasureUser", JSON.stringify(userProfile));
  }, [userProfile]);

  // Profile and data handlers
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

  // Navigation tabs config
  const tabs = [
    { id: "home", label: "Home" },
    { id: "input", label: "Waste Item Input" },
    { id: "suggest", label: "Project Suggestions" },
    { id: "profile", label: "User Profile" }
  ];

  // Tab highlight style for current tab
  const tabBtnStyle = isActive => ({
    background: isActive ? "var(--secondary-green)" : "transparent",
    color: "#fff",
    border: "none",
    borderRadius: isActive ? "15px" : "12px",
    fontWeight: 600,
    padding: "10px 20px",
    margin: "0 7px",
    fontSize: "1.02rem",
    cursor: "pointer",
    transition: "all 0.18s",
    boxShadow: isActive ? "0 1px 8px 0 rgba(67,190,80,0.13)" : "none",
    outline: "none"
  });

  // Themed animated bar for brand
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container" style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <div className="logo" style={{ minWidth: 160 }}>
            <span className="logo-symbol" role="img" aria-label="leaf">🌿</span> Trash2Treasure
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                className="navbar-tab-btn"
                style={tabBtnStyle(currentView === tab.id)}
                onClick={() => setCurrentView(tab.id)}
                aria-current={currentView === tab.id ? "page" : undefined}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* User mini avatar or action can go here in future */}
        </div>
      </nav>

      <main style={{ minHeight: 630 }}>
        <div className="container">
          {currentView === "home" && (
            <MainContainer
              wasteItems={wasteItems}
              setWasteItems={handleSetWasteItems}
              userProfile={userProfile}
              updateUserProfile={handleUpdateUserProfile}
              addFavorite={handleAddFavorite}
              showHero={true}
              showSections={false}
            />
          )}
          {currentView === "input" && (
            <section style={{marginTop:70}}>
              <h2>Waste Item Input</h2>
              <WasteItemInput
                wasteItems={wasteItems}
                setWasteItems={handleSetWasteItems}
              />
            </section>
          )}
          {currentView === "suggest" && (
            <section style={{marginTop:70}}>
              <h2>Project Suggestions</h2>
              <ProjectSuggestions
                wasteItems={wasteItems}
                onFavorite={handleAddFavorite}
              />
            </section>
          )}
          {currentView === "profile" && (
            <section style={{marginTop:70}}>
              <h2>User Profile</h2>
              <UserProfile
                userProfile={userProfile}
                updateProfile={handleUpdateUserProfile}
              />
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;