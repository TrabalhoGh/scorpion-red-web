
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import AboutSection from "@/components/sections/AboutSection";

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white notranslate" translate="no">
      <Navbar />
      <div className="pt-24">
        <AboutSection />
      </div>
      <Footer />
    </div>
  );
};

export default About;
