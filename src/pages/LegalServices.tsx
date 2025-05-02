
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Gavel, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import CyberGuardian from "@/components/cyber/CyberGuardian";
import CyberChallenge from "@/components/cyber/CyberChallenge";

const legalServices = [
  {
    title: "Direito Familiar",
    description: "Assistência especializada em divórcios, guarda de filhos, pensão alimentícia e outros assuntos familiares com foco na proteção dos direitos paternos.",
    icon: <Scale className="text-scorpion-red w-16 h-16" />,
    details: [
      "Acordos de divórcio equilibrados",
      "Defesa de direitos parentais",
      "Revisão de pensão alimentícia",
      "Guarda compartilhada",
      "Mediação familiar especializada"
    ]
  },
  {
    title: "Defesa Contra Falsas Acusações",
    description: "Proteção legal robusta contra acusações infundadas que podem afetar sua reputação, carreira e liberdade.",
    icon: <Shield className="text-scorpion-red w-16 h-16" />,
    details: [
      "Investigação detalhada de acusações",
      "Coleta de provas exculpatórias",
      "Contra-argumentação baseada em fatos",
      "Proteção da reputação e imagem",
      "Medidas preventivas e protocolos de segurança"
    ]
  },
  {
    title: "Preservação Patrimonial",
    description: "Estratégias jurídicas e financeiras para proteger seu patrimônio de disputas injustas e divisões desequilibradas.",
    icon: <Scale className="text-scorpion-red w-16 h-16" />,
    details: [
      "Acordos pré-nupciais e pós-nupciais",
      "Planejamento patrimonial preventivo",
      "Proteção de bens empresariais",
      "Blindagem de investimentos",
      "Consultoria para separação de bens"
    ]
  },
  {
    title: "Consultoria Jurídica Preventiva",
    description: "Orientação preventiva para homens que desejam evitar problemas legais futuros em relacionamentos e negócios.",
    icon: <Gavel className="text-scorpion-red w-16 h-16" />,
    details: [
      "Análise de riscos legais em relacionamentos",
      "Documentação preventiva",
      "Contratos de coabitação",
      "Prevenção de litígios",
      "Estratégias de comunicação segura"
    ]
  }
];

const LegalServices = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Serviços <span className="text-scorpion-red">Jurídicos</span> para Homens
            </h1>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Protegendo seus direitos em um sistema frequentemente desequilibrado.
              Soluções jurídicas especializadas para os desafios únicos que homens enfrentam.
            </p>
          </div>
          
          <div className="space-y-16">
            {legalServices.map((service, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}
              >
                <div className="md:w-1/3 flex justify-center">
                  <div className="bg-scorpion-gray p-8 rounded-full">
                    {service.icon}
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                  <p className="text-lg text-white/70 mb-6">{service.description}</p>
                  <div className="bg-scorpion-gray p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-scorpion-red">O que oferecemos:</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {service.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Shield className="h-5 w-5 text-scorpion-red shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-scorpion-gray p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Por que escolher nossos serviços jurídicos?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-black mb-4">
                  <Scale className="text-scorpion-red w-8 h-8" />
                </div>
                <h3 className="font-bold mb-2">Especialização</h3>
                <p className="text-white/70">Advogados focados exclusivamente em casos que envolvem homens e seus desafios específicos.</p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-black mb-4">
                  <Shield className="text-scorpion-red w-8 h-8" />
                </div>
                <h3 className="font-bold mb-2">Abordagem Empática</h3>
                <p className="text-white/70">Entendemos profundamente os desafios únicos que homens enfrentam no sistema jurídico atual.</p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-black mb-4">
                  <Gavel className="text-scorpion-red w-8 h-8" />
                </div>
                <h3 className="font-bold mb-2">Resultados Comprovados</h3>
                <p className="text-white/70">Histórico de sucesso em proteger os direitos, patrimônio e reputação de nossos clientes.</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button className="bg-scorpion-red hover:bg-scorpion-red/80 text-white">
                Agende uma Consulta
              </Button>
            </div>
          </div>
        </div>
      </div>
      <CyberGuardian />
      <CyberChallenge />
      <Footer />
    </div>
  );
};

export default LegalServices;
