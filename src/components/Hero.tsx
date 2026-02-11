import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Hero.module.css";
import { motion } from "motion/react";

import { Link } from "react-router-dom";
import obrezovanje from "../assets/obrezovanje.jpeg";
import img_trava from "../assets/trava.jpg";
import img_tepih1 from "../assets/tepih_1.jpeg";
import img_tepih2 from "../assets/tepih_2.jpeg";

type Slide = { type: "image"; src: string } | { type: "video"; src: string };

const slides: Slide[] = [
  { type: "image", src: img_trava },
  { type: "image", src: obrezovanje },
  { type: "image", src: img_tepih1 },
  { type: "image", src: img_tepih2 },
];

import serviceImg from "../assets/trava.jpg";
import referenceImg from "../assets/terasa.jpg";
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Hero() {
  const { t } = useTranslation();

  const [index, setIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  /* SLIDE TIMER */
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  /* VIDEO PLAY / PAUSE */
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === index) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [index]);

  /* PRELOAD NEXT SLIDE */
  useEffect(() => {
    const next = slides[(index + 1) % slides.length];
    if (next.type === "image") {
      const img = new Image();
      img.src = next.src;
    } else {
      const video = document.createElement("video");
      video.src = next.src;
      video.preload = "auto";
    }
  }, [index]);

  return (
    <section className={styles.hero}>
      <div className={styles.slider}>
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`${styles.slide} ${i === index ? styles.active : ""}`}
          >
            {slide.type === "image" ? (
              <div
                className={styles.image}
                style={{ backgroundImage: `url(${slide.src})` }}
              />
            ) : (
              <video
                ref={(el) => (videoRefs.current[i] = el)}
                className={styles.video}
                src={slide.src}
                muted
                loop
                playsInline
                preload="metadata"
              />
            )}
          </div>
        ))}
      </div>

      <div className={styles.overlay} />
      <motion.div
        className={styles.content}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <h1>
          <div className={styles.reveal}>
            <motion.span
              className={styles.line}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              {t("hero.big")}
            </motion.span>
          </div>

          <div className={styles.reveal}>
            <motion.span
              className={styles.line}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {t("hero.big_2")}
            </motion.span>
          </div>
        </h1>

        <motion.p variants={fadeUp}>{t("hero.big_text")}</motion.p>

        <motion.div variants={fadeUp}>
          <Link to="/about" className={styles.heroBadge}>
            {t("hero.question")}
          </Link>
        </motion.div>
      </motion.div>
      <motion.div
        className={styles.heroWindows}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.6,
            },
          },
        }}
      >
        <motion.a
          href="/storitve"
          className={styles.heroCard}
          variants={fadeUp}
        >
          <div
            className={styles.heroCardImage}
            style={{ backgroundImage: `url(${serviceImg})` }}
          />
          <div className={styles.heroCardOverlay} />
          <div className={styles.heroCardContent}>
            <h3>Naše storitve</h3>
            <span>Oglej si →</span>
          </div>
        </motion.a>
        <motion.a
          href="/referebce"
          className={styles.heroCard}
          variants={fadeUp}
        >
          <div
            className={styles.heroCardImage}
            style={{ backgroundImage: `url(${referenceImg})` }}
          />
          <div className={styles.heroCardOverlay} />
          <div className={styles.heroCardContent}>
            <h3>Naši projekti</h3>
            <span>Poglej več →</span>
          </div>
        </motion.a>
      </motion.div>
    </section>
  );
}
