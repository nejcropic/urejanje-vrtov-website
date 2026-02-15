import PageHero from "@/components/PageHero";
import ProcessTimeline from "@/components/ProcessTimeline";
import styles from "./ServiceDetail.module.css";
import { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  media: string;
  type: "video" | "image";
  children: ReactNode;
};

export default function ServiceDetailLayout({
  title,
  subtitle,
  media,
  type,
  children,
}: Props) {
  return (
    <>
      <PageHero
        title={title}
        subtitle={subtitle}
        media={media}
        type={type}
        breadcrumb={[
          { label: "Domov", to: "/" },
          { label: "Storitve", to: "/services" },
          { label: title },
        ]}
      />

      <section className={styles.wrapper}>{children}</section>

      <ProcessTimeline variant="compact" />

      <section className={styles.cta}>
        <h3>Potrebujete strokovno izvedbo?</h3>
        <a href="/contact" className={styles.button}>
          Pošlji povpraševanje
        </a>
      </section>
    </>
  );
}
