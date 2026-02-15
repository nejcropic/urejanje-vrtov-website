import PageHero from "../components/PageHero";
import { videos } from "@/lib/media";
import { useTranslation } from "react-i18next";
import ServicesCategoriesGrid from "../components/ServicesCategoriesGrid";

export default function Services() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        title={t("nav.services.main")}
        subtitle={t("page_hero.services")}
        media={videos.services.obrezovanje}
        type="video"
        breadcrumb={[
          { label: t("nav.home"), to: "/" },
          { label: t("nav.services.main") },
        ]}
      />
      <ServicesCategoriesGrid />
    </>
  );
}
