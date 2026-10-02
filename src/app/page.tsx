import Navbar from "@/components/layout/header/Navbar";
import TechMarquee from "@/features/landing/TechMarquee/TechMarquee";
import Services from "@/features/landing/Services";
import WhyUs from "@/features/landing/WhyUs";
import Projects from "@/features/landing/Projects";
import Contact from "@/features/landing/Contact";
import Footer from "@/components/layout/footer/Footer";
import CTA from "@/features/landing/CTA";
import Experience from "@/features/landing/Experience";
import Testimonials from "@/features/landing/Testimonials";
import Process from "@/features/landing/Process";
import Blog from "@/features/landing/Blog";
import Hero from "@/features/landing/Hero";
import About from "@/features/landing/About";

export default function Home() {
  return (
    <main className="relative bg-bg-main min-h-screen text-white">
      <Navbar />
      <Hero />
      <TechMarquee />
      <About />
      <Experience />
      <Services />
      <WhyUs />
      <Projects />
      <Contact />
      <Testimonials />
      <Process />
      <Blog />
      <CTA />
      <Footer />
    </main>
  );
}
