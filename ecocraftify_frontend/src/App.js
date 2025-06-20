import React from 'react';
import './App.css';
import MainContainer from './components/MainContainer';

/**
 * App: Trash2Treasure's main entry point.
 * Contains the navbar and the modular MainContainer root.
 */
function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol" role="img" aria-label="leaf">🌿</span> Trash2Treasure
            </div>
            <button className="btn">Profile</button>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <MainContainer />
        </div>
      </main>
    </div>
  );
}

export default App;