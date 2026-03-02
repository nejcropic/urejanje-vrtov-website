import { motion } from "motion/react";
import ServiceDetailLayout from "../../components/ServiceDetailLayout";
import styles from "../../components/ServiceDetail.module.css";
import { videos } from "@/lib/media";
import { ServicesCard } from "../Services";

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

export default function Terase() {
  return (
    <ServiceDetailLayout
      title="Terase"
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
        <ServicesCard features={features} styles={styles} />
      </div>
    </ServiceDetailLayout>
  );
}
