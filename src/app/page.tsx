import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import TechnicalArsenal from "@/components/sections/TechnicalArsenal";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Blog from "@/components/sections/Blog";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import ScrollProgress from "@/components/layout/ScrollProgress";

export default function Home() {
  return (
    <main className="relative bg-[var(--bg-main)]">
      <ScrollProgress />
      <Navbar />
      <ScrollToTop />

      <Hero />
      <About />
      <Services />
      <Process />
      <TechnicalArsenal />
      <Experience />
      <Projects />
      <Blog />
      <Testimonials />
      <CTA />
      <Contact />

      <Footer />
    </main>
  );
}
