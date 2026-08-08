import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import TechMarquee from "@/components/sections/TechMarquee";
import Services from "@/components/sections/Services";
import WhyUs from "@/components/sections/WhyUs";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";

export default function Home() {
  return (
    <main className="relative bg-bg-main min-h-screen text-white">
      <Navbar />
      <ScrollToTop />

      <Hero />
      <TechMarquee />
      <Services />
      <WhyUs />
      <Projects />
      <Contact />

      <Footer />
    </main>
  );
}
