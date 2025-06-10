
export type Message = {
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

export type AttackSimulation = {
  trigger: string;
  attack: string;
  defense: string;
  points: number;
  attackType: string;
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    prevention: string;
  };
};
