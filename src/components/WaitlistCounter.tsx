import { useQuery } from "@tanstack/react-query";
import { Users, Sparkles } from "lucide-react";
import { apiFetch } from "@/lib/api";

interface WaitlistStats {
  totalSignups: number;
  spotsRemaining: number;
  earlyAccessLimit: number;
}

export const WaitlistCounter = () => {
  const { data } = useQuery<WaitlistStats>({
    queryKey: ["waitlist-stats"],
    queryFn: () => apiFetch<WaitlistStats>("/api/waitlist/stats"),
    refetchInterval: 30000,
    retry: false,
  });

  if (!data) return null;

  return (
    <div className="inline-flex items-center gap-4 glass-card px-5 py-3 rounded-full">
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-primary" />
        <span className="font-mono text-sm text-muted-foreground">
          <span className="text-foreground font-semibold">{data.totalSignups.toLocaleString()}</span> on the waitlist
        </span>
      </div>
      {data.spotsRemaining > 0 && (
        <>
          <div className="w-px h-4 bg-glass-border" />
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm text-primary">
              {data.spotsRemaining} early access spots left
            </span>
          </div>
        </>
      )}
    </div>
  );
};
