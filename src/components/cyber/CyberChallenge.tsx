
import React, { useState, useEffect } from "react";
import { Award, Star, TrendingUp, ShieldAlert, X } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

type Challenge = {
  id: number;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  completed: boolean;
};

const initialChallenges: Challenge[] = [
  {
    id: 1,
    title: "Phishing Defender",
    description: "Identify and avoid 5 phishing attempts",
    difficulty: "easy",
    points: 100,
    completed: false,
  },
  {
    id: 2,
    title: "Password Master",
    description: "Create a strong password that meets all security requirements",
    difficulty: "medium",
    points: 200,
    completed: false,
  },
  {
    id: 3,
    title: "Firewall Expert",
    description: "Configure a virtual firewall to block all malicious traffic",
    difficulty: "hard",
    points: 300,
    completed: false,
  },
];

const badges = [
  { name: "Security Novice", icon: <Star className="h-5 w-5" /> },
  { name: "Cyber Defender", icon: <ShieldAlert className="h-5 w-5" /> },
  { name: "Security Expert", icon: <Award className="h-5 w-5" /> },
];

const CyberChallenge = () => {
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [userPoints, setUserPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  const pointsToNextLevel = level * 500;
  
  useEffect(() => {
    // Calculate progress to next level
    const newProgress = (userPoints % pointsToNextLevel) / pointsToNextLevel * 100;
    setProgress(newProgress);
    
    // Level up if enough points
    if (userPoints >= level * 500) {
      setLevel(prev => prev + 1);
      toast({
        title: "Level Up!",
        description: `Congratulations! You've reached level ${level + 1}`,
      });
    }
  }, [userPoints, level, pointsToNextLevel, toast]);
  
  const completeChallenge = (challengeId: number) => {
    setChallenges(prev => 
      prev.map(challenge => 
        challenge.id === challengeId 
          ? { ...challenge, completed: true } 
          : challenge
      )
    );
    
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge && !challenge.completed) {
      setUserPoints(prev => prev + challenge.points);
      toast({
        title: "Challenge Completed!",
        description: `You earned ${challenge.points} points!`,
      });
    }
  };
  
  return (
    <>
      <Button 
        variant="outline"
        size="icon"
        className="fixed bottom-4 left-4 h-14 w-14 rounded-full bg-scorpion-red text-white shadow-lg hover:bg-scorpion-red/80 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Award />}
      </Button>
      
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="bg-scorpion-gray text-white">
          <DrawerHeader className="bg-scorpion-red text-white rounded-t-lg">
            <DrawerTitle className="flex items-center gap-2 text-xl">
              <Award className="h-6 w-6" />
              Cyber Security Challenges
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            <div className="bg-scorpion-black/30 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-scorpion-red" />
                  <span className="font-bold">Level {level}</span>
                </div>
                <span className="font-bold">{userPoints} XP</span>
              </div>
              <Progress value={progress} className="h-2 bg-scorpion-black" />
              <div className="text-xs text-right mt-1">{Math.round(progress)}% to level {level+1}</div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-bold text-lg">Your Badges</h3>
              <div className="flex flex-wrap gap-2">
                {badges.map((badge, index) => (
                  <Badge 
                    key={index} 
                    className={`bg-scorpion-black flex items-center gap-1 p-2 ${index > userPoints/200 ? "opacity-40" : ""}`}
                  >
                    {badge.icon}
                    {badge.name}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-bold text-lg">Challenges</h3>
              {challenges.map((challenge) => (
                <div key={challenge.id} className="bg-scorpion-black/30 p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold">{challenge.title}</h4>
                      <p className="text-sm text-white/70">{challenge.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`
                          ${challenge.difficulty === 'easy' ? 'bg-green-500' : 
                            challenge.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'}
                        `}>
                          {challenge.difficulty}
                        </Badge>
                        <span className="text-xs">{challenge.points} points</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline"
                      size="sm"
                      disabled={challenge.completed}
                      onClick={() => completeChallenge(challenge.id)}
                      className={`min-w-20 ${challenge.completed ? 'bg-green-500/20 text-white/50' : 'bg-scorpion-red'}`}
                    >
                      {challenge.completed ? "Completed" : "Start"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" className="border-white/20 hover:bg-scorpion-black/30">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CyberChallenge;
