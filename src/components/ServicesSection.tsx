import { motion } from "motion/react";
import styles from "./ServicesSection.module.css";

import terasa from "../assets/terasa.webp";
import trava from "../assets/trava.mp4";
import namakalni_sistemi from "../assets/namakalni_video.mp4";
import travna_rusa from "../assets/travna_rusa.mp4";
import zasaditev from "../assets/zasaditev.mp4";
import obrezovanje from "../assets/obrezovanje.mp4";

const services = [
  {
    title: "Terase in zunanje površine",
    media: terasa,
    type: "image",
  },
  {
    title: "Avtomatizirani namakalni sistemi",
    media: namakalni_sistemi,
    type: "video",
  },
  {
    title: "Trate in zelene strukture",
    media: trava,
    type: "video",
  },
  {
    title: "Krajinska ureditev in zasaditve",
    media: zasaditev,
    type: "video",
  },
  {
    title: "Priprava terena in zemeljska dela",
    media: travna_rusa,
    type: "video",
  },
  {
    title: "Strokovno vzdrževanje in obrezovanje",
    media: obrezovanje,
    type: "video",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ServicesSection() {
  return (
    <section className={styles.services}>
      <div className={styles.header}>
        <h2>Celostne rešitve za urejanje zunanjih prostorov</h2>
        <p>
          Od idejne zasnove do dovršene izvedbe – ustvarjamo trajne,
          funkcionalne in estetsko usklajene ambiente.
        </p>
      </div>

      <motion.div
        className={styles.grid}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {services.map((service, i) => (
          <motion.a
            key={i}
            href="/storitve"
            className={styles.card}
            variants={item}
            whileHover={{ y: -10 }}
          >
            {/* MEDIA WITH IDLE BREATHING EFFECT */}
            <motion.div
              className={styles.mediaWrapper}
              initial={{ scale: 1 }}
              animate={{ scale: 1.04 }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              {service.type === "video" ? (
                <motion.video
                  src={service.media}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={styles.media}
                  whileHover={{ scale: 1.1, y: -10 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              ) : (
                <motion.div
                  className={styles.media}
                  style={{ backgroundImage: `url(${service.media})` }}
                  whileHover={{ scale: 1.1, y: -10 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              )}
            </motion.div>

            {/* GRADIENT OVERLAY */}
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0.9 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            />

            {/* CONTENT */}
            <div className={styles.cardContent}>
              <h3>{service.title}</h3>

              <motion.span
                className={styles.link}
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                Preberi več →
              </motion.span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
