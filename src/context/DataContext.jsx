import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [globalData, setGlobalData] = useState([]);

  const updateGlobalData = (newData) => {
    setGlobalData(newData);
  };

  return (
    <DataContext.Provider value={{ globalData, updateGlobalData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
