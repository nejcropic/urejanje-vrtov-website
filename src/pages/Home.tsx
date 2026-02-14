import FinalCTA from "../components/FinalCTA";
import Hero from "../components/Hero";
import ProcessTimeline from "../components/ProcessTimeline";
import ProjectsSection from "../components/ProjectsSection";
import ReviewsSection from "../components/ReviewsSection";
import ServicesSection from "../components/ServicesSection";
import StudioSection from "../components/StudioSection";
import TrustBar from "../components/TrustBar";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <StudioSection />
      <ServicesSection />
      <ProcessTimeline variant="compact" />
      <ProjectsSection />
      <ReviewsSection />
      <FinalCTA />
    </>
  );
}
