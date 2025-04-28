
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import ServicesSection from "@/components/sections/ServicesSection";

const Services = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-24">
        <ServicesSection />
      </div>
      <Footer />
    </div>
  );
};

export default Services;
