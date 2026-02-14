import PageHero from "../components/PageHero";
import contactVideo from "../assets/obrezovanje.mp4";
import { useTranslation } from "react-i18next";
import ContactSection from "../components/ContactSection";

export default function Contact() {
  const { t } = useTranslation();
  return (
    <>
      <PageHero
        title={t("nav.contact")}
        subtitle={t("page_hero.contact")}
        media={contactVideo}
        type="video"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />
      <ContactSection />
    </>
  );
}
