import Navbar from "@/components/layout/Navbar";
import Hero from "./Hero";
import TechMarquee from "./TechMarquee/TechMarquee";
import About from "./About";
import Services from "./Services";
import Projects from "./Projects";
import Process from "./Process";
import TechStack from "./TechStack";
import BeyondCode from "./BeyondCode";
import Contact from "./Contact";
import Footer from "@/components/layout/Footer";
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
        <Testimonials />
        <BeyondCode />
        <Contact />
        <Footer />
    </>
}