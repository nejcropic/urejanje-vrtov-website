import Hero from "../components/Hero";
import ProjectsSection from "../components/ProjectsSection";
import ReviewsSection from "../components/ReviewsSection";
import ServicesSection from "../components/ServicesSection";
import StudioSection from "../components/StudioSection";

export default function Home() {
  return (
    <>
      <Hero />
      <StudioSection />
      <ServicesSection />
      <ProjectsSection />
      <ReviewsSection />
    </>
  );
}
