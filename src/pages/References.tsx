import PageHero from "../components/PageHero";
import { videos } from "@/lib/media";
import { useTranslation } from "react-i18next";
import ReferencesMain from "../components/ReferencesMain";

export default function Projects() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        title={t("nav.references")}
        subtitle={t("page_hero.references")}
        media={videos.services.obrezovanje}
        type="video"
        breadcrumb={[
          { label: t("nav.home"), to: "/" },
          { label: t("nav.references") },
        ]}
      />
      <ReferencesMain />
    </>
  );
}
