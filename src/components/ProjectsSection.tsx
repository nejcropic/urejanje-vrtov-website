import { motion } from "motion/react";
import styles from "./ProjectsSection.module.css";
import { images } from "@/lib/media";

const projects = [
  {
    image: images.services.terasa,
    title: "Moderna terasa z naravnim kamnom",
    location: "Ljubljana",
    year: "2024",
    service: "Terase in tlakovanje",
  },
  {
    image: images.reference.ref2,
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
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        decoding="async"
        className={styles.image}
      />

      <div className={styles.overlay}>
        <div className={styles.overlayContent}>
          <h3>{project.title}</h3>
          <p>{project.location}</p>

          <div className={styles.meta}>
            <span>{project.service}</span>
            <span>{project.year}</span>
          </div>

          <div className={styles.arrow}>→</div>
        </div>
      </div>
    </motion.div>
  );
}
