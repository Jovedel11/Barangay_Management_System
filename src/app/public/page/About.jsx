import React from "react";
import AboutHero from "../components/about/AboutHero";
import AboutMission from "../components/about/AboutMission";
import AboutStats from "../components/about/AboutStats";
import AboutTeam from "../components/about/AboutTeam";
import AboutValues from "../components/about/AboutValues";
import FAQSection from "../components/about/FAQSection.jsx";

const About = () => {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <div>
        <AboutMission />
        <AboutStats />
        <AboutValues />
        <AboutTeam />
        <FAQSection />
      </div>
    </div>
  );
};

export default About;
