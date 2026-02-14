import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import styles from "./ProcessTimeline.module.css";

type Variant = "full" | "compact";

type Props = {
  variant?: Variant;
  title?: string;
};

const stepsFull = [
  {
    title: "Povpraševanje",
    text: "Kontaktirate nas in predstavite svoje želje ter potrebe.",
  },
  {
    title: "Ogled in svetovanje",
    text: "Na terenu analiziramo prostor in predlagamo optimalne rešitve.",
  },
  {
    title: "Načrt in ponudba",
    text: "Pripravimo jasen načrt izvedbe in transparentno ponudbo.",
  },
  {
    title: "Izvedba",
    text: "Projekt izvedemo strokovno, natančno in v dogovorjenem roku.",
  },
  {
    title: "Predaja in vzdrževanje",
    text: "Zaključimo projekt in po potrebi poskrbimo za nadaljnje vzdrževanje.",
  },
];

const stepsCompact = [
  {
    title: "Svetovanje",
    text: "Skupaj definiramo cilje in želje.",
  },
  {
    title: "Načrt",
    text: "Pripravimo rešitev po meri.",
  },
  {
    title: "Izvedba",
    text: "Strokovna in natančna realizacija.",
  },
  {
    title: "Vzdrževanje",
    text: "Dolgoročna skrb za vaš vrt.",
  },
];

export default function ProcessTimeline({
  variant = "full",
  title = "Kako poteka projekt",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = variant === "compact" ? stepsCompact : stepsFull;

  return (
    <section
      ref={ref}
      className={`${styles.section} ${
        variant === "compact" ? styles.compact : ""
      }`}
    >
      <div className={styles.container}>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>

        <div className={styles.timeline}>
          {/* Static vertical line */}
          <div className={styles.line} />

          {/* Animated progress line */}
          <motion.div
            className={styles.progress}
            style={{ height: progressHeight }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              className={styles.step}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className={styles.number}>
                {String(i + 1).padStart(2, "0")}
              </div>

              <div className={styles.dot} />

              <div className={styles.content}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
