import { useEffect, useRef } from "react";
import styles from "./StudioSection.module.css";
import slika_levo from "../assets/obrezovanje.webp";
import slika_desno from "../assets/tepih_2.webp";

export default function StudioSection() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  // subtle parallax
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 1024) return;

      const offset = window.scrollY * 0.05;

      if (leftRef.current)
        leftRef.current.style.transform = `translateY(${offset}px)`;

      if (rightRef.current)
        rightRef.current.style.transform = `translateY(${-offset}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.studio}>
      <div className={styles.wrapper}>
        {/* LEFT */}
        <div ref={leftRef} className={styles.imageLeft}>
          <img src={slika_levo} alt="Obrezovanje" />
        </div>

        {/* CENTER */}
        <div className={styles.content}>
          <span className={styles.badge}>Krajinska arhitektura & izvedba</span>

          <h2>
            Oblikujemo prostore,
            <br />
            <span>ki trajajo</span>
          </h2>

          <div className={styles.line} />

          <p>
            Vsak projekt začnemo z razumevanjem prostora. S premišljenim
            načrtovanjem, natančno pripravo terena in dovršeno izvedbo
            ustvarjamo zunanje ambiente, kjer se funkcionalnost in estetika
            združita v ravnovesje.
          </p>

          <a href="/o-nas" className={styles.button}>
            Spoznajte naš pristop
          </a>
        </div>

        {/* RIGHT */}
        <div ref={rightRef} className={styles.imageRight}>
          <img src={slika_desno} alt="Travnati tepih" />
        </div>
      </div>
    </section>
  );
}
