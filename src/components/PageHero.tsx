import { motion } from "motion/react";
import { Link } from "react-router-dom";
import styles from "./PageHero.module.css";

type PageHero = {
  title: string;
  subtitle?: string;
  media: string;
  type?: "image" | "video";
  breadcrumb?: { label: string; to?: string }[];
};

export default function PageHero({
  title,
  subtitle,
  media,
  type = "image",
  breadcrumb,
}: PageHero) {
  return (
    <section className={styles.pagehero}>
      {/* Background */}
      {type === "video" ? (
        <video
          className={styles.media}
          src={media}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <img src={media} alt={title} className={styles.media} loading="eager" />
      )}

      <div className={styles.overlay} />

      {/* Content */}
      <div className={styles.content}>
        {breadcrumb && (
          <div className={styles.breadcrumb}>
            {breadcrumb.map((item, i) => (
              <span key={i}>
                {item.to ? <Link to={item.to}>{item.label}</Link> : item.label}
                {i !== breadcrumb.length - 1 && " / "}
              </span>
            ))}
          </div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          {title}
        </motion.h1>

        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  );
}
