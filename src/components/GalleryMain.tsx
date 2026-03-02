import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import styles from "./GalleryMain.module.css";
import { useTranslation } from "react-i18next";

type GalleryType = Record<string, string[]>;

export default function GalleryMain() {
  const { t } = useTranslation();

  const [gallery, setGallery] = useState<GalleryType>({});
  const [active, setActive] = useState("all");
  const [loading, setLoading] = useState(true);

  // 🔹 FETCH API HERE
  useEffect(() => {
    fetch("/api/gallery.php")
      .then((res) => res.json())
      .then((data) => {
        setGallery(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 🔹 Filters
  const filters = useMemo(() => ["all", ...Object.keys(gallery)], [gallery]);

  // 🔹 Images for active filter
  const images = useMemo(() => {
    if (active === "all") {
      return Object.values(gallery).flat();
    }
    return gallery[active] || [];
  }, [active, gallery]);

  if (loading) {
    return <section className={styles.projects}>Loading...</section>;
  }

  return (
    <section className={styles.projects}>
      <div className={styles.intro}>
        <span className={styles.badge}>{t("gallery.title")}</span>
        <h2>
          {t("gallery.heading")} <span>{t("gallery.highlight")}</span>
        </h2>
        <p>{t("gallery.description")}</p>
      </div>

      <div className={styles.filters}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={active === f ? styles.active : ""}
          >
            {t(`gallery.${f}`)}
          </button>
        ))}
      </div>

      <motion.div layout className={styles.grid}>
        {images.map((img) => (
          <motion.div
            key={img}
            layout
            className={styles.card}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={img}
              alt={generateAlt(img)}
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// 🔹 SEO alt generator
function generateAlt(path: string) {
  const fileName =
    path
      .split("/")
      .pop()
      ?.replace(/\.[^/.]+$/, "") || "";
  return fileName.replace(/[-_]/g, " ");
}
