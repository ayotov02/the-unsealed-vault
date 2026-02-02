import { TaglineRotator } from "./TaglineRotator";
import { FeatureCard } from "./FeatureCard";
import { LiquidButton } from "./LiquidButton";
import { GridScan } from "./GridScan";

const features = [
  {
    title: "Debunk Tool",
    description:
      "Paste any tweet, video, conspiracy thread → Instant verdict + cited excerpts. Because misinformation deserves due process (and humiliation).",
    icon: (
      <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "EpsteinGPT Chat",
    description:
      "Ask the raw files anything: witness contradictions, name connections, timeline breakdowns. Generate scripts, summaries, or just stare into the abyss.",
    icon: (
      <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: "The Feed",
    description:
      "Infinite masonry gallery of AI-curated threads — key revelations, red-flag quotes, visual evidence previews. Scroll into the void.",
    icon: (
      <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    title: "Leaderboards",
    description:
      "Community votes on the most damning cases/figures. Top horrors ranked. Because democracy needs a darkest-timeline edition.",
    icon: (
      <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-abyss" />
      <div className="absolute inset-0 bg-liquid-flow" />
      <div className="god-rays" />
      
      {/* Grid Scan Effect */}
      <GridScan
        linesColor="#3d1a1a"
        scanColor="#b91c1c"
        scanOpacity={0.5}
        gridScale={0.12}
        lineThickness={0.8}
        scanGlow={0.7}
        scanDuration={3}
        scanDelay={2}
        bloomIntensity={0.4}
        chromaticAberration={0.003}
        noiseIntensity={0.015}
      />
      
      {/* Noise texture */}
      <div className="noise-overlay" />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-primary/10 via-transparent to-transparent blur-3xl float opacity-50" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-glow-blood/10 via-transparent to-transparent blur-3xl float-delayed opacity-40" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Hero Content */}
        <div className="max-w-5xl mx-auto text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8 fade-in-up">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
              Latest Document Drop: January 2026
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-8 fade-in-up" style={{ animationDelay: "0.1s" }}>
            <span className="text-gradient">EpsteinGPT:</span>
            <br />
            <span className="text-foreground">Now With</span>{" "}
            <span className="text-gradient-crimson">3.5 Million Pages</span>
            <br />
            <span className="text-foreground">of Unsealed Truth</span>
          </h1>

          {/* Subheadline */}
          <p className="font-serif text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8 fade-in-up" style={{ animationDelay: "0.2s" }}>
            While the internet argues memes, EpsteinGPT cross-references the actual{" "}
            <span className="text-foreground font-medium">DOJ vault</span>: court transcripts, flight logs, witness statements,{" "}
            <span className="text-primary">180k+ images</span>, <span className="text-primary">2k+ videos</span>.
            <br className="hidden md:block" />
            <span className="italic">Cut through the noise. Verify claims in seconds.</span>
          </p>

          <p className="font-mono text-sm text-muted-foreground/70 mb-12 fade-in-up" style={{ animationDelay: "0.3s" }}>
            Because some files were never meant to stay buried.
          </p>

          {/* Tagline Rotator */}
          <div className="mb-16 fade-in-up" style={{ animationDelay: "0.4s" }}>
            <TaglineRotator />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in-up" style={{ animationDelay: "0.5s" }}>
            <LiquidButton variant="primary">
              Start Free — Before the Next Drop Changes Everything
            </LiquidButton>
            <LiquidButton variant="ghost">
              Watch Demo (It's basically ASMR for transparency addicts)
            </LiquidButton>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="glass-panel rounded-2xl p-6 mb-20 max-w-4xl mx-auto fade-in-up" style={{ animationDelay: "0.6s" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "3.5M+", label: "Pages Indexed" },
              { value: "180K+", label: "Images Analyzed" },
              { value: "2,000+", label: "Video Files" },
              { value: "15K+", label: "Named Entities" },
            ].map((stat, index) => (
              <div key={index} className="relative">
                <div className="font-display text-3xl md:text-4xl font-bold text-gradient-crimson mb-1">
                  {stat.value}
                </div>
                <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
                {index < 3 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-glass-border hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Feature Cards */}
        <div id="features" className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={0.1 * index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 fade-in-up" style={{ animationDelay: "0.8s" }}>
          <p className="font-serif text-lg text-muted-foreground mb-6 italic">
            "The truth doesn't care about your algorithm."
          </p>
          <LiquidButton variant="primary">
            Enter the Vault
          </LiquidButton>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};
