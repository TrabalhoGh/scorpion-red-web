
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import ServicesSection from "@/components/sections/ServicesSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Code, Briefcase, ShieldAlert, Bot, Trophy, Medal, Cloud, ArrowRight, Video, DoorOpen, Camera, Fingerprint } from "lucide-react";
import { Link } from "react-router-dom";
import CyberGuardian from "@/components/cyber/CyberGuardian";
import CyberChallenge from "@/components/cyber/CyberChallenge";
import AISecurityTraining from "@/components/security/AISecurityTraining";
import ChatBot from "@/components/chat/ChatBot";

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
    title: "CFTV Video Surveillance",
    description: "State-of-the-art closed-circuit television systems with intelligent analytics, remote monitoring, and comprehensive recording solutions for complete facility protection.",
    icon: <Video className="text-scorpion-red w-16 h-16" />,
    details: [
      "HD/4K IP camera installation and configuration",
      "24/7 remote monitoring and alert systems",
      "Intelligent video analytics (motion detection, facial recognition, object tracking)",
      "Cloud-based and on-premise storage solutions",
      "Integration with access control and alarm systems",
      "Night vision and thermal imaging capabilities",
      "Mobile app access for real-time viewing",
      "Scalable systems from small businesses to enterprise facilities"
    ]
  },
  {
    title: "Access Control Systems",
    description: "Advanced access control solutions combining biometric authentication, smart cards, and intelligent software to manage and secure physical access to your facilities.",
    icon: <DoorOpen className="text-scorpion-red w-16 h-16" />,
    details: [
      "Biometric authentication (fingerprint, facial recognition, iris scanning)",
      "RFID and smart card access systems",
      "Multi-factor authentication for high-security zones",
      "Visitor management and temporary access credentials",
      "Integration with HR systems for automated provisioning",
      "Real-time access logs and audit trails",
      "Turnstile, gate, and door controller integration",
      "Mobile credentials and smartphone-based access",
      "Time-based access restrictions and zone management",
      "Emergency lockdown and evacuation protocols"
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
  },
  {
    title: "Cloud Security",
    description: "Comprehensive cloud security solutions to protect your cloud infrastructure, data, and applications across multi-cloud environments.",
    icon: <Cloud className="text-scorpion-red w-16 h-16" />,
    details: [
      "Cloud security assessment and monitoring",
      "Multi-cloud security architecture",
      "Container and Kubernetes security",
      "Cloud compliance and governance",
      "Zero-trust cloud implementation"
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
            <p className="text-lg text-white/70 max-w-3xl mx-auto mb-8">
              Comprehensive security solutions tailored to meet your specific needs.
              Protect your business, assets, and data with Scorpion Security.
            </p>
            <a href="/cyber-services" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-scorpion-red hover:bg-scorpion-red/90 text-white">
                View International Cybersecurity Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
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
      <ChatBot />
      <CyberChallenge />
      <Footer />
    </div>
  );
};

export default Services;
