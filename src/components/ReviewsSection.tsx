import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./ReviewsSection.module.css";

const testimonials = [
  {
    text: "Janko Pugelj se je zelo hitro odzval in pripravil ponudbo, zelo smo bili zadovoljni za tako hitro opravljeno delo.",
    author: "Tanja K.",
  },
  {
    text: "Zelo prilagodljiv in strokoven, z veliko dobre volje... Bravo, g. Pugelj!",
    author: "Neva J.",
  },
  {
    text: "Zelo sem zadovoljen z urejanjem okolice - delo je bilo res dobro opravljeno. Strokoven in profesionalen pristop, natančnost pri detajlih ter zanesljivo spoštovanje rokov so me najbolj prepričali. Top priporočilo!",
    author: "David K.",
  },
];

export default function ReviewsSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.testimonials}>
      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className={styles.quoteMark}>“</div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <p className={styles.text}>{testimonials[index].text}</p>
            <span className={styles.author}>{testimonials[index].author}</span>
          </motion.div>
        </AnimatePresence>

        <div className={styles.dots}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === index ? styles.active : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
