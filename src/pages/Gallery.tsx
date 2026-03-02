import PageHero from "../components/PageHero";
import { videos } from "@/lib/media";
import { useTranslation } from "react-i18next";
import GalleryMain from "../components/GalleryMain";

export default function Gallery() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        title={t("nav.gallery")}
        subtitle={t("page_hero.gallery")}
        media={videos.services.obrezovanje}
        type="video"
        breadcrumb={[
          { label: t("nav.home"), to: "/" },
          { label: t("nav.gallery") },
        ]}
      />
      <GalleryMain />
    </>
  );
}
