
import { Bot, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Message } from "../types";

interface ChatMessageProps {
  message: Message;
  selectedQuizOption: number | null;
  onQuizOptionChange: (value: number) => void;
  onQuizSubmit: () => void;
}

const ChatMessage = ({ message, selectedQuizOption, onQuizOptionChange, onQuizSubmit }: ChatMessageProps) => {
  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
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
              onValueChange={(value) => onQuizOptionChange(parseInt(value))}
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
              onClick={onQuizSubmit}
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
  );
};

export default ChatMessage;
