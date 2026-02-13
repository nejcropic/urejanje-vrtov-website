import { motion } from "motion/react";
import styles from "./ServicesSection.module.css";

import terasa from "../assets/terasa.jpg";
import trava from "../assets/trava.mp4";
import namakalni_sistemi from "../assets/namakalni_video.mp4";
import travna_rusa from "../assets/travna_rusa.mp4";
import zasaditev from "../assets/zasaditev.mp4";
import obrezovanje from "../assets/obrezovanje.mp4";

const services = [
  {
    title: "Terase in zunanje površine",
    text: "Arhitekturno dovršeni zunanji ambienti z občutkom trajnosti in elegance.",
    media: terasa,
    type: "image",
  },
  {
    title: "Avtomatizirani namakalni sistemi",
    text: "Diskretne in inteligentne rešitve za popolno hidracijo zelenih površin.",
    media: namakalni_sistemi,
    type: "video",
  },
  {
    title: "Trate in zelene strukture",
    text: "Naravna ali umetna trata z brezhibno izvedbo in dolgoročno stabilnostjo.",
    media: trava,
    type: "video",
  },
  {
    title: "Krajinska ureditev in zasaditve",
    text: "Celostno oblikovanje vrtov s poudarkom na kompoziciji in ravnovesju.",
    media: zasaditev,
    type: "video",
  },
  {
    title: "Priprava terena in zemeljska dela",
    text: "Natančna izvedba temeljev vsakega vrhunsko urejenega prostora.",
    media: travna_rusa,
    type: "video",
  },
  {
    title: "Strokovno vzdrževanje in obrezovanje",
    text: "Kontinuirana skrb za zdravje, strukturo in estetsko vrednost vrta.",
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
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
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
          >
            <div className={styles.mediaWrapper}>
              {service.type === "video" ? (
                <video
                  src={service.media}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={styles.media}
                />
              ) : (
                <div
                  className={styles.media}
                  style={{ backgroundImage: `url(${service.media})` }}
                />
              )}
            </div>

            <div className={styles.overlay} />

            <div className={styles.content}>
              <div className={styles.infoPanel}>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <span className={styles.link}>Preberi več →</span>
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
