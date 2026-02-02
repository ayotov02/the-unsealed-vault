import { useState, useRef } from "react";
import { LiquidButton } from "./LiquidButton";
import { Check, X } from "lucide-react";

interface PricingFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  yearlyPrice?: string;
  yearlySavings?: string;
  badge?: string;
  features: PricingFeature[];
  tagline: string;
  popular?: boolean;
  premium?: boolean;
  ctaText?: string;
  delay?: number;
}

export const PricingCard = ({
  title,
  price,
  period,
  yearlyPrice,
  yearlySavings,
  badge,
  features,
  tagline,
  popular,
  premium,
  ctaText = "Get Started",
  delay = 0,
}: PricingCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
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
      className={`relative group fade-in-up ${popular ? "md:-mt-4 md:mb-4" : ""} ${premium ? "md:-mt-2 md:mb-2" : ""}`}
      style={{ animationDelay: `${delay}s` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Popular badge */}
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="glass-card px-4 py-1.5 rounded-full border-primary/50 pulse-glow">
            <span className="font-mono text-xs uppercase tracking-wider text-primary">
              Most Popular
            </span>
          </div>
        </div>
      )}

      {/* Card */}
      <div
        className={`glass-card p-8 h-full flex flex-col transition-all duration-500 ${
          popular
            ? "border-primary/30 shadow-[0_0_60px_-15px_hsl(var(--glow-crimson)/0.4)]"
            : premium
            ? "border-primary/20 shadow-[0_0_40px_-15px_hsl(var(--glow-blood)/0.3)]"
            : ""
        }`}
      >
        {/* Hover spotlight */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / ${popular ? "0.15" : "0.08"}), transparent 40%)`,
          }}
        />

        {/* Redacted texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden rounded-2xl">
          <div className="absolute inset-0 flex flex-col gap-3 p-6 transform -rotate-2">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="flex gap-2">
                <div className="h-1.5 bg-current rounded" style={{ width: `${Math.random() * 50 + 20}%` }} />
                <div className="h-1.5 bg-primary/40 rounded" style={{ width: `${Math.random() * 25 + 10}%` }} />
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Badge */}
          {badge && (
            <div className="inline-flex self-start mb-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground bg-muted/50 px-3 py-1 rounded-full border border-glass-border">
                {badge}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className={`font-display text-3xl font-bold mb-2 ${popular ? "text-gradient-crimson" : "text-foreground"}`}>
            {title}
          </h3>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-5xl font-bold text-foreground">
                {isYearly && yearlyPrice ? yearlyPrice : price}
              </span>
              {period && (
                <span className="font-mono text-sm text-muted-foreground">
                  / {isYearly ? "year" : period}
                </span>
              )}
            </div>
            
            {/* Yearly toggle */}
            {yearlyPrice && (
              <button
                onClick={() => setIsYearly(!isYearly)}
                className="mt-2 font-mono text-xs text-primary hover:text-primary-glow transition-colors"
              >
                {isYearly ? `Switch to monthly` : `${yearlySavings} — Switch to yearly`}
              </button>
            )}
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-8 flex-grow">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                {feature.included ? (
                  <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${feature.highlight ? "text-primary" : "text-primary/60"}`} />
                ) : (
                  <X className="w-4 h-4 mt-0.5 flex-shrink-0 text-muted-foreground/40" />
                )}
                <span className={`font-mono text-sm ${feature.included ? (feature.highlight ? "text-foreground" : "text-muted-foreground") : "text-muted-foreground/50 line-through"}`}>
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>

          {/* Tagline */}
          <p className="font-serif text-sm italic text-muted-foreground/70 mb-6 border-t border-glass-border pt-6">
            "{tagline}"
          </p>

          {/* CTA */}
          <LiquidButton variant={popular ? "primary" : "ghost"} className="w-full justify-center">
            {ctaText}
          </LiquidButton>
        </div>

        {/* Drip effects */}
        {premium && (
          <>
            <div className="absolute bottom-0 left-6 drip text-primary/40" style={{ animationDelay: "0.5s" }} />
            <div className="absolute bottom-0 right-10 drip text-primary/30" style={{ animationDelay: "2.5s" }} />
          </>
        )}
      </div>
    </div>
  );
};
