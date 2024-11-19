import React, { createContext, useState, useContext } from "react";

// Create the Context
const TabIndexContext = createContext();

// Create a provider component
export function TabIndexProvider({ children }) {
  const [tabIndex, setTabIndex] = useState(window.location.pathname);

  return (
    <TabIndexContext.Provider value={{ tabIndex, setTabIndex }}>
      {children}
    </TabIndexContext.Provider>
  );
}

// Custom hook to use the TabIndexContext
export function useTabIndex() {
  return useContext(TabIndexContext);
}
