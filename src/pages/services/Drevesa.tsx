import ServiceDetailLayout from "../../components/ServiceDetailLayout";
import styles from "../../components/ServiceDetail.module.css";
import { videos, images } from "@/lib/media";
import { ServicesCard } from "../Services";

const features = [
  {
    title: "Obrezovanje",
    text: "Strokovno obrezovanje živih mej, sadnega drevja in okrasnih dreves.",
    image: images.storitve_1.img_1,
    imageAlt: "Obrezovanje drevesa",
  },
  {
    title: "Višinsko obžagovanje",
    text: "Varno izvajanje višinskih posekov na zahtevnih lokacijah.",
    image: images.storitve_1.img_2,
  },
  {
    title: "Posek dreves",
    text: "Varno izvajanje višinskih posekov na zahtevnih lokacijah.",
    image: images.storitve_1.img_3,
  },
];

export default function Drevesa() {
  return (
    <ServiceDetailLayout
      title="Drevesna dela"
      subtitle="Zdravje, varnost in estetska urejenost dreves."
      media={videos.services.obrezovanje}
      type="video"
    >
      <div className={styles.intro}>
        <h2>Strokovna skrb za drevesa</h2>
        <p>
          Zagotavljamo varno in strokovno izvedbo vseh posegov na drevesih,
          prilagojeno posamezni situaciji.
        </p>
      </div>

      <div className={styles.grid}>
        <ServicesCard features={features} styles={styles} />
      </div>
    </ServiceDetailLayout>
  );
}
