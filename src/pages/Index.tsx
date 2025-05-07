
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import CyberChallenge from "@/components/cyber/CyberChallenge";
import ChatBot from "@/components/chat/ChatBot";
import CyberGuardian from "@/components/cyber/CyberGuardian";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <ChatBot />
      <CyberChallenge />
      <CyberGuardian />
      <Footer />
    </div>
  );
};

export default Index;
