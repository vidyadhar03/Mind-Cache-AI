import React, { useState, useEffect, useContext } from "react";

export const DataContext = React.createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [topics, setTopics] = useState([]);
  const [thoughts, setThoughts] = useState([]);

  // useEffect(() => {

  // }, []);

  return (
    <DataContext.Provider value={{ topics, setTopics ,thoughts, setThoughts}}>
      {children}
    </DataContext.Provider>
  );
};
