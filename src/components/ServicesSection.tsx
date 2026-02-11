import styles from "./ServicesSection.module.css";

import heroImg from "../assets/terasa.jpg";
import heroVideo from "../assets/tepih_video.mp4";
import heroVideo2 from "../assets/namakalni_video.mp4";
import heroTrava from "../assets/trava.jpg";

const services = [
  {
    title: "Terase & tlaki",
    text: "Elegantni in trajni zunanji prostori.",
    media: heroImg,
    type: "image",
  },
  {
    title: "Namakalni sistemi",
    text: "Pametno zalivanje brez skrbi.",
    media: heroVideo2,
    type: "video",
  },
  {
    title: "Travna ruša",
    text: "Popolna zelena površina v enem dnevu.",
    media: heroVideo,
    type: "video",
  },
  {
    title: "Zemeljska dela",
    text: "Priprava terena za brezhibno izvedbo.",
    media: heroTrava,
    type: "image",
  },
];

export default function ServicesSection() {
  return (
    <section className={styles.services}>
      <div className={styles.header}>
        <h2>Naše ključne storitve</h2>
        <p>Izpostavljamo storitve, kjer ustvarjamo največjo dodano vrednost.</p>
      </div>

      <div className={styles.grid}>
        {services.map((service, i) => (
          <a key={i} href="/storitve" className={styles.card}>
            {service.type === "video" ? (
              <video
                src={service.media}
                autoPlay
                muted
                loop
                playsInline
                className={styles.media}
              />
            ) : (
              <div
                className={styles.media}
                style={{ backgroundImage: `url(${service.media})` }}
              />
            )}

            <div className={styles.overlay} />

            <div className={styles.content}>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
