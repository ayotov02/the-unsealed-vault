import { Check, X, Minus } from "lucide-react";

type FeatureValue = boolean | string | "partial";

interface ComparisonFeature {
  name: string;
  observer: FeatureValue;
  investigator: FeatureValue;
  archivist: FeatureValue;
}

const features: ComparisonFeature[] = [
  { name: "Monthly Credits", observer: "200", investigator: "750", archivist: "2,500" },
  { name: "Credit Top-ups", observer: true, investigator: true, archivist: true },
  { name: "EpsteinGPT Chat", observer: true, investigator: true, archivist: true },
  { name: "Debunk Tool (Text)", observer: true, investigator: true, archivist: true },
  { name: "Debunk Tool (Images)", observer: false, investigator: true, archivist: true },
  { name: "Debunk Tool (Video/Audio)", observer: false, investigator: true, archivist: true },
  { name: "Feed Access", observer: "Read-only", investigator: "Full + Create", archivist: "Full + Create" },
  { name: "Leaderboard Voting", observer: false, investigator: true, archivist: true },
  { name: "Export PDFs w/ Citations", observer: false, investigator: true, archivist: true },
  { name: "Entity Graph Analytics", observer: false, investigator: false, archivist: true },
  { name: "Timeline Builder", observer: false, investigator: false, archivist: true },
  { name: "Bulk Export", observer: false, investigator: false, archivist: true },
  { name: "API Access", observer: false, investigator: false, archivist: "Limited" },
  { name: "Priority Support", observer: false, investigator: false, archivist: true },
  { name: "Early Access to Drops", observer: false, investigator: false, archivist: true },
  { name: "Watermarks", observer: "Yes", investigator: "None", archivist: "None" },
];

const renderValue = (value: FeatureValue) => {
  if (value === true) {
    return <Check className="w-5 h-5 text-primary mx-auto" />;
  }
  if (value === false) {
    return <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />;
  }
  if (value === "partial") {
    return <Minus className="w-5 h-5 text-muted-foreground/50 mx-auto" />;
  }
  return <span className="font-mono text-xs text-muted-foreground">{value}</span>;
};

export const ComparisonTable = () => {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden fade-in-up" style={{ animationDelay: "0.4s" }}>
      {/* Redacted texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 flex flex-col gap-4 p-8 transform rotate-1">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="h-2 bg-current rounded" style={{ width: `${Math.random() * 60 + 20}%` }} />
              <div className="h-2 bg-primary/30 rounded" style={{ width: `${Math.random() * 20 + 5}%` }} />
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-glass-border">
              <th className="text-left font-display text-lg font-semibold text-foreground p-6 min-w-[200px]">
                Compare Plans
              </th>
              <th className="text-center font-display text-base font-medium text-muted-foreground p-6 min-w-[140px]">
                Observer
                <div className="font-mono text-xs text-muted-foreground/60 mt-1">$49.99/mo</div>
              </th>
              <th className="text-center font-display text-base font-medium text-primary p-6 min-w-[140px] bg-primary/5">
                Investigator
                <div className="font-mono text-xs text-primary/70 mt-1">$99.99/mo</div>
              </th>
              <th className="text-center font-display text-base font-medium text-foreground p-6 min-w-[140px]">
                Archivist
                <div className="font-mono text-xs text-muted-foreground/60 mt-1">$199.99/mo</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr
                key={feature.name}
                className={`border-b border-glass-border/50 hover:bg-glass transition-colors ${
                  index % 2 === 0 ? "bg-transparent" : "bg-glass/30"
                }`}
              >
                <td className="p-4 pl-6 font-mono text-sm text-muted-foreground">
                  {feature.name}
                </td>
                <td className="p-4 text-center">
                  {renderValue(feature.observer)}
                </td>
                <td className="p-4 text-center bg-primary/5">
                  {renderValue(feature.investigator)}
                </td>
                <td className="p-4 text-center">
                  {renderValue(feature.archivist)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
