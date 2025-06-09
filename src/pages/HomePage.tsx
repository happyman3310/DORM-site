import React from "react";
import HeroSection from "../components/HeroSection";
import WhyDormSection from "../components/WhyDormSection";
import MissionSection from "../components/MissionSection";
import RoadmapSection from "../components/RoadmapSection";
import ProductSection from "../components/ProductSection";
import TeamSection from "../components/TeamSection";

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <WhyDormSection />
      <MissionSection />
      <RoadmapSection />
      <ProductSection />
      <TeamSection />
    </>
  );
};

export default HomePage;
