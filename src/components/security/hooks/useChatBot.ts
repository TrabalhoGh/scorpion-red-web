
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
      content: "Hello! I'm AI-ron, your cybersecurity defense consultant. I'm here to help you identify and avoid potential security threats. I can provide guidance on phishing, social engineering, malware, and many other attack types. How can I assist you today?",
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
