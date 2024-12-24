import { createContext, useContext, useState } from 'react';

const ExcelContext = createContext();

export function ExcelProvider({ children }) {
  const [excelData, setExcelData] = useState([]);

  const updateExcelData = (data) => {
    setExcelData(data);
  };

  return (
    <ExcelContext.Provider value={{ excelData, updateExcelData }}>
      {children}
    </ExcelContext.Provider>
  );
}

export function useExcel() {
  const context = useContext(ExcelContext);
  if (!context) {
    throw new Error('useExcel must be used within an ExcelProvider');
  }
  return context;
}
