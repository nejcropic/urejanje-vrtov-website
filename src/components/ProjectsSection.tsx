import { motion, useInView } from "motion/react";
import { useRef } from "react";

import styles from "./ProjectsSection.module.css";
import projekt1 from "../assets/terasa.webp";
import projekt2 from "../assets/trava.webp";

const projects = [
  {
    image: projekt1,
    title: "Moderna terasa z naravnim kamnom",
    location: "Ljubljana",
    year: "2024",
    service: "Terase in tlakovanje",
  },
  {
    image: projekt2,
    title: "Celostna ureditev vrta",
    location: "Gorenjska",
    year: "2023",
    service: "Zasaditve in travne površine",
  },
];

export default function ProjectsSection() {
  return (
    <section className={styles.projects}>
      <div className={styles.header}>
        <span className={styles.badge}>Naši projekti</span>
        <h2>
          Izbrana <span>dela</span>
        </h2>
      </div>

      <div className={styles.grid}>
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.7 });

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  return (
    <motion.div
      ref={ref}
      className={styles.card}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.9,
        delay: index * 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={!isMobile ? "hover" : undefined}
    >
      <img src={project.image} alt={project.title} />

      <motion.div
        className={styles.hoverOverlay}
        initial={{ opacity: 0 }}
        animate={
          isMobile ? (isInView ? { opacity: 1 } : { opacity: 0 }) : undefined
        }
        variants={{
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className={styles.overlayContent}
          initial={{ y: 40, opacity: 0 }}
          animate={
            isMobile
              ? isInView
                ? { y: 0, opacity: 1 }
                : { y: 40, opacity: 0 }
              : undefined
          }
          variants={{
            hover: { y: 0, opacity: 1 },
          }}
          transition={{ duration: 0.5 }}
        >
          <h3>{project.title}</h3>
          <p>{project.location}</p>

          <div className={styles.meta}>
            <span>{project.service}</span>
            <span>{project.year}</span>
          </div>

          <div className={styles.arrow}>→</div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
