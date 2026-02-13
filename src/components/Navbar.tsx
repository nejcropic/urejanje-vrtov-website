import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { animate } from "motion";
import { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";
import logo from "../assets/logo.png";
import logo_white from "../assets/logo_white.png";
import tiktok from "../assets/tik-tok.png";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import { Phone } from "lucide-react";

import {
  FLAGS,
  usePageTransition,
  useDisableBodyScroll,
  useMobileMenuAnimation,
  useLanguage,
  type LangCode,
} from "./Navbar.logic";

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [topbarHidden, setTopbarHidden] = useState(false);

  const lastScroll = useRef(0);

  usePageTransition(location.pathname);
  useDisableBodyScroll(menuOpen);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  /* Scroll logic */
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      const x = 100;
      // navbar background trigger
      setScrolled(current > x - 60);

      // hide topbar when scrolling down
      if (current > lastScroll.current && current > x) {
        setTopbarHidden(true);
      } else {
        setTopbarHidden(false);
      }

      lastScroll.current = current;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`${styles.header} ${
          topbarHidden ? styles.headerCollapsed : ""
        }`}
      >
        <Topbar hidden={topbarHidden} />

        <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
          <div className={styles.left}>
            <img src={scrolled ? logo_white : logo} alt="Logo" />
          </div>

          <div className={styles.center}>
            <NavLink to="/" label={t("nav.home")} />
            <ServicesDropdown />
            <NavLink to="/references" label={t("nav.references")} />
            <NavLink to="/about" label={t("nav.about")} />
            <NavLink to="/contact" label={t("nav.kontakt")} />
          </div>

          <div className={styles.right}>
            <LanguageDropdown />

            <div
              className={`${styles.hamburger} ${
                menuOpen ? styles.hamburgerOpen : ""
              }`}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <>
          <div className={styles.backdrop} onClick={() => setMenuOpen(false)} />
          <MobileMenu close={() => setMenuOpen(false)} />
        </>
      )}
    </>
  );
}

/* ================================
   SUB COMPONENTS
   ================================ */
function Topbar({ hidden }: { hidden: boolean }) {
  return (
    <div className={`${styles.topbar} ${hidden ? styles.topbarHidden : ""}`}>
      <div className={styles.topLeft}>
        <a href="tel:040000000" className={styles.phoneLink}>
          <Phone size={14} />
          <span>040-000-000</span>
        </a>
      </div>

      <div className={styles.topRight}>
        <Link
          to="https://www.tiktok.com/@urejanjevrtov?_r=1&_t=ZN-93oPBUW7dLS"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={tiktok} alt="TikTok" />
        </Link>
        <Link
          to="https://www.instagram.com/urejanje_vrtov?igsh=MWY5MzQwcGo1Mm9tNw=="
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={instagram} alt="Instagram" />
        </Link>
        <Link
          to="https://www.facebook.com/share/1Bq9TnAdoo/?mibextid=wwXIfr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={facebook} alt="Facebook" />
        </Link>
      </div>
    </div>
  );
}

function ServicesDropdown() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div
      className={styles.dropdownWrapper}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className={styles.navLink}>{t("nav.services")}</span>

      {open && (
        <div className={styles.dropdownMenuSimple}>
          <Link to="/services/urejanje-vrta">Urejanje vrta</Link>
          <Link to="/services/zemeljska-dela">Zemeljska dela</Link>
          <Link to="/services/drevesa">Drevesa in obrezovanje</Link>
          <Link to="/services/namakanje">Namakalni sistemi</Link>
          <Link to="/services/terase-ograje">Terase in ograje</Link>
        </div>
      )}
    </div>
  );
}

function NavLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className={styles.navLink}
      onMouseEnter={(e) =>
        animate(e.currentTarget, { opacity: 0.7 }, { duration: 0.15 })
      }
      onMouseLeave={(e) =>
        animate(e.currentTarget, { opacity: 1 }, { duration: 0.15 })
      }
    >
      {label}
    </Link>
  );
}

function MobileMenu({ close }: { close: () => void }) {
  useMobileMenuAnimation();
  const { t } = useTranslation();
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <div className={styles.mobileMenu} id="mobile-menu">
      {/* LINKS */}
      <div className={styles.mobileLinks}>
        <Link to="/" onClick={close}>
          {t("nav.home")}
        </Link>

        {/* SERVICES ACCORDION */}
        <div className={styles.mobileAccordion}>
          <button
            className={styles.mobileAccordionHeader}
            onClick={() => setServicesOpen((o) => !o)}
          >
            {t("nav.services")}
            <span
              className={`${styles.mobileChevron} ${
                servicesOpen ? styles.mobileChevronOpen : ""
              }`}
            >
              ▾
            </span>
          </button>

          <div
            className={`${styles.mobileAccordionContent} ${
              servicesOpen ? styles.mobileAccordionContentOpen : ""
            }`}
          >
            <Link to="/services/urejanje-vrta" onClick={close}>
              Urejanje vrta
            </Link>
            <Link to="/services/zemeljska-dela" onClick={close}>
              Zemeljska dela
            </Link>
            <Link to="/services/drevesa" onClick={close}>
              Drevesa in obrezovanje
            </Link>
            <Link to="/services/namakanje" onClick={close}>
              Namakalni sistemi
            </Link>
            <Link to="/services/terase-ograje" onClick={close}>
              Terase in ograje
            </Link>
          </div>
        </div>

        <Link to="/references" onClick={close}>
          {t("nav.references")}
        </Link>

        <Link to="/about" onClick={close}>
          {t("nav.about")}
        </Link>

        <Link to="/contact" onClick={close}>
          {t("nav.kontakt")}
        </Link>
      </div>

      {/* FOOTER */}
      <div className={styles.mobileFooter}>
        <a href="tel:040000000" className={styles.mobilePhone}>
          <Phone size={16} />
          <span>040-000-000</span>
        </a>

        <div className={styles.mobileSocials}>
          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={tiktok} alt="TikTok" />
          </a>

          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instagram} alt="Instagram" />
          </a>

          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={facebook} alt="Facebook" />
          </a>
        </div>
      </div>
    </div>
  );
}

function LanguageDropdown() {
  const { current, change } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.langDropdown} onClick={(e) => e.stopPropagation()}>
      <button className={styles.langCurrent} onClick={() => setOpen((o) => !o)}>
        {FLAGS[current]}
      </button>

      {open && (
        <div className={styles.langMenu}>
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
        </div>
      )}
    </div>
  );
}
