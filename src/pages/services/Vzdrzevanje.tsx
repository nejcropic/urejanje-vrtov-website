import { motion } from "motion/react";
import ServiceDetailLayout from "../../components/ServiceDetailLayout";
import styles from "../../components/ServiceDetail.module.css";
import { videos, images } from "@/lib/media";
import { ServicesCard } from "../Services";

const features = [
  {
    title: "Redno vzdrževanje",
    text: "Košnja, obrezovanje in nega rastlin za dolgoročno urejen vrt.",
    image: images.storitve_4.img_1,
  },
  {
    title: "Sezonska oskrba",
    text: "Prilagojena skrb skozi vse letne čase.",
    image: images.storitve_4.img_2,
  },
  {
    title: "Dolgotrajna kondicija vrta",
    text: "Sistematičen pristop za zdravo rast in urejen videz.",
    image: images.storitve_4.img_3,
  },
];

export default function Vzdrzevanje() {
  return (
    <ServiceDetailLayout
      title="Vzdrževanje vrtov"
      subtitle="Dolgotrajna urejenost in zdravje vašega vrta."
      media={videos.services.trava}
      type="video"
    >
      <div className={styles.intro}>
        <h2>Vrt v odlični kondiciji skozi vse leto</h2>
        <p>
          Z rednim vzdrževanjem zagotavljamo dolgoročno urejenost in zdrav
          razvoj zelenih površin.
        </p>
      </div>

      <div className={styles.grid}>
        <ServicesCard features={features} styles={styles} />
      </div>
    </ServiceDetailLayout>
  );
}
