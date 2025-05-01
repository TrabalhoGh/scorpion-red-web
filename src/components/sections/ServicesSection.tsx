
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Code, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Physical Security",
    description: "Professional security personnel for businesses, events, and personal protection.",
    icon: "🛡️",
  },
  {
    title: "Surveillance Systems",
    description: "State-of-the-art camera systems, monitoring and alert solutions.",
    icon: "👁️",
  },
  {
    title: "Consulting Services",
    description: "Expert security consulting to identify vulnerabilities and improve your security posture.",
    icon: <Briefcase className="text-scorpion-red w-10 h-10" />,
  },
  {
    title: "Penetration Testing",
    description: "Professional ethical hacking services to find security weaknesses before malicious hackers do.",
    icon: <Code className="text-scorpion-red w-10 h-10" />,
  },
  {
    title: "Risk Assessment",
    description: "Comprehensive security audits and vulnerability analysis for your premises.",
    icon: "📊",
  },
  {
    title: "Cyber Security",
    description: "Protection against digital threats, data breaches, and online vulnerabilities.",
    icon: <Shield className="text-scorpion-red w-10 h-10" />,
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-scorpion-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Our <span className="text-scorpion-red">Services</span>
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            We offer comprehensive security solutions tailored to your specific needs,
            ensuring maximum protection for what matters most.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="bg-scorpion-gray text-white border-scorpion-gray/50 service-card transition-all duration-300">
              <CardHeader>
                <div className="text-4xl mb-4">{typeof service.icon === 'string' ? service.icon : service.icon}</div>
                <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-scorpion-red hover:bg-scorpion-red/80 text-white" asChild>
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
