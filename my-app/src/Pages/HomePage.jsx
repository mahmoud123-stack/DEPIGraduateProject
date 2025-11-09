import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import HeroSection from "../Components/HeroSection/HeroSection";
import Features from "../Components/Features/Features";
import AboutUs from "../Components/AboutUs/AboutUs";
import HowItWorks from "../Components/HowItWorks/HowItWorks";
import { Link } from "react-router-dom";
import "../index.css";
export default function HomePage() {
  return (
    <div className="HomePage">
      <HeroSection />
      <AboutUs />
      <Features />
      <HowItWorks />
    </div>
  );
}
