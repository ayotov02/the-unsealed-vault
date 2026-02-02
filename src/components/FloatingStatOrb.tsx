interface FloatingStatOrbProps {
  value: string;
  label: string;
  subtext?: string;
  className?: string;
  delay?: number;
}

export const FloatingStatOrb = ({
  value,
  label,
  subtext,
  className = "",
  delay = 0,
}: FloatingStatOrbProps) => {
  return (
    <div
      className={`glass-card px-6 py-4 rounded-2xl float chromatic-edge ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="text-center">
        <div className="font-display text-2xl font-bold text-gradient-crimson">
          {value}
        </div>
        <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
          {label}
        </div>
        {subtext && (
          <div className="font-serif text-[10px] italic text-muted-foreground/50 mt-1">
            {subtext}
          </div>
        )}
      </div>
    </div>
  );
};
