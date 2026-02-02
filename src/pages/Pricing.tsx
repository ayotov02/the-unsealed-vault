import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { PricingCard } from "@/components/PricingCard";
import { ComparisonTable } from "@/components/ComparisonTable";
import { PricingFAQ } from "@/components/PricingFAQ";
import { FloatingStatOrb } from "@/components/FloatingStatOrb";
import { LiquidButton } from "@/components/LiquidButton";
import { AgeGateModal } from "@/components/AgeGateModal";
import { Antigravity } from "@/components/Antigravity";
import { Lock, Building2 } from "lucide-react";

const observerFeatures = [
  { text: "Limited daily queries (10/day)", included: true },
  { text: "Basic Debunk Tool (text & links only)", included: true },
  { text: "Read-only Feed access", included: true },
  { text: "No voting or leaderboards", included: false },
  { text: "Watermarked responses", included: true },
  { text: "Image/video analysis", included: false },
  { text: "Export PDFs", included: false },
];

const investigatorFeatures = [
  { text: "Unlimited EpsteinGPT Chat & queries", included: true, highlight: true },
  { text: "Full Debunk Tool (images, video, audio)", included: true, highlight: true },
  { text: "Infinite Feed scroll + thread creation", included: true },
  { text: "Leaderboard voting & commenting", included: true },
  { text: "Priority RAG accuracy + faster responses", included: true },
  { text: "Export PDFs with citations", included: true },
  { text: "No watermarks", included: true, highlight: true },
];

const archivistFeatures = [
  { text: "Everything in Investigator", included: true, highlight: true },
  { text: "Advanced analytics: entity graphs", included: true, highlight: true },
  { text: "Timeline builder tool", included: true, highlight: true },
  { text: "Custom thread generation & bulk export", included: true },
  { text: "Early access to new document drops", included: true },
  { text: "Dedicated support + priority queue", included: true },
  { text: "API access (limited rate)", included: true },
];

const Pricing = () => {
  const [ageConfirmed, setAgeConfirmed] = useState(
    localStorage.getItem("epsteingpt-age-confirmed") === "true"
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {!ageConfirmed && <AgeGateModal onConfirm={() => setAgeConfirmed(true)} />}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Antigravity Background */}
        <div className="absolute inset-0 z-0">
          <Antigravity
            count={400}
            magnetRadius={15}
            ringRadius={12}
            waveSpeed={0.3}
            waveAmplitude={1.2}
            particleSize={2.5}
            lerpSpeed={0.08}
            color="#b91c1c"
            autoAnimate={true}
            particleVariance={1.2}
            rotationSpeed={0.1}
            depthFactor={1.5}
            pulseSpeed={2}
            particleShape="capsule"
            fieldStrength={12}
          />
        </div>
        
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background pointer-events-none z-[1]" />
        <div className="god-rays z-[1]" />
        <div className="noise-overlay z-[1]" />

        {/* Floating stat orbs */}
        <div className="absolute top-40 left-[10%] hidden lg:block">
          <FloatingStatOrb
            value="3.5M+"
            label="Pages Ingested"
            subtext="Your feed lied — the files didn't"
            delay={0}
          />
        </div>
        <div className="absolute top-60 right-[8%] hidden lg:block">
          <FloatingStatOrb
            value="180K"
            label="Images Analyzed"
            subtext="Every pixel scrutinized"
            delay={1}
          />
        </div>
        <div className="absolute bottom-40 left-[5%] hidden lg:block">
          <FloatingStatOrb
            value="2K+"
            label="Videos Transcribed"
            subtext="No testimony unheard"
            delay={2}
          />
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-radial from-primary/10 via-transparent to-transparent blur-3xl float opacity-40" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-glow-blood/10 via-transparent to-transparent blur-3xl float-delayed opacity-30" />

        <div className="container mx-auto px-6 relative z-10">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8 fade-in-up">
              <Lock className="w-3 h-3 text-primary" />
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                Full DOJ Vault — January 2026 Release Indexed
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.9] mb-8 fade-in-up" style={{ animationDelay: "0.1s" }}>
              <span className="text-foreground">Choose Your Access</span>
              <br />
              <span className="text-gradient-crimson">to the Abyss</span>
            </h1>

            {/* Subheadline */}
            <p className="font-serif text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8 fade-in-up" style={{ animationDelay: "0.2s" }}>
              One-time DOJ vault ingestion complete — <span className="text-foreground">3.5M+ pages</span>,{" "}
              <span className="text-primary">180k images</span>, <span className="text-primary">2k videos</span>,
              fully RAG-indexed. No more waiting for drops.
            </p>

            <p className="font-mono text-sm text-muted-foreground/70 mb-10 fade-in-up" style={{ animationDelay: "0.3s" }}>
              Debunk, chat, and rank the horrors today.
            </p>

            {/* Floating taglines */}
            <div className="flex flex-wrap justify-center gap-4 fade-in-up" style={{ animationDelay: "0.4s" }}>
              {[
                "Because some truths cost more than others",
                "Free tier: dip your toe in the void",
                "Pro: drown in citations",
              ].map((tagline, index) => (
                <div key={index} className="glass-card px-4 py-2 rounded-full">
                  <span className="font-serif text-sm italic text-muted-foreground">
                    "{tagline}"
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
            <PricingCard
              title="Observer"
              price="$0"
              period="forever"
              badge="Start Here — No Card Needed"
              features={observerFeatures}
              tagline="Peek through the keyhole. Good for skeptics who still trust their gut more than files."
              ctaText="Start Free"
              delay={0.1}
            />
            <PricingCard
              title="Investigator"
              price="$9"
              period="month"
              yearlyPrice="$89"
              yearlySavings="Save 17%"
              badge="Unlock the Full Vault"
              features={investigatorFeatures}
              tagline="See what they tried to bury. Perfect for journalists, researchers, and late-night obsessives."
              popular
              ctaText="Go Pro"
              delay={0.2}
            />
            <PricingCard
              title="Archivist"
              price="$29"
              period="month"
              yearlyPrice="$249"
              yearlySavings="Save 28%"
              badge="For the Relentless"
              features={archivistFeatures}
              tagline="Build your own case file. Because one lifetime isn't enough to read 3.5 million pages."
              premium
              ctaText="Become Archivist"
              delay={0.3}
            />
          </div>

          {/* Enterprise Card */}
          <div className="max-w-md mx-auto mb-20 fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="glass-card p-6 flex items-center gap-6">
              <div className="w-14 h-14 rounded-xl bg-muted/50 flex items-center justify-center border border-glass-border flex-shrink-0">
                <Building2 className="w-7 h-7 text-muted-foreground" />
              </div>
              <div className="flex-grow">
                <h4 className="font-display text-xl font-semibold text-foreground mb-1">
                  Enterprise / Newsroom
                </h4>
                <p className="font-mono text-xs text-muted-foreground">
                  Custom plans for teams, NGOs, and investigative outlets.
                </p>
              </div>
              <LiquidButton variant="ghost" className="flex-shrink-0">
                Contact Us
              </LiquidButton>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="max-w-5xl mx-auto mb-20">
            <h2 className="font-display text-3xl font-bold text-center text-foreground mb-10 fade-in-up">
              Compare All Features
            </h2>
            <ComparisonTable />
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mb-20">
            <h2 className="font-display text-3xl font-bold text-center text-foreground mb-10 fade-in-up">
              Frequently Asked Questions
            </h2>
            <PricingFAQ />
          </div>

          {/* Bottom CTA */}
          <div className="glass-panel rounded-2xl p-12 max-w-4xl mx-auto text-center fade-in-up" style={{ animationDelay: "0.6s" }}>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Access the Truth?
            </h3>
            <p className="font-serif text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start with Observer tier — no credit card required. Upgrade anytime when you're ready to dive deeper.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <LiquidButton variant="primary">
                Start Free (Observer Tier) — No Credit Card Required
              </LiquidButton>
              <LiquidButton variant="ghost">
                Upgrade to Pro & Own the Truth
              </LiquidButton>
            </div>
            <p className="font-mono text-[10px] text-muted-foreground/50 mt-6">
              "Access granted... but at what cost?"
            </p>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>
    </div>
  );
};

export default Pricing;
