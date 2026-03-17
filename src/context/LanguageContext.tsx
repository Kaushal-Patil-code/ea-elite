'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import en from '@/data/translations/en.json';
import ja from '@/data/translations/ja.json';

type Locale = 'en' | 'ja';

const translations: Record<Locale, Record<string, string>> = { en, ja };

interface LanguageContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
  }, []);

  // Sync body class with locale — outside React's DOM tree
  useEffect(() => {
    document.body.classList.toggle('lang-ja', locale === 'ja');
  }, [locale]);

  const t = useCallback((key: string) => {
    return translations[locale][key] || translations['en'][key] || key;
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
