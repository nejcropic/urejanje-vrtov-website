import { motion } from "motion/react";
import ServiceDetailLayout from "../../components/ServiceDetailLayout";
import styles from "../../components/ServiceDetail.module.css";
import { videos } from "@/lib/media";

const features = [
  {
    title: "Mini bager",
    text: "Izvajamo izkope, planiranje površin in pripravo terena z mini bagrom.",
  },
  {
    title: "Izkop rastlin in korenin",
    text: "Strokovno odstranjevanje rastlin in korenin z minimalnim posegom v okolico.",
  },
];

export default function ZemeljskaDela() {
  return (
    <ServiceDetailLayout
      title="Zemeljska dela"
      subtitle="Natančna priprava terena kot temelj kakovostne izvedbe."
      media={videos.services.travna_rusa}
      type="video"
    >
      <div className={styles.intro}>
        <h2>Priprava, ki naredi razliko</h2>
        <p>
          Kakovostna priprava terena je ključ do trajnih in stabilnih rešitev
          pri urejanju zunanjih površin.
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
