import React, { useState, useEffect, useContext } from "react";

export const DataContext = React.createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    let thoughtsarray = [
    //   {
    //     thought: "first thought of first topic",
    //     time: "15-12-2023 15:33",
    //   },
    //   {
    //     thought: "second thought of first topic",
    //     time: "15-12-2023 15:33",
    //   },
    //   {
    //     thought: "first thought of first topic",
    //     time: "15-12-2023 15:33",
    //   },
    //   {
    //     thought: "second thought of first topic",
    //     time: "15-12-2023 15:33",
    //   },
    ];

    let topics = [
    //   {
    //     title: "first topic",
    //     time: "15-12-2023 15:00",
    //     thoughts: thoughtsarray,
    //     index: "0",
    //   },
    //   {
    //     title: "second topic",
    //     time: "15-12-2023 15:00",
    //     thoughts: thoughtsarray,
    //     index: "0",
    //   },
    //   {
    //     title: "third topic",
    //     time: "15-12-2023 15:00",
    //     thoughts: thoughtsarray,
    //     index: "0",
    //   },
    //   {
    //     title: "first topic",
    //     time: "15-12-2023 15:00",
    //     thoughts: thoughtsarray,
    //     index: "0",
    //   },
    //   {
    //     title: "second topic",
    //     time: "15-12-2023 15:00",
    //     thoughts: thoughtsarray,
    //     index: "0",
    //   }
    ];

    setTopics(topics);
  }, []);

  return (
    <DataContext.Provider value={{ topics, setTopics }}>
      {children}
    </DataContext.Provider>
  );
};
