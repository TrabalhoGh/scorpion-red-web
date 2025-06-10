
import { Bot, Shield, Trophy, Target, Brain, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import AISecurityChatbots from "../security/AISecurityChatbots";

const CyberChallenge = () => {
  const [showSimulator, setShowSimulator] = useState(false);

  const handleStartChallenge = () => {
    setShowSimulator(true);
    // Scroll to the simulator section
    setTimeout(() => {
      const simulatorElement = document.getElementById('challenge-simulator');
      if (simulatorElement) {
        simulatorElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section className="py-20 bg-scorpion-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Cyber Security <span className="text-scorpion-red">Challenge</span>
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Test your cybersecurity skills with our AI-powered attack simulations. 
            Learn to identify threats and protect yourself against real-world cyber attacks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-scorpion-gray border-scorpion-red/30 text-center">
            <CardHeader>
              <Target className="h-12 w-12 text-scorpion-red mx-auto mb-4" />
              <CardTitle className="text-xl">Attack Simulation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/70">
                Face realistic cyber attacks and learn to identify threats before they compromise your security.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-scorpion-gray border-blue-500/30 text-center">
            <CardHeader>
              <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <CardTitle className="text-xl">Defense Training</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/70">
                Get expert guidance on security best practices and learn how to protect yourself effectively.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-scorpion-gray border-yellow-500/30 text-center">
            <CardHeader>
              <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <CardTitle className="text-xl">Earn Points</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/70">
                Score points by correctly identifying threats and demonstrate your cybersecurity expertise.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-8">
          <Button 
            size="lg" 
            className="bg-scorpion-red hover:bg-scorpion-red/80 text-white text-lg px-8 py-4"
            onClick={handleStartChallenge}
          >
            <Brain className="mr-2 h-5 w-5" />
            Start Challenge
          </Button>
        </div>

        {/* Simulator Interface */}
        {showSimulator && (
          <div className="mt-12 animate-fade-in" id="challenge-simulator">
            <AISecurityChatbots />
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-scorpion-gray/50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-scorpion-red">30+</div>
            <div className="text-sm text-white/70">Attack Types</div>
          </div>
          <div className="bg-scorpion-gray/50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-500">2</div>
            <div className="text-sm text-white/70">AI Specialists</div>
          </div>
          <div className="bg-scorpion-gray/50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-yellow-500">∞</div>
            <div className="text-sm text-white/70">Learning Opportunities</div>
          </div>
          <div className="bg-scorpion-gray/50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-500">24/7</div>
            <div className="text-sm text-white/70">Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CyberChallenge;
