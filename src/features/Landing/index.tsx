"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "./Hero";
import ScrollSection from "@/components/layout/ScrollSection";

// Dynamically split below-the-fold sections into separate chunks with full SSR for SEO
const TechMarquee = dynamic(() => import("./TechMarquee/TechMarquee"));
const About = dynamic(() => import("./About"));
const Services = dynamic(() => import("./Services"));
const Projects = dynamic(() => import("./Projects"));
const Process = dynamic(() => import("./Process"));
const TechStack = dynamic(() => import("./TechStack"));
const Testimonials = dynamic(() => import("./Testimonials"));
const BeyondCode = dynamic(() => import("./BeyondCode"));
const Contact = dynamic(() => import("./Contact"));
const Footer = dynamic(() => import("@/components/layout/Footer"));

export default function Landing() {
  return (
    <>
      <Navbar />
      <Hero />

      <ScrollSection minHeight="200px">
        <TechMarquee />
      </ScrollSection>

      <ScrollSection id="about" minHeight="650px">
        <About />
      </ScrollSection>

      <ScrollSection id="services" minHeight="700px">
        <Services />
      </ScrollSection>

      <ScrollSection id="projects" minHeight="800px">
        <Projects />
      </ScrollSection>

      <ScrollSection id="process" minHeight="700px">
        <Process />
      </ScrollSection>

      <ScrollSection id="tech" minHeight="750px">
        <TechStack />
      </ScrollSection>

      <ScrollSection id="testimonials" minHeight="500px">
        <Testimonials />
      </ScrollSection>

      <ScrollSection id="beyond-code" minHeight="550px">
        <BeyondCode />
      </ScrollSection>

      <ScrollSection id="contact" minHeight="750px">
        <Contact />
      </ScrollSection>

      <ScrollSection minHeight="450px">
        <Footer />
      </ScrollSection>
    </>
  );
}