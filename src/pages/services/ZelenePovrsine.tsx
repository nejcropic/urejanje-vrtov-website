import { motion } from "motion/react";
import ServiceDetailLayout from "../../components/ServiceDetailLayout";
import styles from "../../components/ServiceDetail.module.css";
import { videos } from "@/lib/media";

const features = [
  {
    title: "Zasaditev",
    text: "Svetujemo in izvedemo zasaditev okrasnih rastlin, dreves, grmovnic ter živih mej.",
  },
  {
    title: "Travni tepih",
    text: "Polaganje naravne travne ruše z ustrezno pripravo podlage za takojšnjo zeleno površino.",
  },
  {
    title: "Umetna trava",
    text: "Celotna izvedba umetne trave – od izbire do končne montaže.",
  },
  {
    title: "Visoke grede",
    text: "Izdelava in postavitev visokih gred po meri vašega prostora.",
  },
];

export default function ZelenePovrsine() {
  return (
    <ServiceDetailLayout
      title="Zelene površine in zasaditve"
      subtitle="Estetsko dovršene in funkcionalne zelene rešitve za vsak vrt."
      media={videos.services.zasaditev}
      type="video"
    >
      <div className={styles.intro}>
        <h2>Vrt, ki zaživi</h2>
        <p>
          Ustvarjamo zelene površine, ki so estetsko usklajene, trajne in
          prilagojene vašim željam ter pogojem prostora.
        </p>
      </div>

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
