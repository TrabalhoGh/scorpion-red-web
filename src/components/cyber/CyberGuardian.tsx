
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, AlertTriangle } from "lucide-react";

const CyberGuardian = () => {
  const [securityStatus, setSecurityStatus] = useState<'scanning' | 'secure' | 'warning'>('scanning');
  
  useEffect(() => {
    // Simulate security scan
    const timer = setTimeout(() => {
      setSecurityStatus(Math.random() > 0.3 ? 'secure' : 'warning');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-black border border-scorpion-red/30 rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex items-center gap-3">
          <div className={`rounded-full p-2 ${
            securityStatus === 'scanning' ? 'bg-scorpion-gray/20 animate-pulse' : 
            securityStatus === 'secure' ? 'bg-green-500/20' : 'bg-yellow-500/20'
          }`}>
            {securityStatus === 'scanning' && <Shield className="h-5 w-5 text-scorpion-red animate-pulse" />}
            {securityStatus === 'secure' && <CheckCircle className="h-5 w-5 text-green-500" />}
            {securityStatus === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
          </div>
          <div>
            <h3 className="font-medium text-white">Cyber Guardian</h3>
            <p className="text-xs text-white/70">
              {securityStatus === 'scanning' && 'Scanning for threats...'}
              {securityStatus === 'secure' && 'Your connection is secure'}
              {securityStatus === 'warning' && 'Potential vulnerabilities detected'}
            </p>
          </div>
          {securityStatus === 'warning' && (
            <Button size="sm" className="ml-auto bg-scorpion-red hover:bg-scorpion-red/80 text-xs">
              Scan Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CyberGuardian;
