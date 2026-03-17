'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  activeSection: string;
  setActiveSection: (s: string) => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <NavigationContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider');
  return ctx;
}
