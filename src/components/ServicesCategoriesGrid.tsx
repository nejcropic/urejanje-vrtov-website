import { motion } from "motion/react";
import { Link } from "react-router-dom";
import styles from "./ServicesCategoriesGrid.module.css";
import { images } from "@/lib/media";

const categories = [
  {
    title: "Terase in zunanje površine",
    image: images.reference.ref1,
    link: "/services/terase",
  },
  {
    title: "Avtomatizirani namakalni sistemi",
    image: images.reference.ref3,
    link: "/services/namakanje",
  },
  {
    title: "Zelene površine in zasaditve",
    image: images.reference.ref2,
    link: "/services/zelene-povrsine",
  },
  {
    title: "Zemeljska dela",
    image: images.reference.ref2,
    link: "/services/zemeljska-dela",
  },
  {
    title: "Drevesna dela",
    image: images.reference.ref2,
    link: "/services/drevesa",
  },
  {
    title: "Vzdrževanje vrtov",
    image: images.reference.ref2,
    link: "/services/vzdrzevanje",
  },
];

export default function ServicesCategoriesGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.intro}>
        <span className={styles.badge}>Storitve</span>
        <h2>
          Celovit nabor <span>strokovnih rešitev</span>
        </h2>
        <p>
          Izberite področje, ki vas zanima, in preverite podrobnosti naše
          izvedbe.
        </p>
      </div>

      <motion.div layout className={styles.grid}>
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            layout
            className={styles.card}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
          >
            <Link to={cat.link}>
              <img src={cat.image} alt={cat.title} />
              <div className={styles.overlay}>
                <h3>{cat.title}</h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
