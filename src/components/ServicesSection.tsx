import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";
import styles from "./ServicesSection.module.css";
import { videos, images } from "@/lib/media";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);

type Service = {
  title: string;
  image: string;
  video?: string;
  link: string;
};

const services: Service[] = [
  {
    title: "Zelene površine",
    image: images.services.terasa,
    video: videos.services.zasaditev,
    link: "/services/zelene-povrsine",
  },
  {
    title: "Zemeljska dela",
    image: images.services.terasa,
    video: videos.services.travna_rusa,
    link: "/services/zemeljska-dela",
  },
  {
    title: "Drevesna dela",
    image: images.services.terasa,
    video: videos.services.obrezovanje,
    link: "/services/drevesa",
  },
  {
    title: "Namakalni sistemi",
    image: images.services.terasa,
    video: videos.services.namakalni,
    link: "/services/namakanje",
  },
  {
    title: "Terase in ograje",
    image: images.services.terasa,
    link: "/services/terase",
  },
  {
    title: "Vzdrževanje",
    image: images.services.terasa,
    video: videos.services.trava,
    link: "/services/vzdrzevanje",
  },
];
export default function ServicesSection() {
  return (
    <section className={styles.services}>
      <div className={styles.servicesHeader}>
        <h2>Celostne rešitve za urejanje zunanjih prostorov</h2>
        <p>
          Od idejne zasnove do dovršene izvedbe – ustvarjamo trajne,
          funkcionalne in estetsko usklajene ambiente.
        </p>
      </div>

      <div className={styles.grid}>
        {services.map((service, i) => (
          <ServiceCard key={i} service={service} />
        ))}
      </div>
    </section>
  );
}

/* =========================
   SERVICE CARD
========================= */

function ServiceCard({ service }: { service: Service }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!service.video) return;

    const video = videoRef.current;
    const el = containerRef.current;
    if (!video || !el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!video) return;
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [service.video]);

  return (
    <MotionLink
      to={service.link}
      ref={containerRef}
      className={styles.card}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className={styles.mediaWrapper}>
        {service.video ? (
          <video
            ref={videoRef}
            src={service.video}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            className={styles.media}
          />
        ) : (
          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            decoding="async"
            className={styles.media}
          />
        )}
      </div>

      <div className={styles.overlay} />

      <div className={styles.cardContent}>
        <h3>{service.title}</h3>
        <span className={styles.link}>Preberi več →</span>
      </div>
    </MotionLink>
  );
}
