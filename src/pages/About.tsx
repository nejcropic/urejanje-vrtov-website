import PageHero from "../components/PageHero";
import contactVideo from "../assets/obrezovanje.mp4";
import { useTranslation } from "react-i18next";
import AboutSection from "../components/AboutSection";
import ProcessTimeline from "../components/ProcessTimeline";

export default function About() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        title={t("nav.about")}
        subtitle={t("page_hero.about")}
        media={contactVideo}
        type="video"
        breadcrumb={[
          { label: t("nav.home"), to: "/" },
          { label: t("nav.about") },
        ]}
      />
      <AboutSection />
      <ProcessTimeline variant="full" />
    </>
  );
}
