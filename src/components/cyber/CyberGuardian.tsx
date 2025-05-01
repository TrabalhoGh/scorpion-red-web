
import React, { useState } from "react";
import { Bot, Shield, Send, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hello! I'm Cyber Guardian, your security assistant. How can I help you protect your systems today?",
    sender: "bot",
    timestamp: new Date(),
  },
];

const CyberGuardian = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const { toast } = useToast();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      toast({
        title: "Cyber Guardian Activated",
        description: "Your security assistant is ready to help.",
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I recommend enabling two-factor authentication for all your accounts to improve security.",
        "Your network might be vulnerable to XSS attacks. Consider implementing Content Security Policy headers.",
        "Regular security audits are crucial for identifying and addressing vulnerabilities.",
        "Make sure all your software is updated to the latest version to protect against known vulnerabilities.",
        "Consider using a password manager to generate and store strong, unique passwords.",
      ];

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 h-14 w-14 rounded-full bg-scorpion-red text-white shadow-lg hover:bg-scorpion-red/80 z-50"
        onClick={toggleChatbot}
      >
        {isOpen ? <X /> : <Bot />}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-[350px] h-[500px] shadow-lg z-50 border-scorpion-red/20 bg-scorpion-gray text-white flex flex-col">
          <CardHeader className="bg-scorpion-red text-white rounded-t-lg p-4 flex-shrink-0">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span>Cyber Guardian</span>
              <Badge className="ml-auto bg-white text-scorpion-red">Assistant</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-y-auto p-4 flex-grow">
            <div className="flex flex-col gap-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-scorpion-red text-white"
                        : "bg-scorpion-black/50 text-white"
                    }`}
                  >
                    <p>{message.text}</p>
                    <span className="text-xs opacity-70 block mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-scorpion-gray/20 flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about security..."
              className="bg-scorpion-black text-white border-scorpion-gray/50"
            />
            <Button
              type="submit"
              variant="outline"
              size="icon"
              className="bg-scorpion-red text-white hover:bg-scorpion-red/80"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Card>
      )}
    </>
  );
};

export default CyberGuardian;
