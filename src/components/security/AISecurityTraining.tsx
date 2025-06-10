
import { Bot, ShieldAlert, Trophy, Medal, Star, Code } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import AISecurityChatbots from "./AISecurityChatbots";

const AISecurityTraining = () => {
  const [activeTab, setActiveTab] = useState<'z3r0' | 'airon'>('z3r0');
  const [showChatbots, setShowChatbots] = useState(false);
  
  // Function to activate the simulator
  const handleStartSimulator = () => {
    setShowChatbots(true);
    // Scroll to the simulator section
    setTimeout(() => {
      const simulatorElement = document.getElementById('security-simulator');
      if (simulatorElement) {
        simulatorElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  
  return (
    <section className="py-20 bg-scorpion-gray/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Dual <span className="text-scorpion-red">AI</span> Security Training System
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Our innovative gamified training system uses two specialized AIs to test and educate your team,
            creating a competitive and engaging learning environment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* System Overview */}
          <div className="space-y-8">
            <Card className="bg-scorpion-black border-scorpion-red/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Trophy className="h-6 w-6 text-scorpion-red" />
                  Gamified Learning Environment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/70">
                  Our system transforms cybersecurity training from a tedious task into an engaging game where employees compete, earn points, and receive recognition for their security skills.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card className="bg-scorpion-gray border-scorpion-gray/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-center">
                        <Trophy className="h-8 w-8 text-scorpion-red mx-auto mb-2" />
                        Leaderboards
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-white/70 text-center">
                        Compete with colleagues for top security ranking
                      </CardDescription>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-scorpion-gray border-scorpion-gray/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-center">
                        <Medal className="h-8 w-8 text-scorpion-red mx-auto mb-2" />
                        Digital Badges
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-white/70 text-center">
                        Earn badges for mastering different security skills
                      </CardDescription>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-scorpion-gray border-scorpion-gray/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-center">
                        <Star className="h-8 w-8 text-scorpion-red mx-auto mb-2" />
                        Point System
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-white/70 text-center">
                        Gain points by identifying and avoiding threats
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-scorpion-black border-scorpion-gray/50 overflow-hidden">
                <div className="bg-gradient-to-r from-red-900/30 to-scorpion-black p-6">
                  <div className="flex justify-between items-center mb-4">
                    <Bot className="h-10 w-10 text-scorpion-red" />
                    <div className="px-3 py-1 bg-scorpion-red/20 rounded-full text-sm text-scorpion-red font-mono">
                      Attacker AI
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 font-mono">Z3R0</h3>
                  <p className="text-white/70">
                    Simulates sophisticated cyber attacks to test employee awareness and response capabilities.
                  </p>
                </div>
              </Card>

              <Card className="bg-scorpion-black border-scorpion-gray/50 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-900/30 to-scorpion-black p-6">
                  <div className="flex justify-between items-center mb-4">
                    <ShieldAlert className="h-10 w-10 text-blue-500" />
                    <div className="px-3 py-1 bg-blue-500/20 rounded-full text-sm text-blue-500 font-mono">
                      Defender AI
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 font-mono">AI-ron</h3>
                  <p className="text-white/70">
                    Provides real-time guidance and security advice to help employees identify and avoid threats.
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* AI Details Tabs */}
          <div className="bg-scorpion-black rounded-lg border border-scorpion-gray/30 overflow-hidden shadow-lg">
            <div className="grid grid-cols-2">
              <button 
                className={`py-4 text-center font-bold transition-colors ${activeTab === 'z3r0' ? 'bg-scorpion-red text-white' : 'bg-scorpion-gray text-white/70 hover:bg-scorpion-gray/80'}`}
                onClick={() => setActiveTab('z3r0')}
              >
                Z3R0 Attack AI
              </button>
              <button 
                className={`py-4 text-center font-bold transition-colors ${activeTab === 'airon' ? 'bg-blue-600 text-white' : 'bg-scorpion-gray text-white/70 hover:bg-scorpion-gray/80'}`}
                onClick={() => setActiveTab('airon')}
              >
                AI-ron Defense AI
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'z3r0' ? (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-scorpion-red font-mono">Z3R0: Attack Simulation</h3>
                  
                  <p className="text-white/80">
                    Z3R0 is our advanced offensive AI that simulates realistic cyber attacks against your employees, testing their security awareness in a controlled environment.
                  </p>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Attack Simulations:</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Attack Type</TableHead>
                          <TableHead>Difficulty</TableHead>
                          <TableHead>Points</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Phishing Emails</TableCell>
                          <TableCell>
                            <div className="flex">
                              <Star className="h-4 w-4 fill-scorpion-red text-scorpion-red" />
                              <Star className="h-4 w-4 fill-scorpion-red text-scorpion-red" />
                              <Star className="h-4 w-4 text-gray-500" />
                            </div>
                          </TableCell>
                          <TableCell>50-200</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Social Engineering</TableCell>
                          <TableCell>
                            <div className="flex">
                              <Star className="h-4 w-4 fill-scorpion-red text-scorpion-red" />
                              <Star className="h-4 w-4 fill-scorpion-red text-scorpion-red" />
                              <Star className="h-4 w-4 fill-scorpion-red text-scorpion-red" />
                            </div>
                          </TableCell>
                          <TableCell>100-300</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Password Attacks</TableCell>
                          <TableCell>
                            <div className="flex">
                              <Star className="h-4 w-4 fill-scorpion-red text-scorpion-red" />
                              <Star className="h-4 w-4 fill-scorpion-red text-scorpion-red" />
                              <Star className="h-4 w-4 text-gray-500" />
                            </div>
                          </TableCell>
                          <TableCell>75-250</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-blue-500 font-mono">AI-ron: Defense Consultant</h3>
                  
                  <p className="text-white/80">
                    AI-ron provides real-time guidance and education to help your employees recognize and respond appropriately to security threats.
                  </p>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Defense Capabilities:</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Defense Type</TableHead>
                          <TableHead>Learning Format</TableHead>
                          <TableHead>Badges</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Threat Recognition</TableCell>
                          <TableCell>Interactive Tutorial</TableCell>
                          <TableCell>Security Scout</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Security Best Practices</TableCell>
                          <TableCell>Micro-Learning</TableCell>
                          <TableCell>Cyber Guardian</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Incident Response</TableCell>
                          <TableCell>Simulation</TableCell>
                          <TableCell>Crisis Master</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}

              <div className="mt-8 text-center">
                <Button 
                  className={`${activeTab === 'z3r0' ? 'bg-scorpion-red' : 'bg-blue-600'} hover:opacity-90`}
                  onClick={handleStartSimulator}
                >
                  {showChatbots ? 'Hide Demo' : 'Try Demo'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface - Only show when demo is activated */}
        {showChatbots && (
          <div className="mt-12 animate-fade-in" id="security-simulator">
            <AISecurityChatbots />
          </div>
        )}

        <div className="mt-16 bg-scorpion-black border border-scorpion-gray/30 rounded-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Ready to gamify your security training?</h3>
              <p className="text-white/70">Transform how your team learns about cybersecurity with our dual AI system</p>
            </div>
            <Button 
              className="bg-scorpion-red hover:bg-scorpion-red/80 px-6"
              onClick={handleStartSimulator}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISecurityTraining;
