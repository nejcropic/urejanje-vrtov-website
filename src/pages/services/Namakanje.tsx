import { motion } from "motion/react";
import ServiceDetailLayout from "../../components/ServiceDetailLayout";
import styles from "../../components/ServiceDetail.module.css";
import { videos, images } from "@/lib/media";
import { ServicesCard } from "../Services";

const features = [
  {
    title: "Projektiranje sistema",
    text: "Analiza terena in optimalna razporeditev škropilcev ter kapljičnih linij.",
    image: images.storitve_2.img_1,
  },
  {
    title: "Pametna avtomatika",
    text: "Programabilni sistemi in senzorji vlage za varčno porabo vode.",
    image: images.storitve_2.img_2,
  },
  {
    title: "Podzemna napeljava",
    text: "Diskretna izvedba brez motenja estetike vrta.",
    image: images.storitve_2.img_3,
  },
  {
    title: "Sezonska optimizacija",
    text: "Prilagoditev delovanja sistema glede na vremenske razmere.",
    image: images.storitve_2.img_4,
  },
  {
    title: "Vzdrževanje sistema",
    text: "Redni pregledi in priprava sistema na sezono.",
    image: images.storitve_2.img_5,
  },
  {
    title: "Dolgotrajna rešitev",
    text: "Kakovostni materiali za zanesljivo in dolgo življenjsko dobo.",
    image: images.storitve_2.img_6,
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
        <ServicesCard features={features} styles={styles} />
      </div>
    </ServiceDetailLayout>
  );
}
