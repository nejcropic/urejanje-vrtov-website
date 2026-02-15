import { motion } from "motion/react";
import ServiceDetailLayout from "../../components/ServiceDetailLayout";
import styles from "../../components/ServiceDetail.module.css";
import { videos } from "@/lib/media";

const features = [
  {
    title: "Redno vzdrževanje",
    text: "Košnja, obrezovanje in nega rastlin za dolgoročno urejen vrt.",
  },
  {
    title: "Sezonska oskrba",
    text: "Prilagojena skrb skozi vse letne čase.",
  },
  {
    title: "Dolgotrajna kondicija vrta",
    text: "Sistematičen pristop za zdravo rast in urejen videz.",
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
