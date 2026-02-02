import { useState, useEffect } from "react";

const taglines = [
  "Debunk faster than your feed refreshes lies",
  "Chat with the documents before they chat about you",
  "Your new favorite co-conspirator: cold hard facts",
  "Where viral screenshots go to get redacted for real",
  "Because 'trust me bro' isn't a citation anymore",
];

export const TaglineRotator = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % taglines.length);
        setIsVisible(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Floating glass orb container */}
      <div className="glass-card px-8 py-4 rounded-full float inline-flex items-center gap-4 chromatic-edge">
        {/* Pulsing indicator */}
        <div className="relative">
          <span className="w-2 h-2 rounded-full bg-primary block animate-pulse" />
          <span className="absolute inset-0 w-2 h-2 rounded-full bg-primary animate-ping opacity-50" />
        </div>
        
        {/* Tagline text */}
        <p
          className={`font-serif italic text-lg text-muted-foreground transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          "{taglines[currentIndex]}"
        </p>

        {/* Decorative drip */}
        <div className="absolute -bottom-8 left-1/4 drip text-primary" style={{ animationDelay: '0s' }} />
        <div className="absolute -bottom-12 right-1/3 drip text-primary" style={{ animationDelay: '2s' }} />
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mt-6">
        {taglines.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary w-6"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
