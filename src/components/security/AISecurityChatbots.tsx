
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bot, ShieldAlert, Send, User, Code, Brain, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Message = {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
  bot: "z3r0" | "airon";
  type?: "quiz" | "regular";
  quizData?: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    prevention: string;
  };
};

const simulatedAttacks = [
  {
    trigger: "password",
    attack: "Your password appears to be weak. Click here to update it: http://security-update.totallylegit.com",
    defense: "This is a phishing attempt! Never click on suspicious links asking for your password, even if they look legitimate.",
    points: 50,
    attackType: "Phishing",
    quiz: {
      question: "Que tipo de ataque foi simulado?",
      options: ["Malware", "Phishing", "Social Engineering", "DDoS"],
      correctAnswer: 1,
      explanation: "Este foi um ataque de Phishing - uma tentativa de roubar credenciais através de links maliciosos que imitam sites legítimos.",
      prevention: "Para evitar phishing: 1) Sempre verifique URLs antes de clicar, 2) Digite URLs manualmente no navegador, 3) Use autenticação de dois fatores, 4) Mantenha-se atualizado sobre técnicas de phishing, 5) Nunca forneça credenciais através de links em emails."
    }
  },
  {
    trigger: "help",
    attack: "I'm from IT support. We detected unusual activity on your account. Please download this security patch: securitypatch.exe",
    defense: "This is a social engineering attack! IT will never ask you to download files through chat. Always verify through official channels.",
    points: 75,
    attackType: "Social Engineering",
    quiz: {
      question: "Qual foi o tipo de ataque utilizado?",
      options: ["Ransomware", "Social Engineering", "Man-in-the-Middle", "SQL Injection"],
      correctAnswer: 1,
      explanation: "Este foi um ataque de Engenharia Social - manipulação psicológica para fazer a vítima executar ações que comprometam a segurança.",
      prevention: "Para evitar engenharia social: 1) Sempre verifique a identidade através de canais oficiais, 2) Seja cético com solicitações urgentes, 3) Nunca baixe arquivos de fontes não verificadas, 4) Treine funcionários sobre essas táticas, 5) Estabeleça protocolos claros para solicitações de TI."
    }
  },
  {
    trigger: "access",
    attack: "I need temporary access to your account to fix a server issue. Can you share your login credentials?",
    defense: "This is a credential harvesting attempt! Never share your login details with anyone, even if they claim to be from IT.",
    points: 100,
    attackType: "Credential Harvesting",
    quiz: {
      question: "Este ataque é classificado como:",
      options: ["Credential Harvesting", "Keylogger", "Brute Force", "Password Spray"],
      correctAnswer: 0,
      explanation: "Este foi um ataque de Coleta de Credenciais - tentativa direta de obter login e senha através de solicitação fraudulenta.",
      prevention: "Para evitar coleta de credenciais: 1) Nunca compartilhe senhas com ninguém, 2) Use senhas únicas para cada conta, 3) Implemente autenticação multifator, 4) Eduque sobre políticas de senha, 5) Use gerenciadores de senha."
    }
  },
  {
    trigger: "urgent",
    attack: "URGENT: Your account will be suspended in 1 hour. Verify your identity by providing your employee ID and date of birth.",
    defense: "This is creating false urgency! Legitimate communications don't pressure you to act quickly without verification.",
    points: 60,
    attackType: "Urgency Scam",
    quiz: {
      question: "Que tática foi usada neste ataque?",
      options: ["Urgency Scam", "Spear Phishing", "Watering Hole", "Pretexting"],
      correctAnswer: 0,
      explanation: "Este foi um Golpe de Urgência - criar falsa pressão temporal para fazer a vítima agir sem pensar adequadamente.",
      prevention: "Para evitar golpes de urgência: 1) Sempre tome tempo para verificar, 2) Contate a organização por canais oficiais, 3) Desconfie de prazos artificiais, 4) Verifique a legitimidade antes de agir, 5) Nunca forneça dados pessoais sob pressão."
    }
  },
  {
    trigger: "file",
    attack: "Here's the document you requested: QuarterlyReport.docx.exe",
    defense: "Watch out for suspicious file extensions! Executable files (.exe) disguised as documents are a common attack vector.",
    points: 80,
    attackType: "Malware",
    quiz: {
      question: "Qual tipo de ataque foi tentado?",
      options: ["Trojans", "Malware", "Spyware", "Adware"],
      correctAnswer: 1,
      explanation: "Este foi um ataque de Malware - software malicioso disfarçado como documento legítimo com dupla extensão (.docx.exe).",
      prevention: "Para evitar malware: 1) Sempre verifique extensões de arquivo, 2) Use antivírus atualizado, 3) Não execute arquivos suspeitos, 4) Mantenha software atualizado, 5) Faça backup regular dos dados."
    }
  },
  {
    trigger: "wifi",
    attack: "Connect to our free WiFi network 'Free_Internet_Here' - no password required! Just click here to accept terms: bit.ly/freewifi123",
    defense: "This is an evil twin attack! Avoid connecting to suspicious open networks and never click on shortened URLs from unknown sources.",
    points: 90,
    attackType: "Evil Twin",
    quiz: {
      question: "Este é um exemplo de qual ataque?",
      options: ["Evil Twin", "WPS Attack", "WEP Cracking", "Rogue Access Point"],
      correctAnswer: 0,
      explanation: "Este foi um ataque Evil Twin - criação de rede WiFi falsa que imita uma legítima para interceptar dados.",
      prevention: "Para evitar Evil Twin: 1) Evite redes WiFi abertas, 2) Verifique nomes de rede com funcionários, 3) Use VPN em redes públicas, 4) Desative conexão automática, 5) Use dados móveis quando possível."
    }
  },
  {
    trigger: "bank",
    attack: "ALERT: Suspicious activity detected on your bank account. Please verify your details immediately: chase-security-check.net",
    defense: "This is a banking phishing scam! Banks never ask for credentials via email. Always navigate directly to the official website.",
    points: 85,
    attackType: "Banking Phishing",
    quiz: {
      question: "Que tipo específico de phishing foi usado?",
      options: ["Spear Phishing", "Banking Phishing", "Whaling", "Vishing"],
      correctAnswer: 1,
      explanation: "Este foi um Phishing Bancário - tentativa específica de roubar credenciais bancárias imitando comunicações oficiais do banco.",
      prevention: "Para evitar phishing bancário: 1) Bancos nunca pedem credenciais por email, 2) Sempre acesse o site oficial digitando a URL, 3) Verifique certificados SSL, 4) Use aplicativos oficiais do banco, 5) Configure alertas de transações."
    }
  }
];

const getRandomAttack = () => {
  const randomIndex = Math.floor(Math.random() * simulatedAttacks.length);
  return simulatedAttacks[randomIndex];
};

const AISecurityChatbots = () => {
  const [activeBot, setActiveBot] = useState<"z3r0" | "airon">("z3r0");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [isAttackActive, setIsAttackActive] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentAttack, setCurrentAttack] = useState<typeof simulatedAttacks[0] | null>(null);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom when messages update
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    // Initial messages when component loads
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
      content: "Hello! I'm AI-ron, your cybersecurity defense consultant. I'm here to help you identify and avoid potential security threats. I can provide guidance on phishing, social engineering, malware, and many other attack types. How can I assist you today?",
      timestamp: new Date(),
      bot: "airon" as const
    };

    setMessages([initialZ3r0Message, initialAironMessage]);
  }, []);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      content: input,
      timestamp: new Date(),
      bot: activeBot
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Process message based on active bot
    if (activeBot === "z3r0") {
      handleZ3r0Response(input);
    } else {
      handleAIronResponse(input);
    }
  };

  const handleQuizSubmit = () => {
    if (selectedQuizOption === null || !currentAttack) return;

    const isCorrect = selectedQuizOption === currentAttack.quiz.correctAnswer;
    const quizPoints = isCorrect ? currentAttack.points + 50 : Math.floor(currentAttack.points / 2);

    // Show quiz result
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

    // Show prevention tips
    setTimeout(() => {
      const preventionMessage: Message = {
        id: `z3r0-prevention-${Date.now()}`,
        sender: "ai",
        content: `📚 Como se proteger contra ${currentAttack.attackType}:\n\n${currentAttack.quiz.prevention}`,
        timestamp: new Date(),
        bot: "z3r0"
      };

      setMessages(prev => [...prev, preventionMessage]);

      // Reset states and prompt for next challenge
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
    // Simulate thinking time
    setTimeout(() => {
      if (!isAttackActive && !isQuizActive) {
        // Start a new attack
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
        // User is responding to an attack - check their response first
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
          // User correctly identified attack initially
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
          // User failed to identify attack initially
          const failMessage: Message = {
            id: `z3r0-${Date.now()}`,
            sender: "ai",
            content: `That was a security test, and you didn't identify the threat initially. ${currentAttack.defense} ⚠️`,
            timestamp: new Date(),
            bot: "z3r0"
          };
          
          setMessages(prev => [...prev, failMessage]);
        }

        // Now start the quiz regardless of initial response
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
    // Simulate thinking time
    setTimeout(() => {
      const lowerInput = userInput.toLowerCase();
      let responseContent = "";
      
      // Enhanced keyword detection for security advice
      if (lowerInput.includes("email") || lowerInput.includes("phishing")) {
        responseContent = "Email security tips: 1) Verify sender addresses carefully, 2) Hover over links before clicking, 3) Be suspicious of urgent language, 4) Check for spelling/grammar errors, 5) Never provide sensitive info via email.";
      } else if (lowerInput.includes("password")) {
        responseContent = "Password security best practices: 1) Use unique passwords for each account, 2) Include uppercase, lowercase, numbers & symbols, 3) Use a password manager, 4) Enable two-factor authentication, 5) Never share passwords.";
      } else if (lowerInput.includes("link") || lowerInput.includes("url")) {
        responseContent = "Link safety guidelines: 1) Hover to preview URLs, 2) Check domain spelling carefully, 3) Avoid shortened URLs from unknown sources, 4) Navigate directly to websites when possible, 5) Use URL checkers for suspicious links.";
      } else if (lowerInput.includes("download") || lowerInput.includes("file") || lowerInput.includes("attachment")) {
        responseContent = "File security protocols: 1) Only download from trusted sources, 2) Scan files with antivirus before opening, 3) Be wary of double extensions (.pdf.exe), 4) Avoid executable files from emails, 5) Verify unexpected attachments with senders.";
      } else if (lowerInput.includes("wifi") || lowerInput.includes("network")) {
        responseContent = "WiFi security measures: 1) Avoid open public networks, 2) Use VPN on untrusted networks, 3) Verify network names with staff, 4) Turn off auto-connect features, 5) Use mobile hotspot when possible.";
      } else if (lowerInput.includes("social") || lowerInput.includes("engineering")) {
        responseContent = "Social engineering protection: 1) Verify identity through official channels, 2) Be suspicious of urgent requests, 3) Don't provide info over phone/email, 4) Question unexpected contact, 5) Trust your instincts if something feels wrong.";
      } else if (lowerInput.includes("bank") || lowerInput.includes("financial")) {
        responseContent = "Financial security tips: 1) Banks never ask for credentials via email, 2) Log in directly to official websites, 3) Monitor accounts regularly, 4) Set up account alerts, 5) Report suspicious activity immediately.";
      } else if (lowerInput.includes("update") || lowerInput.includes("software")) {
        responseContent = "Software security practices: 1) Only update from official sources, 2) Enable automatic updates when possible, 3) Verify update authenticity, 4) Avoid third-party update tools, 5) Keep all software current.";
      } else if (lowerInput.includes("ceo") || lowerInput.includes("boss") || lowerInput.includes("executive")) {
        responseContent = "Business Email Compromise protection: 1) Verify unusual requests through separate communication, 2) Be suspicious of urgent financial requests, 3) Check email addresses carefully, 4) Follow company approval processes, 5) When in doubt, call to confirm.";
      } else if (lowerInput.includes("crypto") || lowerInput.includes("bitcoin") || lowerInput.includes("investment")) {
        responseContent = "Cryptocurrency scam prevention: 1) No legitimate service guarantees returns, 2) Research before investing, 3) Beware of 'get rich quick' schemes, 4) Use official exchanges only, 5) Never send crypto to 'double' it.";
      } else if (lowerInput.includes("help") || lowerInput.includes("tip") || lowerInput.includes("advice")) {
        responseContent = "General cybersecurity principles: 1) Verify before you trust, 2) Keep software updated, 3) Use strong authentication, 4) Back up important data regularly, 5) Report suspicious activities to your security team, 6) Stay educated about new threats.";
      } else {
        responseContent = "I'm here to help with cybersecurity questions! Ask me about phishing, social engineering, password security, safe browsing, or any other security topic. Remember: when in doubt, verify through official channels and trust your instincts.";
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

  const filteredMessages = messages.filter(message => message.bot === activeBot);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Tabs defaultValue="z3r0" onValueChange={(value) => setActiveBot(value as "z3r0" | "airon")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger 
            value="z3r0" 
            className={`${activeBot === 'z3r0' ? 'bg-scorpion-red text-white' : ''} flex items-center gap-2`}
          >
            <Bot className="h-4 w-4" />
            Z3R0 Attack Simulator
          </TabsTrigger>
          <TabsTrigger 
            value="airon" 
            className={`${activeBot === 'airon' ? 'bg-blue-600 text-white' : ''} flex items-center gap-2`}
          >
            <Shield className="h-4 w-4" />
            AI-ron Defense Consultant
          </TabsTrigger>
        </TabsList>

        <div className="mt-4 bg-scorpion-black border border-scorpion-gray/30 rounded-lg overflow-hidden">
          {/* Chat Header */}
          <div className={`p-4 flex items-center gap-3 border-b border-scorpion-gray/30 ${activeBot === 'z3r0' ? 'bg-gradient-to-r from-red-900/30 to-scorpion-black' : 'bg-gradient-to-r from-blue-900/30 to-scorpion-black'}`}>
            <div className={`rounded-full p-2 ${activeBot === 'z3r0' ? 'bg-scorpion-red/20' : 'bg-blue-500/20'}`}>
              {activeBot === 'z3r0' ? (
                <Bot className="h-6 w-6 text-scorpion-red" />
              ) : (
                <ShieldAlert className="h-6 w-6 text-blue-500" />
              )}
            </div>
            <div>
              <h3 className="font-bold text-xl font-mono">
                {activeBot === 'z3r0' ? 'Z3R0' : 'AI-ron'}
              </h3>
              <p className="text-xs text-white/70">
                {activeBot === 'z3r0' 
                  ? 'Attack Simulation AI - 30+ Attack Types + Quiz' 
                  : 'Defense Consultant AI - Expert Guidance'}
              </p>
            </div>
            {activeBot === 'z3r0' && (
              <div className="ml-auto bg-scorpion-gray/30 px-3 py-1 rounded-full text-sm">
                <span className="font-mono text-white">Score: {userScore}</span>
              </div>
            )}
          </div>
          
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-4">
            <div className="space-y-4">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-scorpion-gray/50 text-white'
                        : message.bot === 'z3r0'
                        ? 'bg-scorpion-red/20 text-white'
                        : 'bg-blue-600/20 text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.sender === 'user' ? (
                        <>
                          <span className="font-semibold">You</span>
                          <User className="h-4 w-4" />
                        </>
                      ) : message.bot === 'z3r0' ? (
                        <>
                          <Bot className="h-4 w-4 text-scorpion-red" />
                          <span className="font-semibold text-scorpion-red">Z3R0</span>
                        </>
                      ) : (
                        <>
                          <Shield className="h-4 w-4 text-blue-500" />
                          <span className="font-semibold text-blue-500">AI-ron</span>
                        </>
                      )}
                    </div>
                    
                    {message.type === 'quiz' && message.quizData ? (
                      <div className="space-y-3">
                        <p className="font-semibold text-yellow-400">🧠 Quiz de Segurança:</p>
                        <p className="whitespace-pre-wrap">{message.quizData.question}</p>
                        <RadioGroup 
                          value={selectedQuizOption?.toString()} 
                          onValueChange={(value) => setSelectedQuizOption(parseInt(value))}
                          className="space-y-2"
                        >
                          {message.quizData.options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                              <label htmlFor={`option-${index}`} className="text-sm cursor-pointer">
                                {option}
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
                        <Button 
                          onClick={handleQuizSubmit}
                          disabled={selectedQuizOption === null}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white"
                        >
                          Enviar Resposta
                        </Button>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    )}
                    
                    <div className="text-xs text-white/50 text-right mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Chat Input */}
          <div className="border-t border-scorpion-gray/30 p-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={`Chat with ${activeBot === 'z3r0' ? 'Z3R0' : 'AI-ron'}...`}
                className="flex-1 bg-scorpion-gray/20 border border-scorpion-gray/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-scorpion-red text-white"
                disabled={isQuizActive}
              />
              <Button 
                onClick={handleSendMessage}
                className={activeBot === 'z3r0' ? 'bg-scorpion-red' : 'bg-blue-600'}
                disabled={isQuizActive}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {isQuizActive && (
              <p className="text-xs text-yellow-400 mt-2">
                📝 Complete o quiz acima antes de continuar
              </p>
            )}
          </div>
        </div>
      </Tabs>
      
      {/* Gamification Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <Card className="bg-scorpion-black border-scorpion-gray/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-center flex flex-col items-center">
              <Brain className="h-8 w-8 text-scorpion-red mb-2" />
              <span>Security Score</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <span className="text-3xl font-mono text-scorpion-red">{userScore}</span>
            <p className="text-xs text-white/70 mt-2">Points earned from passing security tests</p>
          </CardContent>
        </Card>
        
        <Card className="bg-scorpion-black border-scorpion-gray/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-center flex flex-col items-center">
              <Shield className="h-8 w-8 text-scorpion-red mb-2" />
              <span>Defense Level</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <span className="text-3xl font-mono text-scorpion-red">
              {userScore < 100 ? "Rookie" : userScore < 300 ? "Guardian" : userScore < 600 ? "Expert" : "Master"}
            </span>
            <p className="text-xs text-white/70 mt-2">Your current security expertise level</p>
          </CardContent>
        </Card>
        
        <Card className="bg-scorpion-black border-scorpion-gray/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-center flex flex-col items-center">
              <Code className="h-8 w-8 text-scorpion-red mb-2" />
              <span>Attacks Avoided</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <span className="text-3xl font-mono text-scorpion-red">
              {Math.floor(userScore / 50)}
            </span>
            <p className="text-xs text-white/70 mt-2">Successfully identified security threats</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AISecurityChatbots;
