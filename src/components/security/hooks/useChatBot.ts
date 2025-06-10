import { useState, useRef, useEffect } from "react";
import { Message, AttackSimulation } from "../types";
import { getRandomAttack } from "../data/attackSimulations";

export const useChatBot = () => {
  const [activeBot, setActiveBot] = useState<"z3r0" | "airon">("z3r0");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [isAttackActive, setIsAttackActive] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentAttack, setCurrentAttack] = useState<AttackSimulation | null>(null);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const initialZ3r0Message = {
      id: "z3r0-initial",
      sender: "ai" as const,
      content: "Hello user. I am Z3R0, your security testing assistant. I will simulate various cyber attacks to test your security awareness. After each simulation, you'll get a quiz to test your knowledge. I have over 30 different attack scenarios ready. Type anything to begin...",
      timestamp: new Date(),
      bot: "z3r0" as const
    };

    const initialAironMessage = {
      id: "airon-initial",
      sender: "ai" as const,
      content: "Hello! I'm AI-ron, your cybersecurity defense consultant. I'm here to provide comprehensive guidance on information security best practices. I can help you with security policies, risk management, compliance, incident response, and much more. What security topic would you like to explore?",
      timestamp: new Date(),
      bot: "airon" as const
    };

    setMessages([initialZ3r0Message, initialAironMessage]);
  }, []);

  const handleQuizSubmit = () => {
    if (selectedQuizOption === null || !currentAttack) return;

    const isCorrect = selectedQuizOption === currentAttack.quiz.correctAnswer;
    const quizPoints = isCorrect ? currentAttack.points + 50 : Math.floor(currentAttack.points / 2);

    const resultMessage: Message = {
      id: `z3r0-quiz-result-${Date.now()}`,
      sender: "ai",
      content: isCorrect 
        ? `🎯 Correto! Você identificou corretamente o ataque. +${quizPoints} pontos!\n\n${currentAttack.quiz.explanation}`
        : `❌ Resposta incorreta. A resposta correta era: ${currentAttack.quiz.options[currentAttack.quiz.correctAnswer]}.\n\n${currentAttack.quiz.explanation}`,
      timestamp: new Date(),
      bot: "z3r0"
    };

    setMessages(prev => [...prev, resultMessage]);

    if (isCorrect) {
      setUserScore(prev => prev + quizPoints);
    }

    setTimeout(() => {
      const preventionMessage: Message = {
        id: `z3r0-prevention-${Date.now()}`,
        sender: "ai",
        content: `📚 Como se proteger contra ${currentAttack.attackType}:\n\n${currentAttack.quiz.prevention}`,
        timestamp: new Date(),
        bot: "z3r0"
      };

      setMessages(prev => [...prev, preventionMessage]);

      setTimeout(() => {
        setIsQuizActive(false);
        setCurrentAttack(null);
        setSelectedQuizOption(null);

        const nextPromptMessage: Message = {
          id: `z3r0-next-${Date.now()}`,
          sender: "ai",
          content: "Ready for another security challenge? I have many more attack simulations and quizzes to test your skills. Type anything to continue.",
          timestamp: new Date(),
          bot: "z3r0"
        };

        setMessages(prev => [...prev, nextPromptMessage]);
      }, 1500);
    }, 1000);
  };

  const handleZ3r0Response = (userInput: string) => {
    setTimeout(() => {
      if (!isAttackActive && !isQuizActive) {
        const attack = getRandomAttack();
        setCurrentAttack(attack);
        setIsAttackActive(true);
        
        const attackMessage: Message = {
          id: `z3r0-${Date.now()}`,
          sender: "ai",
          content: attack.attack,
          timestamp: new Date(),
          bot: "z3r0"
        };
        
        setMessages(prev => [...prev, attackMessage]);
      } else if (isAttackActive && currentAttack && !isQuizActive) {
        const userDetectedThreat = userInput.toLowerCase().includes("attack") || 
                                  userInput.toLowerCase().includes("threat") ||
                                  userInput.toLowerCase().includes("scam") ||
                                  userInput.toLowerCase().includes("phishing") ||
                                  userInput.toLowerCase().includes("suspicious") ||
                                  userInput.toLowerCase().includes("fraud") ||
                                  userInput.toLowerCase().includes("fake") ||
                                  userInput.toLowerCase().includes("malicious") ||
                                  userInput.toLowerCase().includes("no") ||
                                  userInput.toLowerCase().includes("don't trust") ||
                                  userInput.toLowerCase().includes("verify");
        
        if (userDetectedThreat) {
          const successMessage: Message = {
            id: `z3r0-${Date.now()}`,
            sender: "ai",
            content: `Good eye! You detected something suspicious. You've earned ${currentAttack.points} points! 🎯`,
            timestamp: new Date(),
            bot: "z3r0"
          };
          
          setMessages(prev => [...prev, successMessage]);
          setUserScore(prev => prev + currentAttack.points);
        } else {
          const failMessage: Message = {
            id: `z3r0-${Date.now()}`,
            sender: "ai",
            content: `That was a security test, and you didn't identify the threat initially. ${currentAttack.defense} ⚠️`,
            timestamp: new Date(),
            bot: "z3r0"
          };
          
          setMessages(prev => [...prev, failMessage]);
        }

        setTimeout(() => {
          setIsAttackActive(false);
          setIsQuizActive(true);

          const quizMessage: Message = {
            id: `z3r0-quiz-${Date.now()}`,
            sender: "ai",
            content: "",
            timestamp: new Date(),
            bot: "z3r0",
            type: "quiz",
            quizData: currentAttack.quiz
          };

          setMessages(prev => [...prev, quizMessage]);
        }, 1000);
      }
    }, 1000);
  };

  const handleAIronResponse = (userInput: string) => {
    setTimeout(() => {
      const lowerInput = userInput.toLowerCase();
      let responseContent = "";
      
      if (lowerInput.includes("política") || lowerInput.includes("policy") || lowerInput.includes("políticas")) {
        responseContent = "📋 **Políticas de Segurança da Informação:**\n\n1. **Política de Senhas:** Senhas complexas (8+ caracteres, maiúsculas, minúsculas, números, símbolos), renovação a cada 90 dias, sem reutilização das últimas 12 senhas\n\n2. **Política de Acesso:** Princípio do menor privilégio, revisão trimestral de acessos, segregação de funções\n\n3. **Política de Backup:** Backup diário automático, teste mensal de restauração, armazenamento em locais seguros\n\n4. **Política de Dispositivos:** Antivírus atualizado, firewall ativo, criptografia de disco, bloqueio automático\n\n5. **Política de Incidentes:** Procedimentos claros de resposta, equipe responsável definida, comunicação estruturada";
      } else if (lowerInput.includes("compliance") || lowerInput.includes("conformidade") || lowerInput.includes("lgpd") || lowerInput.includes("gdpr")) {
        responseContent = "⚖️ **Compliance e Conformidade:**\n\n**LGPD (Lei Geral de Proteção de Dados):**\n• Mapeamento de dados pessoais\n• Implementação de medidas de segurança\n• Nomeação de DPO (Data Protection Officer)\n• Procedimentos para direitos dos titulares\n• Relatórios de impacto à proteção de dados\n\n**ISO 27001:**\n• Sistema de Gestão de Segurança da Informação\n• Análise de riscos estruturada\n• Controles de segurança implementados\n• Monitoramento e melhoria contínua\n\n**SOX, PCI-DSS:** Controles específicos para dados financeiros e de cartão";
      } else if (lowerInput.includes("risco") || lowerInput.includes("risk") || lowerInput.includes("análise")) {
        responseContent = "🎯 **Gestão de Riscos de Segurança:**\n\n**1. Identificação de Riscos:**\n• Ameaças internas e externas\n• Vulnerabilidades técnicas e humanas\n• Impactos no negócio\n\n**2. Análise Qualitativa:**\n• Probabilidade: Muito baixa, Baixa, Média, Alta, Muito alta\n• Impacto: Insignificante, Menor, Moderado, Maior, Catastrófico\n\n**3. Estratégias de Tratamento:**\n• Mitigar: Implementar controles\n• Transferir: Seguros, terceirização\n• Aceitar: Riscos residuais baixos\n• Evitar: Eliminar a atividade\n\n**4. Monitoramento:** KPIs, métricas, revisões periódicas";
      } else if (lowerInput.includes("incidente") || lowerInput.includes("incident") || lowerInput.includes("resposta")) {
        responseContent = "🚨 **Resposta a Incidentes de Segurança:**\n\n**Fases do Processo:**\n\n**1. Preparação:**\n• Equipe de resposta treinada\n• Ferramentas e procedimentos definidos\n• Comunicação com stakeholders\n\n**2. Identificação:**\n• Monitoramento contínuo\n• Alertas automatizados\n• Análise de logs e eventos\n\n**3. Contenção:**\n• Isolamento do sistema afetado\n• Preservação de evidências\n• Contenção de curto e longo prazo\n\n**4. Erradicação:**\n• Remoção da causa raiz\n• Correção de vulnerabilidades\n\n**5. Recuperação:**\n• Restauração de sistemas\n• Monitoramento intensivo\n\n**6. Lições Aprendidas:**\n• Documentação do incidente\n• Melhoria dos processos";
      } else if (lowerInput.includes("criptografia") || lowerInput.includes("encryption") || lowerInput.includes("crypto")) {
        responseContent = "🔐 **Criptografia e Proteção de Dados:**\n\n**Dados em Repouso:**\n• AES-256 para arquivos e bancos de dados\n• Criptografia de disco completo\n• Chaves gerenciadas em HSM/KMS\n\n**Dados em Trânsito:**\n• TLS 1.3 para comunicações web\n• VPN para acesso remoto\n• Certificados digitais válidos\n\n**Gestão de Chaves:**\n• Rotação regular de chaves\n• Separação de ambientes\n• Backup seguro de chaves\n• Controle de acesso rigoroso\n\n**Assinatura Digital:**\n• Certificados ICP-Brasil\n• Timestamping para integridade\n• Validação de certificados";
      } else if (lowerInput.includes("monitoramento") || lowerInput.includes("monitoring") || lowerInput.includes("siem")) {
        responseContent = "📊 **Monitoramento e SIEM:**\n\n**Componentes Essenciais:**\n\n**1. Coleta de Logs:**\n• Sistemas operacionais\n• Aplicações críticas\n• Dispositivos de rede\n• Sistemas de segurança\n\n**2. Correlação de Eventos:**\n• Regras de detecção personalizadas\n• Machine learning para anomalias\n• Integração com threat intelligence\n\n**3. Alertas Inteligentes:**\n• Priorização por criticidade\n• Redução de falsos positivos\n• Escalação automática\n\n**4. Dashboards:**\n• Visão executiva\n• Métricas operacionais\n• Indicadores de risco\n\n**5. Resposta Automatizada:**\n• Bloqueio de IPs maliciosos\n• Isolamento de sistemas\n• Notificações imediatas";
      } else if (lowerInput.includes("treinamento") || lowerInput.includes("training") || lowerInput.includes("conscientização")) {
        responseContent = "🎓 **Treinamento e Conscientização:**\n\n**Programa Estruturado:**\n\n**1. Treinamento Inicial:**\n• Políticas de segurança\n• Senhas seguras\n• Phishing e engenharia social\n• Uso seguro de dispositivos\n\n**2. Treinamentos Específicos:**\n• Por função/departamento\n• Administradores de sistema\n• Desenvolvedores\n• Executivos (whaling)\n\n**3. Simulações Práticas:**\n• Phishing simulado\n• Testes de engenharia social\n• Exercícios de resposta a incidentes\n\n**4. Avaliação Contínua:**\n• Testes de conhecimento\n• Métricas de comportamento\n• Feedback e melhoria\n\n**5. Cultura de Segurança:**\n• Comunicação regular\n• Reconhecimento de boas práticas\n• Canal de denúncias";
      } else if (lowerInput.includes("arquitetura") || lowerInput.includes("architecture") || lowerInput.includes("design")) {
        responseContent = "🏗️ **Arquitetura de Segurança:**\n\n**Princípios Fundamentais:**\n\n**1. Defesa em Profundidade:**\n• Múltiplas camadas de proteção\n• Controles preventivos, detectivos e corretivos\n• Redundância de segurança\n\n**2. Zero Trust:**\n• Nunca confie, sempre verifique\n• Microsegmentação de rede\n• Autenticação contínua\n• Menor privilégio\n\n**3. Segurança por Design:**\n• Security by Design desde o início\n• Privacy by Design\n• Modelagem de ameaças\n• Revisões de segurança\n\n**4. Componentes Técnicos:**\n• Firewalls e IPS/IDS\n• WAF (Web Application Firewall)\n• DLP (Data Loss Prevention)\n• IAM (Identity Access Management)\n• SIEM/SOAR\n• Backup e Disaster Recovery";
      } else if (lowerInput.includes("terceiros") || lowerInput.includes("fornecedor") || lowerInput.includes("vendor")) {
        responseContent = "🤝 **Gestão de Segurança de Terceiros:**\n\n**Due Diligence:**\n• Avaliação de segurança inicial\n• Certificações e conformidade\n• Histórico de incidentes\n• Controles implementados\n\n**Contratos e SLAs:**\n• Cláusulas de segurança\n• Responsabilidades definidas\n• Direito de auditoria\n• Notificação de incidentes\n\n**Monitoramento Contínuo:**\n• Reavaliações periódicas\n• Testes de segurança\n• Métricas de performance\n• Gestão de vulnerabilidades\n\n**Acesso e Integração:**\n• Princípio do menor privilégio\n• Segregação de ambientes\n• Monitoramento de atividades\n• Revogação de acessos";
      } else if (lowerInput.includes("email") || lowerInput.includes("phishing")) {
        responseContent = "📧 **Segurança de Email - Guia Completo:**\n\n**Identificação de Phishing:**\n• Verifique o remetente real (não apenas o nome exibido)\n• Examine URLs antes de clicar (hover sobre links)\n• Desconfie de urgência excessiva\n• Procure erros de ortografia/gramática\n• Questione solicitações não usuais\n\n**Proteções Técnicas:**\n• SPF, DKIM e DMARC configurados\n• Gateway de email com antispam\n• Quarentena de anexos suspeitos\n• Sandboxing de links\n\n**Boas Práticas:**\n• Nunca forneça credenciais via email\n• Use canais alternativos para verificar\n• Reporte emails suspeitos\n• Mantenha software atualizado";
      } else if (lowerInput.includes("password") || lowerInput.includes("senha")) {
        responseContent = "🔑 **Gestão Segura de Senhas:**\n\n**Critérios Técnicos:**\n• Mínimo 12 caracteres\n• Combinação: maiúsculas + minúsculas + números + símbolos\n• Evitar informações pessoais\n• Sem palavras do dicionário\n• Única para cada conta\n\n**Gerenciamento:**\n• Use gerenciador de senhas confiável\n• Ative autenticação multifator (MFA)\n• Altere senhas comprometidas imediatamente\n• Revise acessos regularmente\n\n**Políticas Organizacionais:**\n• Renovação baseada em risco\n• Histórico de senhas\n• Bloqueio após tentativas\n• Educação contínua\n\n**Alternativas Modernas:**\n• Autenticação biométrica\n• Tokens de hardware\n• Certificados digitais";
      } else if (lowerInput.includes("mobile") || lowerInput.includes("celular") || lowerInput.includes("smartphone")) {
        responseContent = "📱 **Segurança Mobile (MDM/MAM):**\n\n**Mobile Device Management:**\n• Política de dispositivos definida\n• Configurações de segurança forçadas\n• Inventário e controle central\n• Wipe remoto em caso de perda\n\n**Aplicações:**\n• App store corporativo\n• Containerização de dados empresariais\n• Prevenção de jailbreak/root\n• Controle de instalação de apps\n\n**Dados:**\n• Criptografia obrigatória\n• Backup seguro\n• Segregação pessoal/corporativo\n• DLP para dispositivos móveis\n\n**Rede:**\n• VPN obrigatória\n• Controle de WiFi\n• Certificados para autenticação\n• Monitoramento de tráfego";
      } else if (lowerInput.includes("cloud") || lowerInput.includes("nuvem")) {
        responseContent = "☁️ **Segurança em Cloud:**\n\n**Modelo de Responsabilidade Compartilhada:**\n• Provider: Segurança DA nuvem\n• Cliente: Segurança NA nuvem\n• Entender limites claramente\n\n**Configuração Segura:**\n• IAM com menor privilégio\n• Criptografia em repouso e trânsito\n• Configurações de rede (VPC, Security Groups)\n• Logging e monitoramento ativados\n\n**Governança:**\n• Cloud Security Posture Management (CSPM)\n• Políticas de uso definidas\n• Inventário de recursos\n• Gestão de custos e compliance\n\n**Multi-Cloud:**\n• Estratégia de backup entre providers\n• Políticas consistentes\n• Ferramentas unificadas de gestão";
      } else if (lowerInput.includes("help") || lowerInput.includes("ajuda") || lowerInput.includes("tip") || lowerInput.includes("advice")) {
        responseContent = "🛡️ **Central de Orientações de Segurança:**\n\nEscolha um tópico para orientações detalhadas:\n\n📋 **Políticas** - Desenvolvimento de políticas de segurança\n⚖️ **Compliance** - LGPD, ISO 27001, SOX, PCI-DSS\n🎯 **Gestão de Riscos** - Análise e tratamento de riscos\n🚨 **Resposta a Incidentes** - Procedimentos e melhores práticas\n🔐 **Criptografia** - Proteção de dados em repouso e trânsito\n📊 **Monitoramento** - SIEM, logs e alertas\n🎓 **Treinamento** - Conscientização e educação\n🏗️ **Arquitetura** - Zero Trust, defesa em profundidade\n🤝 **Terceiros** - Gestão de fornecedores\n📱 **Mobile** - MDM/MAM e segurança móvel\n☁️ **Cloud** - Segurança em ambiente de nuvem\n\nDigite qualquer palavra-chave para orientações específicas!";
      } else {
        responseContent = "🤖 **AI-ron - Consultor de Defesa Cibernética**\n\nEstou aqui para ajudar com orientações abrangentes sobre segurança da informação! Posso fornecer:\n\n• **Políticas e Procedimentos** de segurança\n• **Análise e Gestão de Riscos**\n• **Compliance** (LGPD, ISO 27001, etc.)\n• **Arquitetura de Segurança**\n• **Resposta a Incidentes**\n• **Treinamento e Conscientização**\n• **Segurança em Cloud**\n• **Gestão de Terceiros**\n\nQual área de segurança você gostaria de explorar? Digite uma palavra-chave ou 'ajuda' para ver todas as opções disponíveis.";
      }
      
      const aironMessage: Message = {
        id: `airon-${Date.now()}`,
        sender: "ai",
        content: responseContent,
        timestamp: new Date(),
        bot: "airon"
      };
      
      setMessages(prev => [...prev, aironMessage]);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      content: input,
      timestamp: new Date(),
      bot: activeBot
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    if (activeBot === "z3r0") {
      handleZ3r0Response(input);
    } else {
      handleAIronResponse(input);
    }
  };

  return {
    activeBot,
    setActiveBot,
    messages,
    input,
    setInput,
    userScore,
    isQuizActive,
    selectedQuizOption,
    setSelectedQuizOption,
    handleSendMessage,
    handleQuizSubmit,
    messagesEndRef
  };
};
