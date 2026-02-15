import { motion } from "motion/react";
import { useMemo, useState, memo } from "react";
import { Link } from "react-router-dom";
import styles from "./ReferencesMain.module.css";
import { images } from "@/lib/media";

type Project = {
  id: string;
  image: string;
  title: string;
  location: string;
  year: string;
  service: string;
};

const allProjects: Project[] = [
  {
    id: "1",
    image: images.reference.ref1,
    title: "Moderna terasa z naravnim kamnom",
    location: "Ljubljana",
    year: "2024",
    service: "Terase",
  },
  {
    id: "2",
    image: images.reference.ref2,
    title: "Celostna ureditev vrta",
    location: "Gorenjska",
    year: "2023",
    service: "Zasaditve",
  },
  {
    id: "3",
    image: images.reference.ref3,
    title: "Avtomatski namakalni sistem",
    location: "Primorska",
    year: "2024",
    service: "Namakanje",
  },
];

const filters = ["Vse", "Terase", "Zasaditve", "Namakanje"];

export default function ReferencesMain() {
  const [active, setActive] = useState("Vse");

  const filtered = useMemo(() => {
    if (active === "Vse") return allProjects;
    return allProjects.filter((p) => p.service === active);
  }, [active]);

  return (
    <section className={styles.projects}>
      <div className={styles.intro}>
        <span className={styles.badge}>Reference</span>
        <h2>
          Projekti, ki <span>ustvarjajo razliko</span>
        </h2>
        <p>
          Vsak projekt je rezultat premišljenega načrtovanja in tehnične
          natančnosti.
        </p>
      </div>

      <div className={styles.filters}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={active === f ? styles.active : ""}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.div layout className={styles.grid}>
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>

      <div className={styles.cta}>
        <h3>Imate podoben projekt v mislih?</h3>
        <Link to="/contact" className={styles.button}>
          Stopite v stik
        </Link>
      </div>
    </section>
  );
}

/* =========================
   MEMO CARD
========================= */

const ProjectCard = memo(function ProjectCard({
  project,
}: {
  project: Project;
}) {
  return (
    <motion.div
      layout
      className={styles.card}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        decoding="async"
      />

      <div className={styles.cardContent}>
        <div className={styles.cardInner}>
          <h3 className={styles.cardTitle}>{project.title}</h3>

          <div className={styles.cardBottom}>
            <span className={styles.cardLocation}>{project.location}</span>

            <div className={styles.cardMeta}>
              <span>{project.service}</span>
              <span>{project.year}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
