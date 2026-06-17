import { useState, useCallback } from 'react';
import translations from '../data/translations';

export type Lang = 'en' | 'id' | 'zh';

export function useI18n() {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem('fainaya-lang') as Lang) || 'en';
  });

  const t = useCallback(
    (key: string): string => {
      return translations[lang]?.[key] || key;
    },
    [lang]
  );

  const setLanguage = useCallback((newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem('fainaya-lang', newLang);
    document.documentElement.lang = newLang === 'zh' ? 'zh-CN' : newLang;
  }, []);

  return { lang, t, setLanguage };
}