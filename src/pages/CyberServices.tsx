import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Shield, Network, Code, Cloud, Bug, Users, AlertTriangle, Wrench, GraduationCap, RefreshCw, Target, UserCheck, FileText, DollarSign, Scale, Mail } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

const teamRoles = [
  {
    role: "Red Team Lead / Engagement Manager",
    description: "Single point of contact, scope & comms"
  },
  {
    role: "Senior Exploit Dev / Senior Pentester",
    description: "PoC & advanced exploitation"
  },
  {
    role: "Web App Pentester",
    description: "OWASP, auth, session & business logic testing"
  },
  {
    role: "Network / AD Pentester",
    description: "Internal enumeration, lateral movement, domain exploitation"
  },
  {
    role: "Social Engineering Specialist",
    description: "Phishing, vishing campaigns (authorized)"
  },
  {
    role: "Physical Security Specialist",
    description: "Tailgating, badge testing, physical reconnaissance (authorized)"
  },
  {
    role: "Forensics & Evidence Collector",
    description: "Preserves chain of custody when needed"
  },
  {
    role: "Remediation Consultant",
    description: "Implements fixes and hardening"
  },
  {
    role: "Trainer / Blue Team Coach",
    description: "Runs detection workshops and SOC playbooks"
  }
];

const sowItems = [
  {
    title: "Engagement Overview & Objective",
    description: "e.g., 'assess external exposure and test business-critical application'"
  },
  {
    title: "Detailed Scope",
    description: "Assets, IPs, apps, user roles, cloud accounts; explicit exclusions"
  },
  {
    title: "Methodology",
    description: "Black/grey/white box option, OWASP/MITRE standards, tools & manual testing"
  },
  {
    title: "Rules of Engagement",
    description: "Test windows, emergency contacts, stop conditions, allowed hours, out-of-scope systems"
  },
  {
    title: "Social Engineering / Physical Testing",
    description: "Only performed after explicit written authorization with named approvers"
  },
  {
    title: "Deliverables & Timelines",
    description: "Exec summary (for leadership), full technical report (PoCs), remediation plan, retest, debrief"
  },
  {
    title: "Confidentiality & Legal",
    description: "NDA, signed SoW as authorization, liability limits, applicable law"
  },
  {
    title: "Payment Terms",
    description: "Deposit & balance, FX clause if billed in USD/other currencies"
  },
  {
    title: "SLA for Reporting",
    description: "Typical 7–14 business days after tests end (depends on scope)"
  }
];

const remediationOfferings = [
  {
    title: "Remediation Support",
    description: "Fix critical vulnerabilities, configuration hardening, secure architecture recommendations, remediation verification retest. Offered onsite or remote."
  },
  {
    title: "Executive & Board Briefing",
    description: "Non-technical risk summary, prioritized action plan, compliance mapping."
  },
  {
    title: "Technical Remediation Workshops",
    description: "Guided patching sessions with engineers (pairing)."
  },
  {
    title: "Blue Team / SOC Simulation",
    description: "Detection exercises, log reviews, playbook creation."
  },
  {
    title: "Customized Awareness Training",
    description: "Phishing simulations + employee awareness sessions + metrics reporting."
  }
];

const commercialTerms = [
  {
    title: "Payment",
    description: "40% upfront at contract signature; 60% on delivery of final report. Bank transfer, Stripe/Payoneer or wire accepted. For long engagements milestone payments can be agreed."
  },
  {
    title: "Currency & FX",
    description: "Quotes in USD. If client pays in local currency, invoice will state exchange rate and reconciliation rules."
  },
  {
    title: "Authorization",
    description: "No testing without signed SoW & NDA. Social engineering & physical tests require named approvals."
  },
  {
    title: "Liability",
    description: "Limitations and indemnities to be agreed in contract. Recommend professional liability (E&O) and cyber insurance for both parties on large engagements."
  },
  {
    title: "Confidentiality",
    description: "All findings provided under strict NDA; sanitized case studies may be published only with client approval."
  },
  {
    title: "Cancellation",
    description: "Notice period (e.g., 15 business days) and partial fees depending on progress."
  }
];

const salesSnippets = [
  "We perform objective-driven Red Team engagements that test not only technology but people and process — delivering prioritized remediation plans and hands-on support to fix what we find.",
  "Starter Perimeter Scan + Web App test from just ~US$3.4k — executive summary in 7 business days.",
  "Enterprise Red Team (multi-vector) with on-site remediation and Blue Team workshop — custom pricing; typical range US$20k–$34k."
];

const CyberServices = () => {
  return (
    <div className="min-h-screen bg-black text-white notranslate" translate="no">
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

        {/* Team Roles */}
        <section className="container mx-auto px-4 mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Team <span className="text-scorpion-red">Roles</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              What clients get — Expert professionals dedicated to your security
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamRoles.map((role, index) => (
              <Card key={index} className="bg-scorpion-gray border-white/10 hover:border-scorpion-red/50 transition-all">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <UserCheck className="w-5 h-5 text-scorpion-red shrink-0 mt-1" />
                    <div>
                      <CardTitle className="text-lg mb-2">{role.role}</CardTitle>
                      <CardDescription className="text-white/70 text-sm">
                        {role.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Scope of Work */}
        <section className="container mx-auto px-4 mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Scope of <span className="text-scorpion-red">Work</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              What we include in every proposal
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {sowItems.map((item, index) => (
              <Card key={index} className="bg-scorpion-gray border-white/10 hover:border-scorpion-red/50 transition-all">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-scorpion-red shrink-0 mt-1" />
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{item.title}</CardTitle>
                      <CardDescription className="text-white/70">
                        {item.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Remediation & Training */}
        <section className="container mx-auto px-4 mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Remediation & <span className="text-scorpion-red">Training</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Comprehensive support beyond testing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {remediationOfferings.map((offering, index) => (
              <Card key={index} className="bg-scorpion-gray border-white/10 hover:border-scorpion-red/50 transition-all">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <Wrench className="w-5 h-5 text-scorpion-red shrink-0 mt-1" />
                    <div>
                      <CardTitle className="text-lg mb-2">{offering.title}</CardTitle>
                      <CardDescription className="text-white/70">
                        {offering.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Commercial & Legal Terms */}
        <section className="container mx-auto px-4 mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Commercial & <span className="text-scorpion-red">Legal Terms</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Transparent and professional engagement terms
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {commercialTerms.map((term, index) => (
              <Card key={index} className="bg-scorpion-gray border-white/10">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <Scale className="w-5 h-5 text-scorpion-red shrink-0 mt-1" />
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{term.title}</CardTitle>
                      <CardDescription className="text-white/70">
                        {term.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Legal & Ethical Notice */}
        <section className="container mx-auto px-4 mt-20">
          <Alert className="max-w-4xl mx-auto bg-scorpion-red/10 border-scorpion-red">
            <AlertTriangle className="h-5 w-5 text-scorpion-red" />
            <AlertDescription className="text-white ml-2">
              <strong className="text-scorpion-red">Legal & Ethical Notice:</strong>
              <p className="mt-2">
                We perform social engineering, physical security tests and espionage simulations only with explicit, written authorization and named approvers. Without authorization, such acts are illegal and will not be performed.
              </p>
              <p className="mt-2">
                All work follows local laws and industry best practices. Client must ensure compliance with applicable regulations before authorizing tests (e.g., payment systems, medical devices, legal holds).
              </p>
            </AlertDescription>
          </Alert>
        </section>

        {/* Quick Sales Snippets */}
        <section className="container mx-auto px-4 mt-20 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-scorpion-red">Us</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {salesSnippets.map((snippet, index) => (
              <Card key={index} className="bg-scorpion-gray border-white/10 hover:border-scorpion-red/50 transition-all">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-scorpion-red shrink-0 mt-1" />
                    <CardDescription className="text-white text-base">
                      {snippet}
                    </CardDescription>
                  </div>
                </CardHeader>
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