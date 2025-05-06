
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bot, ShieldAlert, Send, User, Code, Brain, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Message = {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
  bot: "z3r0" | "airon";
};

const simulatedAttacks = [
  {
    trigger: "password",
    attack: "Your password appears to be weak. Click here to update it: http://security-update.totallylegit.com",
    defense: "This is a phishing attempt! Never click on suspicious links asking for your password, even if they look legitimate.",
    points: 50
  },
  {
    trigger: "help",
    attack: "I'm from IT support. We detected unusual activity on your account. Please download this security patch: securitypatch.exe",
    defense: "This is a social engineering attack! IT will never ask you to download files through chat. Always verify through official channels.",
    points: 75
  },
  {
    trigger: "access",
    attack: "I need temporary access to your account to fix a server issue. Can you share your login credentials?",
    defense: "This is a credential harvesting attempt! Never share your login details with anyone, even if they claim to be from IT.",
    points: 100
  },
  {
    trigger: "urgent",
    attack: "URGENT: Your account will be suspended in 1 hour. Verify your identity by providing your employee ID and date of birth.",
    defense: "This is creating false urgency! Legitimate communications don't pressure you to act quickly without verification.",
    points: 60
  },
  {
    trigger: "file",
    attack: "Here's the document you requested: QuarterlyReport.docx.exe",
    defense: "Watch out for suspicious file extensions! Executable files (.exe) disguised as documents are a common attack vector.",
    points: 80
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
  const [currentAttack, setCurrentAttack] = useState<typeof simulatedAttacks[0] | null>(null);
  
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
      content: "Hello user. I am Z3R0, your security testing assistant. I will simulate various cyber attacks to test your security awareness. Type anything to begin...",
      timestamp: new Date(),
      bot: "z3r0" as const
    };

    const initialAironMessage = {
      id: "airon-initial",
      sender: "ai" as const,
      content: "Hello! I'm AI-ron, your cybersecurity defense consultant. I'm here to help you identify and avoid potential security threats. How can I assist you today?",
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
  
  const handleZ3r0Response = (userInput: string) => {
    // Simulate thinking time
    setTimeout(() => {
      if (!isAttackActive) {
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
      } else if (isAttackActive && currentAttack) {
        // User is responding to an attack
        // Check if user identified the attack (simplified logic)
        const userDetectedThreat = userInput.toLowerCase().includes("attack") || 
                                  userInput.toLowerCase().includes("threat") ||
                                  userInput.toLowerCase().includes("scam") ||
                                  userInput.toLowerCase().includes("phishing") ||
                                  userInput.toLowerCase().includes("no");
        
        if (userDetectedThreat) {
          // User correctly identified attack
          const successMessage: Message = {
            id: `z3r0-${Date.now()}`,
            sender: "ai",
            content: `Great job! You identified the security threat. You've earned ${currentAttack.points} points!`,
            timestamp: new Date(),
            bot: "z3r0"
          };
          
          setMessages(prev => [...prev, successMessage]);
          setUserScore(prev => prev + currentAttack.points);
        } else {
          // User failed to identify attack
          const failMessage: Message = {
            id: `z3r0-${Date.now()}`,
            sender: "ai",
            content: `That was a security test, and unfortunately you didn't identify the threat. The message I sent was an example of a cyber attack. Stay vigilant!`,
            timestamp: new Date(),
            bot: "z3r0"
          };
          
          setMessages(prev => [...prev, failMessage]);
        }
        
        // Reset attack state
        setIsAttackActive(false);
        setCurrentAttack(null);
        
        // Prompt for next interaction
        setTimeout(() => {
          const nextPromptMessage: Message = {
            id: `z3r0-${Date.now() + 1}`,
            sender: "ai",
            content: "Would you like to try another security test? Type anything to continue.",
            timestamp: new Date(),
            bot: "z3r0"
          };
          
          setMessages(prev => [...prev, nextPromptMessage]);
        }, 1000);
      }
    }, 1000);
  };
  
  const handleAIronResponse = (userInput: string) => {
    // Simulate thinking time
    setTimeout(() => {
      const lowerInput = userInput.toLowerCase();
      let responseContent = "";
      
      // Check for keywords to provide relevant security advice
      if (lowerInput.includes("email") || lowerInput.includes("phishing")) {
        responseContent = "Email security tip: Always verify the sender's email address before clicking on links or downloading attachments. Legitimate organizations won't ask for sensitive information via email.";
      } else if (lowerInput.includes("password")) {
        responseContent = "Password security tip: Use strong, unique passwords for each account and consider using a password manager. Enable two-factor authentication whenever possible.";
      } else if (lowerInput.includes("link") || lowerInput.includes("url")) {
        responseContent = "Link security tip: Hover over links to preview the URL before clicking. Make sure the domain matches the official website. When in doubt, navigate to the website directly instead of clicking the link.";
      } else if (lowerInput.includes("download") || lowerInput.includes("file")) {
        responseContent = "File security tip: Only download files from trusted sources. Be wary of executable files (.exe, .bat, .js) or documents that request to enable macros.";
      } else if (lowerInput.includes("help") || lowerInput.includes("tip") || lowerInput.includes("advice")) {
        responseContent = "General security tips: 1) Verify before you trust, 2) Keep software updated, 3) Use strong authentication, 4) Back up important data, 5) Report suspicious activities to your security team.";
      } else {
        responseContent = "Remember to always verify the identity of individuals requesting information. When in doubt, contact your IT department through official channels. Would you like specific security advice on a particular topic?";
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
                  ? 'Attack Simulation AI' 
                  : 'Defense Consultant AI'}
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
                    <p className="whitespace-pre-wrap">{message.content}</p>
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
                className="flex-1 bg-scorpion-gray/20 border border-scorpion-gray/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-scorpion-red"
              />
              <Button 
                onClick={handleSendMessage}
                className={activeBot === 'z3r0' ? 'bg-scorpion-red' : 'bg-blue-600'}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
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
              {userScore < 100 ? "Rookie" : userScore < 300 ? "Guardian" : "Master"}
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
