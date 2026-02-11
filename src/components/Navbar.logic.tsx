import { animate } from "motion";
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

/* ---------- EFFECTS ---------- */

export function usePageTransition(pathname: string) {
  useEffect(() => {
    const main = document.querySelector<HTMLElement>("main");
    if (!main) return;

    animate(
      main,
      {
        opacity: [0, 1],
        transform: ["translateY(10px)", "translateY(0px)"],
      },
      { duration: 0.3 },
    );
  }, [pathname]);
}

export function useDisableBodyScroll(active: boolean) {
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);
}

/* ---------- MOBILE MENU ANIMATION ---------- */

export function useMobileMenuAnimation() {
  useEffect(() => {
    const menu = document.querySelector<HTMLElement>("#mobile-menu");
    if (!menu) return;

    animate(
      menu,
      {
        opacity: [0, 1],
        transform: ["translateY(20px)", "translateY(0px)"],
      },
      { duration: 0.3 },
    );
  }, []);
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
