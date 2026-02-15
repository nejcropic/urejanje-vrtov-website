import { motion } from "motion/react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* LEFT – Brand */}
        <motion.div
          className={styles.brand}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3>Urejanje vrtov</h3>
          <p>
            Celostno urejanje vrtov in zunanjih površin. Strokovno, zanesljivo
            in estetsko dovršeno.
          </p>

          <div className={styles.socials}>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook size={20} />
            </a>
          </div>
        </motion.div>

        {/* NAVIGATION */}
        <motion.div
          className={styles.links}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h4>Navigacija</h4>
          <Link to="/">Domov</Link>
          <Link to="/about">O nas</Link>
          <Link to="/services">Storitve</Link>
          <Link to="/references">Reference</Link>
          <Link to="/contact">Kontakt</Link>
        </motion.div>

        {/* CONTACT */}
        <motion.div
          className={styles.contact}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h4>Kontakt</h4>

          <div className={styles.info}>
            <Phone size={18} />
            <span>040 000 000</span>
          </div>

          <div className={styles.info}>
            <Mail size={18} />
            <span>info@urejanje-vrtov.si</span>
          </div>

          <div className={styles.info}>
            <MapPin size={18} />
            <span>Slovenija</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom */}
      <div className={styles.bottom}>
        <span>
          © {new Date().getFullYear()}{" "}
          <a style={{ color: "white" }} href="https://www.nejc-ropic.si/">
            Nejc Ropič.
          </a>{" "}
          Vse pravice pridržane.
        </span>
      </div>
    </footer>
  );
}
