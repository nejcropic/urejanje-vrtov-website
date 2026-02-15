import PageHero from "../components/PageHero";
import { videos } from "@/lib/media";
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
        media={videos.services.obrezovanje}
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
