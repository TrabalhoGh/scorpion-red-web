
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 hero-gradient"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1617347454431-f42f76d95de8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
        }}
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
          <span className="text-scorpion-red">Protection</span> On Every Level
        </h1>
        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10">
          Advanced security solutions for businesses and individuals. Your safety is our mission.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-scorpion-red hover:bg-scorpion-red/80 text-white text-lg">
            <Link to="/services">Our Services</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
