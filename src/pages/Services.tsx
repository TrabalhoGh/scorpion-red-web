
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import ServicesSection from "@/components/sections/ServicesSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Code, Briefcase, ShieldAlert, Bot, Trophy, Medal } from "lucide-react";
import CyberGuardian from "@/components/cyber/CyberGuardian";
import CyberChallenge from "@/components/cyber/CyberChallenge";
import AISecurityTraining from "@/components/security/AISecurityTraining";

const detailedServices = [
  {
    title: "Security Consulting",
    description: "Our security consulting services provide expert guidance to help organizations identify vulnerabilities, develop security strategies, and implement robust protection measures.",
    icon: <Briefcase className="text-scorpion-red w-16 h-16" />,
    details: [
      "Security policy development and review",
      "Risk assessment and management",
      "Security architecture design",
      "Compliance consulting (GDPR, PCI DSS, ISO 27001)",
      "Security awareness training programs"
    ]
  },
  {
    title: "Penetration Testing",
    description: "Our penetration testing team simulates real-world attacks to identify security weaknesses before malicious hackers can exploit them.",
    icon: <Code className="text-scorpion-red w-16 h-16" />,
    details: [
      "Network penetration testing",
      "Web application testing",
      "Mobile application security analysis",
      "Wireless network security assessment",
      "Social engineering simulations"
    ]
  },
  {
    title: "Physical Security",
    description: "Comprehensive physical security solutions to protect your premises, personnel, and assets from unauthorized access and threats.",
    icon: "🛡️",
    details: [
      "Security guard services",
      "Access control systems",
      "CCTV installation and monitoring",
      "Alarm systems",
      "Executive protection"
    ]
  },
  {
    title: "Cyber Defense",
    description: "Advanced cybersecurity solutions to protect your digital assets from evolving threats in the digital landscape.",
    icon: <Shield className="text-scorpion-red w-16 h-16" />,
    details: [
      "Managed security services",
      "Intrusion detection and prevention",
      "Security information and event management (SIEM)",
      "Endpoint protection",
      "Security operations center (SOC)"
    ]
  },
  {
    title: "AI Security Training System",
    description: "Gamified cybersecurity training platform with dual AI system that tests and educates your employees on security best practices.",
    icon: <Bot className="text-scorpion-red w-16 h-16" />,
    details: [
      "Z3R0: Attack simulation AI",
      "AI-ron: Defense consultant AI",
      "Gamified learning environment",
      "Real-time scoring and ranking",
      "Digital achievement badges"
    ]
  }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Our <span className="text-scorpion-red">Services</span>
            </h1>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Comprehensive security solutions tailored to meet your specific needs.
              Protect your business, assets, and data with Scorpion Security.
            </p>
          </div>
          
          <div className="space-y-16">
            {detailedServices.map((service, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}
              >
                <div className="md:w-1/3 flex justify-center">
                  <div className="bg-scorpion-gray p-8 rounded-full">
                    {typeof service.icon === 'string' ? 
                      <div className="text-6xl">{service.icon}</div> : 
                      service.icon
                    }
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                  <p className="text-lg text-white/70 mb-6">{service.description}</p>
                  <div className="bg-scorpion-gray p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-scorpion-red">What we offer:</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {service.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ShieldAlert className="h-5 w-5 text-scorpion-red shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AISecurityTraining />
      <CyberGuardian />
      <CyberChallenge />
      <Footer />
    </div>
  );
};

export default Services;
