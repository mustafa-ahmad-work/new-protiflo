import LoadingScreen from "@/components/layout/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import TechnicalArsenal from "@/components/sections/TechnicalArsenal";
import Projects from "@/components/sections/Projects";
import Blog from "@/components/sections/Blog";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import ScrollProgress from "@/components/layout/ScrollProgress";

export default function Home() {
  return (
    <main className="relative">
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />
      <ScrollToTop />

      <Hero />
      <About />
      <Services />
      <TechnicalArsenal />
      <Projects />
      <Blog />
      <Testimonials />
      <Contact />

      <Footer />
    </main>
  );
}
