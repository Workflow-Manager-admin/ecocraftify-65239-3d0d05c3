import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// PUBLIC_INTERFACE
/**
 * CreationsContext provides access to user's craft/compost ideas (creations) globally.
 * Each creation: {id, ideaText, imageUrl?, createdAt, ...future}
 */
const CreationsContext = createContext();

/**
 * Provider component to wrap the app and allow global creations state.
 */
export function CreationsProvider({ children }) {
  const [creations, setCreations] = useState(() => {
    try {
      const stored = window.localStorage.getItem("myCreations");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    window.localStorage.setItem("myCreations", JSON.stringify(creations));
  }, [creations]);

  // PUBLIC_INTERFACE
  /** Add a new creation */
  const addCreation = useCallback((idea) => {
    const newIdea = {
      ...idea,
      id: idea.id || Date.now() + Math.random().toString(16).slice(2),
      createdAt: idea.createdAt || new Date().toISOString(),
    };
    setCreations((prev) => [newIdea, ...prev]);
  }, []);

  // PUBLIC_INTERFACE
  /** Edit an existing creation by id */
  const editCreation = useCallback((id, changes) => {
    setCreations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...changes } : c))
    );
  }, []);

  // PUBLIC_INTERFACE
  /** Mark as done (adds a .done=true prop) */
  const markDone = useCallback(
    (id) => editCreation(id, { done: true }),
    [editCreation]
  );

  // PUBLIC_INTERFACE
  /** Remove a creation (future) */
  const removeCreation = useCallback((id) => {
    setCreations((prev) => prev.filter((c) => c.id !== id));
  }, []);

  // PUBLIC_INTERFACE
  /** Replace entire creations list (future use) */
  const setAllCreations = useCallback((list) => {
    setCreations(Array.isArray(list) ? list : []);
  }, []);

  return (
    <CreationsContext.Provider
      value={{
        creations,
        addCreation,
        editCreation,
        removeCreation,
        markDone,
        setAllCreations,
      }}
    >
      {children}
    </CreationsContext.Provider>
  );
}

// PUBLIC_INTERFACE
/** Hook to use creations context. */
export function useCreations() {
  return useContext(CreationsContext);
}
