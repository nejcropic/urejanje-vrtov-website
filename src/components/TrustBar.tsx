import { motion } from "motion/react";
import styles from "./TrustBar.module.css";

const stats = [
  { number: "120+", label: "Izvedenih projektov" },
  { number: "10+", label: "Let izkušenj" },
  { number: "100%", label: "Zadovoljstvo strank" },
  { number: "Celotna SI", label: "Delujemo po Sloveniji" },
];

export default function TrustBar() {
  return (
    <section className={styles.trust}>
      <div className={styles.container}>
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className={styles.stat}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <motion.div
              className={styles.number}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {stat.number}
            </motion.div>
            <div className={styles.label}>{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
