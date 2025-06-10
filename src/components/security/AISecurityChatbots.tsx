
import { Bot, ShieldAlert, Send, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatMessage from "./components/ChatMessage";
import SecurityStats from "./components/SecurityStats";
import { useChatBot } from "./hooks/useChatBot";

const AISecurityChatbots = () => {
  const {
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
  } = useChatBot();

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
                <ChatMessage
                  key={message.id}
                  message={message}
                  selectedQuizOption={selectedQuizOption}
                  onQuizOptionChange={setSelectedQuizOption}
                  onQuizSubmit={handleQuizSubmit}
                />
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
      
      <SecurityStats userScore={userScore} />
    </div>
  );
};

export default AISecurityChatbots;
