import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import styles from "./Hero.module.css";
import heroVideo from "../assets/namakalni_video.mp4";

export default function Hero() {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { setMediaReady } = useOutletContext<{
    setMediaReady: (v: boolean) => void;
  }>();

  const [videoReady, setVideoReady] = useState(false);

  // Scroll animations
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 600], [0, -60]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0.6]);

  const handleVideoReady = () => {
    if (!videoReady) {
      setVideoReady(true);
      setMediaReady(true);
    }
  };

  return (
    <section className={styles.hero} ref={ref}>
      {/* Background Video */}
      <video
        ref={videoRef}
        className={styles.video}
        src={heroVideo}
        preload="auto"
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-poster.jpg" // VERY IMPORTANT
        onCanPlayThrough={handleVideoReady}
      />

      {/* Tint */}
      <div className={styles.tint} />

      {/* Grain */}
      <div className={styles.grain} />

      {/* Content */}
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
