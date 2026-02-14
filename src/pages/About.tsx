import PageHero from "../components/PageHero";
import contactVideo from "../assets/obrezovanje.mp4";
import { useTranslation } from "react-i18next";
import ContactSection from "../components/ContactSection";

export default function About() {
  const { t } = useTranslation();
  return (
    <>
      <PageHero
        title={t("nav.about")}
        subtitle={t("page_hero.about")}
        media={contactVideo}
        type="video"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />
      <ContactSection />
    </>
  );
}
