import React from 'react';
import { useAppData } from './useAppData';

const AppContext = React.createContext<ReturnType<typeof useAppData> | null>(null);

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const data = useAppData();
  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = React.useContext(AppContext);
  if (context === null) throw new Error('useApp must be used within AppProvider');
  return context;
};
