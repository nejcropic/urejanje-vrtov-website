import { motion } from "motion/react";
import styles from "./AboutSection.module.css";
import { CheckCircle, Leaf, Hammer, ShieldCheck } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function AboutSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* INTRO */}
        <motion.div
          className={styles.intro}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
        >
          <h2>Celostno urejanje vrtov in zunanjih površin</h2>
          <p>
            Smo podjetje, specializirano za strokovno in estetsko dovršeno
            urejanje vrtov. Združujemo znanje, izkušnje in občutek za prostor,
            da ustvarimo funkcionalna okolja, prilagojena vašim željam.
            Poskrbimo za celoten proces – od načrtovanja do kakovostne izvedbe.
          </p>
        </motion.div>

        {/* VALUE GRID */}
        <div className={styles.grid}>
          {[
            {
              icon: <Leaf size={32} />,
              title: "Strokovna zasaditev",
              text: "Izvajamo zasaditve, polaganje travne ruše in umetne trave ter poskrbimo za zdrav in estetski videz zelenih površin.",
            },
            {
              icon: <Hammer size={32} />,
              title: "Zemeljska dela",
              text: "Z mini bagrom izvajamo pripravo terena, izkope in planiranje površin za popolno pripravo vašega vrta.",
            },
            {
              icon: <ShieldCheck size={32} />,
              title: "Zanesljivost",
              text: "Vsak projekt obravnavamo individualno, z jasno komunikacijo, natančnostjo in spoštovanjem rokov.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className={styles.card}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i + 1}
            >
              <div className={styles.icon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* ADVANTAGES */}
        <motion.div
          className={styles.advantages}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={4}
          variants={fadeUp}
        >
          <h3>Zakaj izbrati nas?</h3>
          <ul>
            <li>
              <CheckCircle size={18} /> Individualni pristop
            </li>
            <li>
              <CheckCircle size={18} /> Celovita izvedba projekta
            </li>
            <li>
              <CheckCircle size={18} /> Kakovostni materiali
            </li>
            <li>
              <CheckCircle size={18} /> Natančnost in profesionalnost
            </li>
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3>Ustvarimo vrt, kjer se boste dobro počutili</h3>
          <p>Kontaktirajte nas za svetovanje in ponudbo po meri.</p>
          <a href="/urejanje-vrtov-website/contact" className={styles.button}>
            Pošlji povpraševanje
          </a>
        </motion.div>
      </div>
    </section>
  );
}
