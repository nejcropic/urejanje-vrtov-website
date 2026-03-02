import PageHero from "../components/PageHero";
import { videos } from "@/lib/media";
import { useTranslation } from "react-i18next";
import ServicesCategoriesGrid from "../components/ServicesCategoriesGrid";
import { motion } from "motion/react";

export default function Services() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        title={t("nav.services.main")}
        subtitle={t("page_hero.services")}
        media={videos.services.obrezovanje}
        type="video"
        breadcrumb={[
          { label: t("nav.home"), to: "/" },
          { label: t("nav.services.main") },
        ]}
      />
      <ServicesCategoriesGrid />
    </>
  );
}

type Props = {
  features: any[];
  styles: any;
};

export function ServicesCard({ features, styles }: Props) {
  return (
    <>
      {features.map((item, i) => (
        <motion.div
          key={i}
          className={styles.card}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
        >
          {item.image && (
            <div className={styles.cardImage}>
              <img src={item.image} alt={item.imageAlt || item.title} />
            </div>
          )}

          <div className={styles.cardContent}>
            <div className={styles.number}>
              {String(i + 1).padStart(2, "0")}
            </div>

            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </motion.div>
      ))}
    </>
  );
}
