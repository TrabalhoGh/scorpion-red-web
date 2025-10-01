import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Shield, Network, Code, Cloud, Bug, Users, AlertTriangle, Wrench, GraduationCap, RefreshCw, Target } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const coreServices = [
  {
    title: "Vulnerability Assessment",
    description: "Automated scans + manual validation and risk prioritization.",
    icon: <Bug className="w-6 h-6" />
  },
  {
    title: "Penetration Testing",
    description: "Web / Network / Mobile / Cloud — manual verification + PoCs, aligned with OWASP/MITRE.",
    icon: <Shield className="w-6 h-6" />
  },
  {
    title: "Red Team / Adversary Emulation",
    description: "Objective-driven multi-vector attack simulation (MITRE ATT&CK).",
    icon: <Target className="w-6 h-6" />
  },
  {
    title: "Purple Team / Detection Tuning",
    description: "Joint exercises to improve detection and response.",
    icon: <Users className="w-6 h-6" />
  },
  {
    title: "Cloud Security Assessment",
    description: "IAM, storage, network, infra-as-code review (AWS/Azure/GCP).",
    icon: <Cloud className="w-6 h-6" />
  },
  {
    title: "Application Security",
    description: "Static + dynamic analysis, business-logic testing, secure code review.",
    icon: <Code className="w-6 h-6" />
  },
  {
    title: "IoT & Embedded Security",
    description: "Firmware analysis, hardware attack surface evaluation.",
    icon: <Network className="w-6 h-6" />
  },
  {
    title: "Social Engineering Tests",
    description: "Phishing / Vishing & Physical Security Tests — only by written authorization.",
    icon: <AlertTriangle className="w-6 h-6" />
  },
  {
    title: "Incident Response & Forensics",
    description: "IR playbooks, containment, evidence collection.",
    icon: <AlertTriangle className="w-6 h-6" />
  },
  {
    title: "Remediation & Hardening",
    description: "Hands-on fixes, configuration hardening, follow-up retest.",
    icon: <Wrench className="w-6 h-6" />
  },
  {
    title: "Security Training",
    description: "From executive briefings to hands-on blue team workshops.",
    icon: <GraduationCap className="w-6 h-6" />
  },
  {
    title: "Continuous Testing",
    description: "Monthly scans, periodic pentests, scheduled retests.",
    icon: <RefreshCw className="w-6 h-6" />
  }
];

const packages = [
  {
    name: "Basic",
    subtitle: "Perimeter Test",
    price: "$3,400 – $4,700",
    duration: "3–5 days",
    scope: [
      "1 simple web app OR up to 10 external IPs",
      "Black/Grey box methodology",
      "OWASP Top 10 focus"
    ],
    deliverables: [
      "Executive summary",
      "Technical report with PoCs",
      "1 verification retest (30 days)"
    ],
    optional: [
      "Training (2-hour awareness session): $940",
      "Remediation assistance (critical fixes): $1,500"
    ],
    featured: false
  },
  {
    name: "Intermediate",
    subtitle: "Application & Network",
    price: "$7,900 – $12,200",
    duration: "7–10 days",
    scope: [
      "1 medium web application (up to 3 user roles)",
      "Up to 20 external IPs",
      "Grey box, OWASP ASVS level coverage",
      "Auth & business logic tests"
    ],
    deliverables: [
      "Executive + technical reports with PoCs",
      "Prioritized remediation plan",
      "1 comprehensive retest"
    ],
    optional: [
      "Internal workshop (3h, hands-on & awareness): $1,900",
      "Full remediation support until retest: $2,800"
    ],
    featured: true
  },
  {
    name: "Enterprise",
    subtitle: "Red Team Simulation",
    price: "$20,600 – $33,800",
    duration: "15–25 days",
    scope: [
      "External + internal AD + 1 critical app",
      "Authorized phishing",
      "Controlled physical/espionage scenario (if contracted)",
      "Objective-driven Red Teaming using MITRE ATT&CK",
      "Multi-vector approach"
    ],
    deliverables: [
      "C-level executive report",
      "Full technical report with risk matrix (CVSS + context)",
      "PoCs and evidence documentation",
      "Debrief workshop",
      "1 comprehensive retest",
      "Includes: 1-day Blue Team / Awareness workshop"
    ],
    optional: [
      "Full mitigation & support until final retest: $6,600"
    ],
    featured: false
  }
];

const CyberServices = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-scorpion-red/20 text-scorpion-red border-scorpion-red">
              International Offering
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Cybersecurity <span className="text-scorpion-red">Services</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70">
              Professional security assessment and testing services aligned with international standards (OWASP, MITRE ATT&CK)
            </p>
          </div>
        </section>

        {/* Core Services */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Core <span className="text-scorpion-red">Services</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Comprehensive security services catalog
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreServices.map((service, index) => (
              <Card key={index} className="bg-scorpion-gray border-white/10 hover:border-scorpion-red/50 transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-scorpion-red">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-white/70">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Standard Packages */}
        <section className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Standard <span className="text-scorpion-red">Packages</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Choose the package that fits your needs (USD approx.)
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card 
                key={index} 
                className={`bg-scorpion-gray border-white/10 ${pkg.featured ? 'ring-2 ring-scorpion-red' : ''} hover:border-scorpion-red/50 transition-all flex flex-col`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={pkg.featured ? "default" : "secondary"} className={pkg.featured ? "bg-scorpion-red" : ""}>
                      {pkg.name}
                    </Badge>
                    {pkg.featured && (
                      <Badge variant="outline" className="border-scorpion-red text-scorpion-red">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-2xl mb-2">{pkg.subtitle}</CardTitle>
                  <div className="text-3xl font-bold text-scorpion-red mb-2">
                    {pkg.price}
                  </div>
                  <CardDescription className="text-white/70">
                    Duration: {pkg.duration}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <Tabs defaultValue="scope" className="flex-1">
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                      <TabsTrigger value="scope">Scope</TabsTrigger>
                      <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
                      <TabsTrigger value="optional">Optional</TabsTrigger>
                    </TabsList>

                    <TabsContent value="scope" className="space-y-2">
                      {pkg.scope.map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-scorpion-red shrink-0 mt-1" />
                          <span className="text-sm text-white/80">{item}</span>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="deliverables" className="space-y-2">
                      {pkg.deliverables.map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-scorpion-red shrink-0 mt-1" />
                          <span className="text-sm text-white/80">{item}</span>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="optional" className="space-y-2">
                      {pkg.optional.map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-scorpion-red text-sm shrink-0 mt-1">+</span>
                          <span className="text-sm text-white/70">{item}</span>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CyberServices;