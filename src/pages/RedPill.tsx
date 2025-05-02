
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import { Shield, Gavel, Scale, BookOpen } from "lucide-react";
import CyberGuardian from "@/components/cyber/CyberGuardian";
import CyberChallenge from "@/components/cyber/CyberChallenge";

const RedPill = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Despertar <span className="text-scorpion-red">Vermelho</span>
            </h1>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Compreenda a verdade sobre a sociedade atual e como isso afeta os homens modernos
            </p>
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-4 flex items-center">
                  <BookOpen className="text-scorpion-red mr-2" />
                  O que é o Despertar Vermelho?
                </h2>
                <div className="bg-scorpion-gray p-6 rounded-lg">
                  <p className="mb-4">
                    O "Despertar Vermelho" é uma filosofia e movimento que busca conscientizar os homens sobre as 
                    realidades da dinâmica social moderna, relacionamentos e desafios específicos que os homens 
                    enfrentam na sociedade atual.
                  </p>
                  <p className="mb-4">
                    A metáfora da "pílula vermelha" tem origem na cultura popular e simboliza a escolha de ver 
                    a verdade, por mais desconfortável que seja, em vez de permanecer em um estado de ilusão 
                    confortável.
                  </p>
                  <p>
                    Este movimento enfatiza autoconhecimento, desenvolvimento pessoal, independência emocional 
                    e a busca pela verdade objetiva sobre as relações interpessoais e dinâmicas sociais.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 flex items-center">
                  <Shield className="text-scorpion-red mr-2" />
                  Por que isso importa?
                </h2>
                <div className="bg-scorpion-gray p-6 rounded-lg">
                  <p className="mb-4">
                    Na sociedade contemporânea, muitos homens enfrentam desafios únicos que frequentemente 
                    não são abordados no discurso público. Entender estas realidades é crucial para:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Desenvolver relacionamentos mais saudáveis e equilibrados</li>
                    <li>Proteger-se legalmente em um sistema frequentemente desequilibrado</li>
                    <li>Preservar a saúde mental e a integridade emocional</li>
                    <li>Construir um futuro mais promissor e autônomo</li>
                    <li>Tomar decisões mais informadas sobre carreira, finanças e vida pessoal</li>
                  </ul>
                  <p>
                    O "Despertar Vermelho" não se trata de antagonismo, mas de consciência, 
                    autodeterminação e busca por equilíbrio em uma sociedade em constante mudança.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 flex items-center">
                  <Gavel className="text-scorpion-red mr-2" />
                  Para que serve?
                </h2>
                <div className="bg-scorpion-gray p-6 rounded-lg">
                  <p className="mb-4">
                    Esta filosofia serve como um guia para homens que buscam:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Entender melhor as dinâmicas relacionais atuais</li>
                    <li>Desenvolver habilidades de autodefesa social e legal</li>
                    <li>Construir independência financeira e emocional</li>
                    <li>Formar uma identidade masculina saudável em tempos confusos</li>
                    <li>Conectar-se com outros homens que compartilham experiências similares</li>
                  </ul>
                  <p>
                    Através da educação, conscientização e comunidade, o Despertar Vermelho oferece ferramentas 
                    para que homens naveguem com mais segurança e sucesso no cenário social contemporâneo.
                  </p>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-scorpion-gray p-6 rounded-lg sticky top-24">
                <h3 className="text-xl font-bold mb-4 text-scorpion-red">Recursos Recomendados</h3>
                <ul className="space-y-4">
                  <li>
                    <h4 className="font-semibold">Livros Essenciais</h4>
                    <p className="text-sm text-white/70">Literatura fundamental para compreender os princípios do Despertar Vermelho</p>
                  </li>
                  <li>
                    <h4 className="font-semibold">Comunidade Online</h4>
                    <p className="text-sm text-white/70">Fóruns e grupos de discussão para troca de experiências e apoio mútuo</p>
                  </li>
                  <li>
                    <h4 className="font-semibold">Consultoria Pessoal</h4>
                    <p className="text-sm text-white/70">Orientação individualizada para situações específicas</p>
                  </li>
                  <li>
                    <h4 className="font-semibold">Assistência Jurídica</h4>
                    <p className="text-sm text-white/70">Suporte legal especializado para homens em situações de risco</p>
                  </li>
                </ul>
              </div>
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

export default RedPill;
