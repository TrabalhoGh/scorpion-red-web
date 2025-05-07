import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LockKeyhole } from "lucide-react";

const CyberChallenge = () => {
  const [showChallenge, setShowChallenge] = useState(false);
  
  return (
    <div className="fixed bottom-4 left-4 z-50">
      {!showChallenge ? (
        <Button 
          onClick={() => setShowChallenge(true)}
          className="bg-black border border-scorpion-red hover:bg-scorpion-gray/20 text-scorpion-red flex items-center gap-2"
        >
          <LockKeyhole className="h-4 w-4" />
          Cyber Challenge
        </Button>
      ) : (
        <div className="bg-black border border-scorpion-red/30 rounded-lg shadow-lg p-4 max-w-sm">
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-white flex items-center gap-2">
              <LockKeyhole className="h-4 w-4 text-scorpion-red" />
              Cyber Challenge
            </h3>
            <p className="text-xs text-white/70">
              Test your security awareness by finding the hidden vulnerability.
            </p>
            <div className="flex items-center justify-between mt-2">
              <Button 
                onClick={() => setShowChallenge(false)} 
                variant="outline" 
                className="text-xs border-scorpion-gray/50 text-white/70 hover:bg-scorpion-gray/20"
              >
                Later
              </Button>
              <Button 
                className="text-xs bg-scorpion-red hover:bg-scorpion-red/80"
              >
                Start Challenge
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CyberChallenge;
