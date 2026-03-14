import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { PricingCard } from "@/components/PricingCard";
import { ComparisonTable } from "@/components/ComparisonTable";
import { PricingFAQ } from "@/components/PricingFAQ";
import { FloatingStatOrb } from "@/components/FloatingStatOrb";
import { LiquidButton } from "@/components/LiquidButton";
import { AgeGateModal } from "@/components/AgeGateModal";
import { WaitlistCounter } from "@/components/WaitlistCounter";
import { useWaitlist } from "@/hooks/use-waitlist";
import { Lock, Building2 } from "lucide-react";

const observerFeatures = [
  { text: "200 credits/month", included: true, highlight: true },
  { text: "EpsteinGPT Chat (5 credits/query)", included: true },
  { text: "Basic Debunk Tool (text & links only)", included: true },
  { text: "Read-only Feed access", included: true },
  { text: "Watermarked responses", included: true },
  { text: "Image/video analysis", included: false },
  { text: "Export PDFs", included: false },
];

const investigatorFeatures = [
  { text: "750 credits/month", included: true, highlight: true },
  { text: "Unlimited EpsteinGPT Chat & queries", included: true, highlight: true },
  { text: "Full Debunk Tool (images, video, audio)", included: true, highlight: true },
  { text: "Infinite Feed scroll + thread creation", included: true },
  { text: "Leaderboard voting & commenting", included: true },
  { text: "Priority RAG accuracy + faster responses", included: true },
  { text: "Export PDFs with citations", included: true },
  { text: "No watermarks", included: true, highlight: true },
];

const archivistFeatures = [
  { text: "2,500 credits/month", included: true, highlight: true },
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
  const { openWaitlist } = useWaitlist();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {!ageConfirmed && <AgeGateModal onConfirm={() => setAgeConfirmed(true)} />}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">

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
              First 500 signups get 30% off forever. Join the waitlist now.
            </p>

            {/* Floating taglines */}
            <div className="flex flex-wrap justify-center gap-4 fade-in-up" style={{ animationDelay: "0.4s" }}>
              {[
                "Because some truths cost more than others",
                "Credits let you go as deep as you dare",
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
              price="$49.99"
              period="month"
              badge="200 Credits/Month"
              features={observerFeatures}
              tagline="Peek through the keyhole. Good for skeptics who still trust their gut more than files."
              ctaText="Join Waitlist"
              onCtaClick={() => openWaitlist("observer")}
              delay={0.1}
            />
            <PricingCard
              title="Investigator"
              price="$99.99"
              period="month"
              badge="750 Credits/Month — Best Value"
              features={investigatorFeatures}
              tagline="See what they tried to bury. Perfect for journalists, researchers, and late-night obsessives."
              popular
              ctaText="Join Waitlist"
              onCtaClick={() => openWaitlist("investigator")}
              delay={0.2}
            />
            <PricingCard
              title="Archivist"
              price="$199.99"
              period="month"
              badge="2,500 Credits/Month"
              features={archivistFeatures}
              tagline="Build your own case file. Because one lifetime isn't enough to read 3.5 million pages."
              premium
              ctaText="Join Waitlist"
              onCtaClick={() => openWaitlist("archivist")}
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

          {/* Credit Packs */}
          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="font-display text-3xl font-bold text-center text-foreground mb-4 fade-in-up">
              Need More Credits?
            </h2>
            <p className="font-serif text-lg text-muted-foreground text-center mb-10 fade-in-up" style={{ animationDelay: "0.1s" }}>
              Top up anytime with credit packs. Valid for 90 days.
            </p>
            <div className="grid md:grid-cols-3 gap-6 fade-in-up" style={{ animationDelay: "0.2s" }}>
              {[
                { name: "250 Credits", price: "$24.99", perCredit: "$0.10" },
                { name: "1,000 Credits", price: "$79.99", perCredit: "$0.08", best: true },
                { name: "3,000 Credits", price: "$199.99", perCredit: "$0.067" },
              ].map((pack) => (
                <div key={pack.name} className={`glass-card p-6 text-center ${pack.best ? "border-primary/30" : ""}`}>
                  <div className="font-display text-2xl font-bold text-foreground mb-1">{pack.name}</div>
                  <div className="font-display text-3xl font-bold text-gradient-crimson mb-2">{pack.price}</div>
                  <div className="font-mono text-xs text-muted-foreground">{pack.perCredit}/credit</div>
                  {pack.best && (
                    <div className="mt-2 inline-flex items-center glass-card px-3 py-1 rounded-full border-primary/30">
                      <span className="font-mono text-[10px] text-primary uppercase tracking-wider">Best Value</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Credit Costs Table */}
          <div className="max-w-2xl mx-auto mb-20">
            <h2 className="font-display text-3xl font-bold text-center text-foreground mb-10 fade-in-up">
              Credit Costs Per Action
            </h2>
            <div className="glass-panel rounded-2xl overflow-hidden fade-in-up" style={{ animationDelay: "0.1s" }}>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-glass-border">
                    <th className="text-left font-display text-base font-medium text-foreground p-4 pl-6">Action</th>
                    <th className="text-right font-display text-base font-medium text-primary p-4 pr-6">Credits</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { action: "EpsteinGPT Chat", credits: 5 },
                    { action: "Debunk Tool (text)", credits: 10 },
                    { action: "Image Analysis", credits: 15 },
                    { action: "Video Analysis", credits: 25 },
                    { action: "PDF Export", credits: 3 },
                  ].map((row, i) => (
                    <tr key={row.action} className={`border-b border-glass-border/50 ${i % 2 === 0 ? "bg-transparent" : "bg-glass/30"}`}>
                      <td className="p-4 pl-6 font-mono text-sm text-muted-foreground">{row.action}</td>
                      <td className="p-4 pr-6 text-right font-mono text-sm text-foreground">{row.credits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              Join the waitlist today. First 500 get 30% off forever.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <LiquidButton variant="primary" onClick={() => openWaitlist()}>
                Join the Waitlist
              </LiquidButton>
              <LiquidButton variant="ghost" onClick={() => openWaitlist("investigator")}>
                Go Investigator — Own the Truth
              </LiquidButton>
            </div>
            <div className="mt-6">
              <WaitlistCounter />
            </div>
            <p className="font-mono text-[10px] text-muted-foreground/50 mt-4">
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
