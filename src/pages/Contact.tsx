
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import ContactSection from "@/components/sections/ContactSection";

const Contact = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-24">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
