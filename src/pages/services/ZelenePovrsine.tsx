import { motion } from "motion/react";
import ServiceDetailLayout from "../../components/ServiceDetailLayout";
import styles from "../../components/ServiceDetail.module.css";
import { videos, images } from "@/lib/media";
import { ServicesCard } from "../Services";

const features = [
  {
    title: "Zasaditev",
    text: "Svetujemo in izvedemo zasaditev okrasnih rastlin, dreves, grmovnic ter živih mej.",
    image: images.storitve_5.img_1,
  },
  {
    title: "Travni tepih",
    text: "Polaganje naravne travne ruše z ustrezno pripravo podlage za takojšnjo zeleno površino.",
    image: images.storitve_5.img_2,
  },
  {
    title: "Umetna trava",
    text: "Celotna izvedba umetne trave – od izbire do končne montaže.",
    image: images.storitve_5.img_3,
  },
  {
    title: "Visoke grede",
    text: "Izdelava in postavitev visokih gred po meri vašega prostora.",
    image: images.storitve_5.img_4,
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
        <ServicesCard features={features} styles={styles} />
      </div>
    </ServiceDetailLayout>
  );
}
