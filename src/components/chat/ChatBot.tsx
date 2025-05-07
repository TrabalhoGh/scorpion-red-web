
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, X } from "lucide-react";

type Message = {
  id: string;
  sender: "user" | "bot";
  content: string;
  timestamp: Date;
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Agregar mensaje de bienvenida cuando el componente se monta
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          sender: "bot",
          content: "¡Hola! Soy el asistente de seguridad de Scorpion Security. ¿En qué puedo ayudarte hoy?",
          timestamp: new Date(),
        },
      ]);
    }
  }, [messages.length]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simular respuesta del bot después de un breve retraso
    setTimeout(() => {
      const botResponses = [
        "Gracias por tu mensaje. Nuestro equipo de seguridad te responderá pronto.",
        "¿Necesitas más información sobre nuestros servicios de ciberseguridad?",
        "Puedo ayudarte con información sobre nuestros servicios de vigilancia y sistemas de seguridad.",
        "Nuestros expertos en seguridad están disponibles 24/7 para asistirte.",
        "¿Te gustaría programar una evaluación de seguridad para tu empresa?",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        content: randomResponse,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Botón flotante para abrir el chat */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-50 bg-scorpion-red hover:bg-scorpion-red/80 text-white rounded-full p-3 shadow-lg"
          aria-label="Open chat"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      {/* Ventana de chat */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-80 sm:w-96 bg-black border border-scorpion-red/30 rounded-lg shadow-lg flex flex-col max-h-[500px]">
          {/* Chat header */}
          <div className="bg-scorpion-red p-3 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-white" />
              <h3 className="text-white font-medium">Scorpion Security Chat</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 p-3 overflow-y-auto max-h-80 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-scorpion-red/20 text-white"
                      : "bg-scorpion-gray/30 text-white"
                  }`}
                >
                  <p>{message.content}</p>
                  <div className="text-xs text-white/50 text-right mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat input */}
          <div className="border-t border-scorpion-gray/30 p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Escribe un mensaje..."
                className="flex-1 bg-scorpion-gray/20 border border-scorpion-gray/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-scorpion-red"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-scorpion-red hover:bg-scorpion-red/80 p-2 h-10 w-10"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
