import { motion } from "motion/react";
import ServiceDetailLayout from "../../components/ServiceDetailLayout";
import styles from "../../components/ServiceDetail.module.css";
import { videos } from "@/lib/media";

const features = [
  {
    title: "Projektiranje sistema",
    text: "Analiza terena in optimalna razporeditev škropilcev ter kapljičnih linij.",
  },
  {
    title: "Pametna avtomatika",
    text: "Programabilni sistemi in senzorji vlage za varčno porabo vode.",
  },
  {
    title: "Podzemna napeljava",
    text: "Diskretna izvedba brez motenja estetike vrta.",
  },
  {
    title: "Sezonska optimizacija",
    text: "Prilagoditev delovanja sistema glede na vremenske razmere.",
  },
  {
    title: "Vzdrževanje sistema",
    text: "Redni pregledi in priprava sistema na sezono.",
  },
  {
    title: "Dolgotrajna rešitev",
    text: "Kakovostni materiali za zanesljivo in dolgo življenjsko dobo.",
  },
];

export default function Namakanje() {
  return (
    <ServiceDetailLayout
      title="Avtomatizirani namakalni sistemi"
      subtitle="Optimalna in varčna rešitev za zdrave in bujne zelene površine."
      media={videos.services.namakalni}
      type="video"
    >
      {/* INTRO */}
      <div className={styles.intro}>
        <h2>Popoln nadzor nad zalivanjem</h2>
        <p>
          Načrtujemo in vgrajujemo napredne namakalne sisteme, prilagojene
          vašemu vrtu. Zagotavljamo optimalno porazdelitev vode, zmanjšanje
          porabe in dolgoročno zdravje rastlin.
        </p>
      </div>

      {/* FEATURE CARDS */}
      <div className={styles.grid}>
        {features.map((item, i) => (
          <motion.div
            key={i}
            className={styles.card}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <div className={styles.number}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </motion.div>
        ))}
      </div>
    </ServiceDetailLayout>
  );
}
