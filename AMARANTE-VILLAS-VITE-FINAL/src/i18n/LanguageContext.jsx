import { createContext, useContext, useMemo, useState } from "react";
import { ui } from "./ui";

const LanguageContext = createContext(null);

const getInitial = () => {
  if (typeof window === "undefined") return "pt";
  const saved = window.localStorage.getItem("lang");
  if (saved === "pt" || saved === "en") return saved;
  return navigator.language?.toLowerCase().startsWith("en") ? "en" : "pt";
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(getInitial);
  const setLang = (l) => {
    setLangState(l);
    try {
      window.localStorage.setItem("lang", l);
      document.documentElement.lang = l;
    } catch (e) {}
  };
  const value = useMemo(() => ({ lang, setLang, t: ui[lang] }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};

// Pick a bilingual field from a property doc: field="location" -> location_pt/location_en
export const pick = (obj, field, lang) => (obj?.[`${field}_${lang}`] ?? obj?.[`${field}_pt`] ?? "");
