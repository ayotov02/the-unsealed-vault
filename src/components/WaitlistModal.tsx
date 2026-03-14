import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useWaitlist } from "@/hooks/use-waitlist";
import { LiquidButton } from "./LiquidButton";
import { X, Mail, Sparkles, Check, Copy } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

const waitlistSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  selectedTier: z.enum(["observer", "investigator", "archivist"]),
  referredBy: z.string().optional(),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

interface WaitlistResult {
  position: number;
  referralCode: string;
  earlyAccess: boolean;
  totalSignups: number;
  alreadyJoined: boolean;
}

const tiers = [
  {
    id: "observer" as const,
    name: "Observer",
    price: "$49.99/mo",
    credits: "200 credits/mo",
    popular: false,
  },
  {
    id: "investigator" as const,
    name: "Investigator",
    price: "$99.99/mo",
    credits: "750 credits/mo",
    popular: true,
  },
  {
    id: "archivist" as const,
    name: "Archivist",
    price: "$199.99/mo",
    credits: "2,500 credits/mo",
    popular: false,
  },
];

function getReferralFromUrl(): string {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get("ref") || "";
  } catch {
    return "";
  }
}

export const WaitlistModal = () => {
  const { isOpen, preselectedTier, closeWaitlist } = useWaitlist();
  const [result, setResult] = useState<WaitlistResult | null>(null);
  const [copied, setCopied] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      selectedTier: "investigator",
      referredBy: getReferralFromUrl(),
    },
  });

  const selectedTier = watch("selectedTier");

  // Sync preselectedTier from context into form (via useEffect, not during render)
  useEffect(() => {
    if (preselectedTier && isOpen) {
      setValue("selectedTier", preselectedTier as WaitlistFormData["selectedTier"]);
    }
  }, [preselectedTier, isOpen, setValue]);

  const joinMutation = useMutation({
    mutationFn: (data: WaitlistFormData) =>
      apiFetch<WaitlistResult>("/api/waitlist/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: (data) => {
      setResult(data);
      // Invalidate counter so it updates immediately
      queryClient.invalidateQueries({ queryKey: ["waitlist-stats"] });
    },
  });

  const handleClose = () => {
    closeWaitlist();
    setResult(null);
    setCopied(false);
    reset({ selectedTier: "investigator", referredBy: getReferralFromUrl(), email: "" });
  };

  const copyReferralLink = () => {
    if (!result) return;
    const link = `${window.location.origin}?ref=${result.referralCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/90 backdrop-blur-xl"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative glass-card p-8 md:p-10 max-w-lg w-full fade-in-up">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!result ? (
          /* Join Form */
          <form onSubmit={handleSubmit((data) => joinMutation.mutate(data))}>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 pulse-glow">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                Join the Waitlist
              </h2>
              <p className="font-mono text-sm text-muted-foreground">
                First 500 signups get <span className="text-primary">30% off forever</span>
              </p>
            </div>

            {/* Email input */}
            <div className="mb-6">
              <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="your@email.com"
                className="w-full bg-muted/50 border border-glass-border rounded-lg px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
              />
              {errors.email && (
                <p className="font-mono text-xs text-primary mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Tier selector */}
            <div className="mb-6">
              <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                Select Your Tier
              </label>
              <div className="grid grid-cols-3 gap-2">
                {tiers.map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setValue("selectedTier", tier.id)}
                    className={`relative p-3 rounded-lg border text-center transition-all ${
                      selectedTier === tier.id
                        ? "border-primary/50 bg-primary/10"
                        : "border-glass-border bg-muted/30 hover:border-glass-border/80"
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 font-mono text-[8px] uppercase text-primary bg-primary/20 px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                    <div className="font-display text-sm font-semibold text-foreground">
                      {tier.name}
                    </div>
                    <div className="font-mono text-[10px] text-muted-foreground mt-1">
                      {tier.price}
                    </div>
                    <div className="font-mono text-[10px] text-primary/80 mt-0.5">
                      {tier.credits}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Referral code */}
            <div className="mb-6">
              <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                Referral Code <span className="text-muted-foreground/50">(optional)</span>
              </label>
              <input
                type="text"
                {...register("referredBy")}
                placeholder="Enter referral code"
                className="w-full bg-muted/50 border border-glass-border rounded-lg px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            {/* Submit — native type="submit" inside <form>, no onClick needed */}
            <button
              type="submit"
              disabled={joinMutation.isPending}
              className="btn-liquid w-full justify-center"
            >
              <span className="relative z-10">
                {joinMutation.isPending ? "Joining..." : "Join Waitlist"}
              </span>
            </button>

            {joinMutation.isError && (
              <p className="font-mono text-xs text-primary text-center mt-3">
                {joinMutation.error?.message || "Something went wrong. Please try again."}
              </p>
            )}

            <p className="font-mono text-[10px] text-muted-foreground/50 text-center mt-4">
              No spam. We'll only email you when it's time.
            </p>
          </form>
        ) : (
          /* Success State */
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 pulse-glow">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>

            <h2 className="font-display text-3xl font-bold text-foreground mb-2">
              {result.alreadyJoined ? "You're Already In" : "You're In"}
            </h2>

            <p className="font-serif text-lg text-muted-foreground mb-8">
              {result.alreadyJoined
                ? "We found your existing spot on the waitlist."
                : "Welcome to the queue for the truth."}
            </p>

            {/* Position */}
            <div className="glass-card p-6 mb-6">
              <div className="flex items-center justify-center gap-4">
                <div>
                  <div className="font-display text-4xl font-bold text-gradient-crimson">
                    #{result.position}
                  </div>
                  <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    Your Position
                  </div>
                </div>
                <div className="w-px h-12 bg-glass-border" />
                <div>
                  <div className="font-display text-4xl font-bold text-foreground">
                    {result.totalSignups}
                  </div>
                  <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    Total Signups
                  </div>
                </div>
              </div>
            </div>

            {/* Early access badge */}
            {result.earlyAccess && (
              <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 border-primary/50">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="font-mono text-xs text-primary uppercase tracking-wider">
                  Early Access — 30% Off Forever
                </span>
              </div>
            )}

            {/* Referral link */}
            <div className="mb-6">
              <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                Share & Move Up the Queue
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={`${window.location.origin}?ref=${result.referralCode}`}
                  className="flex-1 bg-muted/50 border border-glass-border rounded-lg px-3 py-2 font-mono text-xs text-muted-foreground truncate"
                />
                <button
                  onClick={copyReferralLink}
                  className="glass-card p-2 hover:border-primary/50 transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-primary" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            <LiquidButton variant="ghost" onClick={handleClose} className="w-full justify-center">
              Close
            </LiquidButton>
          </div>
        )}
      </div>
    </div>
  );
};
