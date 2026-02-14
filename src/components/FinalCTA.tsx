import { motion } from "motion/react";
import styles from "./FinalCTA.module.css";
import { Link } from "react-router-dom";

export default function FinalCTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.overlay} />

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>Pripravljeni na popolno ureditev vaše okolice?</h2>
        <p>
          Kontaktirajte nas in skupaj ustvarimo prostor, kjer se boste počutili
          odlično.
        </p>

        <div className={styles.buttons}>
          <Link to="/kontakt" className={styles.primary}>
            Pošlji povpraševanje
          </Link>

          <Link to="/projekti" className={styles.secondary}>
            Oglej si projekte
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
