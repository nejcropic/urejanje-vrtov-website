import { motion } from "motion/react";
import ServiceDetailLayout from "../../components/ServiceDetailLayout";
import styles from "../../components/ServiceDetail.module.css";
import { videos } from "@/lib/media";

const features = [
  {
    title: "Obrezovanje",
    text: "Strokovno obrezovanje živih mej, sadnega drevja in okrasnih dreves.",
  },
  {
    title: "Višinski posek",
    text: "Varno izvajanje višinskih posekov na zahtevnih lokacijah.",
  },
];

export default function Drevesa() {
  return (
    <ServiceDetailLayout
      title="Drevesna dela"
      subtitle="Zdravje, varnost in estetska urejenost dreves."
      media={videos.services.obrezovanje}
      type="video"
    >
      <div className={styles.intro}>
        <h2>Strokovna skrb za drevesa</h2>
        <p>
          Zagotavljamo varno in strokovno izvedbo vseh posegov na drevesih,
          prilagojeno posamezni situaciji.
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
