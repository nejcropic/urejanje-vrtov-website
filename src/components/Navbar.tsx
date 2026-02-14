import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import styles from "./Navbar.module.css";

import logo from "../assets/logo.svg";
import tiktok from "../assets/tik-tok.webp";
import facebook from "../assets/facebook.webp";
import instagram from "../assets/instagram.webp";
import { Phone } from "lucide-react";

import {
  FLAGS,
  useDisableBodyScroll,
  useLanguage,
  type LangCode,
} from "./Navbar.logic";

type NavItem = { to: string; label: string; key: string };

function routeBg(path: string) {
  // Smooth morphing bg color based on route
  if (path.startsWith("/services")) return "rgba(20, 40, 26, 0.72)";
  if (path.startsWith("/references") || path.startsWith("/projekti"))
    return "rgba(18, 34, 28, 0.72)";
  if (path.startsWith("/about")) return "rgba(22, 36, 22, 0.72)";
  if (path.startsWith("/contact")) return "rgba(16, 28, 18, 0.78)";
  return "rgba(12, 20, 12, 0.0)"; // home top = transparent glass only when scrolled
}

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();

  const items: NavItem[] = useMemo(
    () => [
      { to: "/", label: t("nav.home"), key: "home" },
      { to: "/services", label: t("nav.services"), key: "services" }, // anchor entry for dropdown
      { to: "/references", label: t("nav.references"), key: "references" },
      { to: "/about", label: t("nav.about"), key: "about" },
      { to: "/contact", label: t("nav.kontakt"), key: "contact" },
    ],
    [t],
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useDisableBodyScroll(menuOpen);

  // Scroll direction hide/reveal
  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);

      const goingDown = y > lastY;
      if (goingDown && y > 140) setHidden(true);
      if (!goingDown) setHidden(false);

      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // ===== Active indicator measurement =====
  const centerRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  const activeKey = useMemo(() => {
    const p = location.pathname;
    if (p === "/") return "home";
    if (p.startsWith("/services")) return "services";
    if (p.startsWith("/references") || p.startsWith("/projekti"))
      return "references";
    if (p.startsWith("/about")) return "about";
    if (p.startsWith("/contact")) return "contact";
    return "home";
  }, [location.pathname]);

  useLayoutEffect(() => {
    const update = () => {
      const wrap = centerRef.current;
      const el = linkRefs.current[activeKey];
      if (!wrap || !el) return;

      const wrapRect = wrap.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const left = elRect.left - wrapRect.left;
      const width = elRect.width;

      setIndicator({ left, width, opacity: 1 });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [activeKey, items.length]);

  // ===== Cursor expansion blob (desktop only via CSS media) =====
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorOpacity = useMotionValue(0);

  const cursorXSpring = useSpring(cursorX, { stiffness: 120, damping: 25 });
  const cursorYSpring = useSpring(cursorY, { stiffness: 120, damping: 25 });
  const cursorOpacitySpring = useSpring(cursorOpacity, {
    stiffness: 120,
    damping: 25,
  });

  const onCenterMove = (e: React.MouseEvent) => {
    const wrap = centerRef.current;
    if (!wrap) return;
    const r = wrap.getBoundingClientRect();
    cursorX.set(e.clientX - r.left);
    cursorY.set(e.clientY - r.top);
  };

  const onCenterEnter = () => cursorOpacity.set(1);
  const onCenterLeave = () => cursorOpacity.set(0);

  // Route-based background color
  const bg = routeBg(location.pathname);

  return (
    <>
      <header
        className={[
          styles.header,
          scrolled ? styles.headerScrolled : "",
          hidden ? styles.headerHidden : "",
        ].join(" ")}
        style={
          {
            // When not scrolled, allow transparency on homepage.
            // Once scrolled, we use bg (morph by route).
            "--navBg": scrolled ? bg : "rgba(0,0,0,0)",
          } as React.CSSProperties
        }
      >
        <nav className={styles.nav}>
          <div className={styles.left}>
            <Link to="/" className={styles.logoLink} aria-label="Home">
              <img src={logo} alt="Logo" className={styles.logo} />
            </Link>
          </div>

          {/* DESKTOP CENTER */}
          <div
            className={styles.center}
            ref={centerRef}
            onMouseMove={onCenterMove}
            onMouseEnter={onCenterEnter}
            onMouseLeave={onCenterLeave}
          >
            {/* Cursor blob */}
            <motion.div
              className={styles.cursorBlob}
              style={{
                x: cursorXSpring,
                y: cursorYSpring,
                opacity: cursorOpacitySpring,
              }}
            />

            {/* Sliding active indicator */}
            <motion.div
              className={styles.activeIndicator}
              animate={{
                left: indicator.left,
                width: indicator.width,
                opacity: indicator.opacity,
              }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />

            <MagneticNavLink
              to="/"
              label={items[0].label}
              active={activeKey === "home"}
              setRef={(el) => (linkRefs.current["home"] = el)}
            />

            <ServicesDropdown
              label={items[1].label}
              active={activeKey === "services"}
              setRef={(el) => (linkRefs.current["services"] = el)}
            />

            <MagneticNavLink
              to="/references"
              label={items[2].label}
              active={activeKey === "references"}
              setRef={(el) => (linkRefs.current["references"] = el)}
            />

            <MagneticNavLink
              to="/about"
              label={items[3].label}
              active={activeKey === "about"}
              setRef={(el) => (linkRefs.current["about"] = el)}
            />

            <MagneticNavLink
              to="/contact"
              label={items[4].label}
              active={activeKey === "contact"}
              setRef={(el) => (linkRefs.current["contact"] = el)}
            />
          </div>

          <div className={styles.right}>
            <a href="tel:040000000" className={styles.call}>
              <Phone size={16} />
              <span className={styles.callText}>040-000-000</span>
            </a>

            <LanguageDropdown />

            <button
              className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.aside
              className={styles.mobileMenu}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className={styles.mobileLinks}>
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  {t("nav.home")}
                </Link>

                <div className={styles.mobileSectionLabel}>
                  {t("nav.services")}
                </div>
                <div className={styles.mobileSubLinks}>
                  <Link
                    to="/services/urejanje-vrta"
                    onClick={() => setMenuOpen(false)}
                  >
                    Urejanje vrta
                  </Link>
                  <Link
                    to="/services/zemeljska-dela"
                    onClick={() => setMenuOpen(false)}
                  >
                    Zemeljska dela
                  </Link>
                  <Link
                    to="/services/drevesa"
                    onClick={() => setMenuOpen(false)}
                  >
                    Drevesa in obrezovanje
                  </Link>
                  <Link
                    to="/services/namakanje"
                    onClick={() => setMenuOpen(false)}
                  >
                    Namakalni sistemi
                  </Link>
                  <Link
                    to="/services/terase-ograje"
                    onClick={() => setMenuOpen(false)}
                  >
                    Terase in ograje
                  </Link>
                </div>

                <Link to="/references" onClick={() => setMenuOpen(false)}>
                  {t("nav.references")}
                </Link>
                <Link to="/about" onClick={() => setMenuOpen(false)}>
                  {t("nav.about")}
                </Link>
                <Link to="/contact" onClick={() => setMenuOpen(false)}>
                  {t("nav.kontakt")}
                </Link>
              </div>

              <div className={styles.mobileFooter}>
                <a href="tel:040000000" className={styles.mobilePhone}>
                  <Phone size={16} />
                  <span>040-000-000</span>
                </a>

                <div className={styles.mobileSocials}>
                  <a
                    href="https://www.tiktok.com/@urejanjevrtov?_r=1&_t=ZN-93oPBUW7dLS"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={tiktok} alt="TikTok" />
                  </a>
                  <a
                    href="https://www.instagram.com/urejanje_vrtov?igsh=MWY5MzQwcGo1Mm9tNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={instagram} alt="Instagram" />
                  </a>
                  <a
                    href="https://www.facebook.com/share/1Bq9TnAdoo/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={facebook} alt="Facebook" />
                  </a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* =========================
   Desktop Nav Link (Magnetic)
========================= */
function MagneticNavLink({
  to,
  label,
  active,
  setRef,
}: {
  to: string;
  label: string;
  active: boolean;
  setRef: (el: HTMLAnchorElement | null) => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18 });
  const sy = useSpring(y, { stiffness: 180, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * 0.08);
    y.set(dy * 0.12);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x: sx, y: sy }} className={styles.navItemWrap}>
      <Link
        to={to}
        ref={setRef}
        className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {label}
      </Link>
    </motion.div>
  );
}

/* =========================
   Services Dropdown (Desktop)
========================= */
function ServicesDropdown({
  label,
  active,
  setRef,
}: {
  label: string;
  active: boolean;
  setRef: (el: HTMLAnchorElement | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18 });
  const sy = useSpring(y, { stiffness: 180, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * 0.08);
    y.set(dy * 0.12);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className={styles.dropdownWrapper}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <motion.div style={{ x: sx, y: sy }} className={styles.navItemWrap}>
        <Link
          to="/services"
          ref={setRef}
          className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          {label}
        </Link>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.dropdownMenu}
            initial={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <Link to="/services/urejanje-vrta">Urejanje vrta</Link>
            <Link to="/services/zemeljska-dela">Zemeljska dela</Link>
            <Link to="/services/drevesa">Drevesa in obrezovanje</Link>
            <Link to="/services/namakanje">Namakalni sistemi</Link>
            <Link to="/services/terase-ograje">Terase in ograje</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================
   Language Dropdown
========================= */
function LanguageDropdown() {
  const { current, change } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <div className={styles.langDropdown} onClick={(e) => e.stopPropagation()}>
      <button
        className={styles.langCurrent}
        onClick={() => setOpen((o) => !o)}
        aria-label="Language"
      >
        {FLAGS[current]}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.langMenu}
            initial={{ opacity: 0, y: -6, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(6px)" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {(Object.keys(FLAGS) as LangCode[]).map((code) => (
              <button
                key={code}
                className={styles.langItem}
                onClick={() => {
                  change(code);
                  setOpen(false);
                }}
              >
                {FLAGS[code]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
