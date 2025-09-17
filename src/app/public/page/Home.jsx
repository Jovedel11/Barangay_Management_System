import React from "react";
import HeroSection from "../components/home/HeroSection";
import AboutOverview from "../components/home/AboutOverview";
import Features from "../components/home/Features";
import HowItWorks from "../components/home/HowItWorks";
import Benefits from "../components/home/Benefits";
import CallToAction from "../components/home/CallToAction";

const Home = () => {
  return (
    <div className="relative">
      <HeroSection />
      <div>
        <AboutOverview />
        <Features />
        <HowItWorks />
        <Benefits />
        <CallToAction />
      </div>
    </div>
  );
};

export default Home;
