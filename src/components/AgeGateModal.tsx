import { useState, useEffect } from "react";
import { LiquidButton } from "./LiquidButton";
import { AlertTriangle } from "lucide-react";

interface AgeGateModalProps {
  onConfirm: () => void;
}

export const AgeGateModal = ({ onConfirm }: AgeGateModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConfirmed = localStorage.getItem("epsteingpt-age-confirmed");
    if (!hasConfirmed) {
      setIsVisible(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem("epsteingpt-age-confirmed", "true");
    setIsVisible(false);
    onConfirm();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" />
      
      {/* Modal */}
      <div className="relative glass-card p-10 max-w-lg w-full text-center fade-in-up">
        {/* Warning icon */}
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 pulse-glow">
          <AlertTriangle className="w-8 h-8 text-primary" />
        </div>

        <h2 className="font-display text-3xl font-bold text-foreground mb-4">
          18+ Required
        </h2>
        
        <p className="font-mono text-sm text-muted-foreground mb-6 leading-relaxed">
          This platform contains sensitive legal documents, including references to criminal allegations, 
          witness testimony, and disturbing content. By entering, you confirm you are 18 years or older 
          and consent to viewing such material.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <LiquidButton variant="primary" onClick={handleConfirm}>
            I am 18+ — Enter
          </LiquidButton>
          <LiquidButton
            variant="ghost"
            onClick={() => window.location.href = "https://google.com"}
          >
            Leave
          </LiquidButton>
        </div>

        <p className="font-mono text-[10px] text-muted-foreground/50 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};
