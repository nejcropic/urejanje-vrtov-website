import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Hero.module.css";

export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 600], [0, -60]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0.6]);

  return (
    <section className={styles.hero} ref={ref}>
      <video
        className={styles.video}
        src="/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/preload.webp"
      />

      <div className={styles.tint} />
      <div className={styles.grain} />

      <motion.div
        className={styles.content}
        style={{ y: yText, opacity: opacityText }}
      >
        <div className={styles.left}>
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Oblikujemo
            <br />
            zunanje prostore
            <br />
            <span>z značajem.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            Celostna ureditev vrtov, teras in zelenih površin – od idejne
            zasnove do dovršene izvedbe.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <Link to="/projekti" className={styles.cta}>
              Oglejte si projekte →
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
