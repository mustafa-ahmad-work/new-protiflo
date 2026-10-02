import Navbar from "@/components/layout/header/Navbar";
import Hero from "@/features/Landing/Hero";
import TechMarquee from "@/features/Landing/TechMarquee/TechMarquee";
import About from "@/features/Landing/About";
import Services from "@/features/Landing/Services";
import Projects from "@/features/Landing/Projects";
import Process from "@/features/Landing/Process";
import TechStack from "@/features/Landing/TechStack";
import Experience from "@/features/Landing/Experience";
import BeyondCode from "@/features/Landing/BeyondCode";
import Contact from "@/features/Landing/Contact";
import Footer from "@/components/layout/footer/Footer";
import Testimonials from "./Testimonials";

export default function Landing() {
    return <>
        <Navbar />
        <Hero />
        <TechMarquee />
        <About />
        <Services />
        <Projects />
        <Process />
        <TechStack />
        {/* <Experience /> */}
        <Testimonials />
        <BeyondCode />
        <Contact />
        <Footer />
    </>
}