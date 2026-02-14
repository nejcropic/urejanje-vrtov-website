import { useEffect } from "react";
import { useTranslation } from "react-i18next";

/* ---------- CONSTANTS ---------- */
export const FLAGS = {
  si: "🇸🇮",
  en: "🇬🇧",
  it: "🇮🇹",
} as const;

export type LangCode = keyof typeof FLAGS;

/* ---------- HELPERS ---------- */
export function getLangCode(lang: string): LangCode {
  if (lang.startsWith("si")) return "si";
  if (lang.startsWith("en")) return "en";
  return "it";
}

/* ---------- BODY SCROLL LOCK ---------- */
export function useDisableBodyScroll(active: boolean) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = active ? "hidden" : prev;
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);
}

/* ---------- LANGUAGE ---------- */
export function useLanguage() {
  const { i18n } = useTranslation();
  const current = getLangCode(i18n.language);

  return {
    current,
    change: i18n.changeLanguage,
  };
}
