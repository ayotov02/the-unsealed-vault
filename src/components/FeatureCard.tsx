import { ReactNode, useState, useRef } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
}

export const FeatureCard = ({ title, description, icon, delay = 0 }: FeatureCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      className="glass-card p-8 relative overflow-hidden group cursor-pointer fade-in-up"
      style={{ animationDelay: `${delay}s` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover spotlight effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.1), transparent 40%)`,
        }}
      />

      {/* Redacted document texture background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 flex flex-col gap-2 p-4 transform -rotate-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex gap-2">
              <div className="h-2 bg-current rounded" style={{ width: `${Math.random() * 40 + 20}%` }} />
              <div className="h-2 bg-primary/50 rounded" style={{ width: `${Math.random() * 20 + 10}%` }} />
              <div className="h-2 bg-current rounded" style={{ width: `${Math.random() * 30 + 15}%` }} />
            </div>
          ))}
        </div>
      </div>

      {/* Icon */}
      <div className="relative mb-6">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center border border-glass-border group-hover:border-primary/30 transition-colors">
          {icon}
        </div>
        {/* Glow on hover */}
        <div className={`absolute inset-0 rounded-xl bg-primary/20 blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* Content */}
      <h3 className="font-display text-2xl font-semibold text-foreground mb-4 group-hover:text-gradient-crimson transition-colors">
        {title}
      </h3>
      <p className="font-mono text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rotate-45" />
      </div>

      {/* Liquid drip effects */}
      <div className="absolute bottom-0 left-8 drip text-primary/30" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-0 right-12 drip text-primary/20" style={{ animationDelay: '3s' }} />
    </div>
  );
};
