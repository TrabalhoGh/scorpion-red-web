
import { Brain, Shield, Code } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SecurityStatsProps {
  userScore: number;
}

const SecurityStats = ({ userScore }: SecurityStatsProps) => {
  const getDefenseLevel = (score: number) => {
    if (score < 100) return "Rookie";
    if (score < 300) return "Guardian";
    if (score < 600) return "Expert";
    return "Master";
  };

  return (
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
            {getDefenseLevel(userScore)}
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
  );
};

export default SecurityStats;
