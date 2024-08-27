import React, { createContext, useState, useContext } from 'react';

// Create the context
const CityContext = createContext();

// CityProvider component that will wrap the app
export const CityProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState(null); // Manage the selected city

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
};

// Hook to use the city context
export const useCity = () => {
  return useContext(CityContext);
};
