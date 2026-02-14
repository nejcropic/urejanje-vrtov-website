import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import styles from "./StudioSection.module.css";
import slika_levo from "../assets/obrezovanje.webp";
import slika_desno from "../assets/tepih_2.webp";

export default function StudioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const isInView = useInView(sectionRef, { once: true, margin: "-120px" });

  /* =========================
     1) Typing line (char-by-char)
  ========================== */
  const fullText = "ki trajajo";
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!isInView) return;

    let i = 0;
    let timeoutId: number;

    setTyped("");

    const startDelay = 900;

    const startTyping = () => {
      const type = () => {
        i++;
        setTyped(fullText.slice(0, i));

        if (i < fullText.length) {
          // natural human rhythm
          const randomSpeed = 40 + Math.random() * 60;
          timeoutId = window.setTimeout(type, randomSpeed);
        }
      };

      type();
    };

    timeoutId = window.setTimeout(startTyping, startDelay);

    return () => window.clearTimeout(timeoutId);
  }, [isInView]);

  /* =========================
     2) Entry animations
  ========================== */
  const container = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: 0.16,
          delayChildren: 0.15,
        },
      },
    }),
    [],
  );

  const fadeUp = useMemo(
    () => ({
      hidden: { opacity: 0, y: 34, filter: "blur(6px)" },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
      },
    }),
    [],
  );

  /* =========================
     3) Parallax depth with perspective (mouse tilt)
  ========================== */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(my, { stiffness: 120, damping: 18, mass: 0.25 });
  const rotateY = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.25 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;

      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width; // 0..1
      const py = (e.clientY - r.top) / r.height; // 0..1

      // map to subtle tilt
      const y = (px - 0.5) * 10; // rotateY
      const x = -(py - 0.5) * 8; // rotateX

      mx.set(y);
      my.set(x);
    };

    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [mx, my]);

  /* keep your subtle scroll parallax */
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

  /* =========================
     4) Magnetic button
  ========================== */
  const bx = useMotionValue(0);
  const by = useMotionValue(0);
  const bxs = useSpring(bx, { stiffness: 220, damping: 18, mass: 0.2 });
  const bys = useSpring(by, { stiffness: 220, damping: 18, mass: 0.2 });

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const strength = 14;

    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      bx.set((dx / (r.width / 2)) * strength);
      by.set((dy / (r.height / 2)) * strength);
    };

    const onLeave = () => {
      bx.set(0);
      by.set(0);
    };

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, [bx, by]);

  return (
    <section className={styles.studio}>
      {/* grain overlay */}
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.wrapper} ref={sectionRef}>
        {/* LEFT IMAGE (scale reveal + depth tilt) */}
        <motion.div
          ref={leftRef}
          className={styles.imageLeft}
          initial={{ opacity: 0, x: -90, scale: 0.92 }}
          animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          style={{
            transformStyle: "preserve-3d",
            rotateX,
            rotateY,
          }}
        >
          <motion.img
            src={slika_levo}
            alt="Obrezovanje"
            className={styles.media}
            initial={{ scale: 1.06 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
        </motion.div>

        {/* CENTER CONTENT (fade-up stagger + typing + gradient) */}
        <motion.div
          className={styles.content}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <motion.span className={styles.badge} variants={fadeUp}>
            Krajinska arhitektura & izvedba
          </motion.span>

          <motion.h2 variants={fadeUp}>
            Oblikujemo prostore,
            <br />
            <span className={`${styles.typing} ${styles.gradientText}`}>
              {typed}
              <motion.span
                className={styles.cursor}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "easeInOut",
                }}
              />
            </span>
          </motion.h2>

          <motion.div className={styles.line} variants={fadeUp} />

          <motion.p variants={fadeUp}>
            Vsak projekt začnemo z razumevanjem prostora. S premišljenim
            načrtovanjem, natančno pripravo terena in dovršeno izvedbo
            ustvarjamo zunanje ambiente, kjer se funkcionalnost in estetika
            združita v ravnovesje.
          </motion.p>

          <motion.a
            ref={buttonRef}
            href="/o-nas"
            className={styles.button}
            variants={fadeUp}
            style={{ x: bxs, y: bys }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Spoznajte naš pristop
          </motion.a>
        </motion.div>

        {/* RIGHT IMAGE (scale reveal + depth tilt) */}
        <motion.div
          ref={rightRef}
          className={styles.imageRight}
          initial={{ opacity: 0, x: 90, scale: 0.92 }}
          animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          style={{
            transformStyle: "preserve-3d",
            rotateX,
            rotateY,
          }}
        >
          <motion.img
            src={slika_desno}
            alt="Travnati tepih"
            className={styles.media}
            initial={{ scale: 1.06 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
