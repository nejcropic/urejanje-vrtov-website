import PageHero from "../components/PageHero";
import { videos } from "@/lib/media";
import { useTranslation } from "react-i18next";
import ContactSection from "../components/ContactSection";

export default function Contact() {
  const { t } = useTranslation();
  return (
    <>
      <PageHero
        title={t("nav.contact")}
        subtitle={t("page_hero.contact")}
        media={videos.services.obrezovanje}
        type="video"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />
      <ContactSection />
    </>
  );
}
