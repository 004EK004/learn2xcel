import { CheckCircle2, Zap } from "lucide-react";

const features = [
  {
    title: "Live + Self-Paced",
    description:
      "Join live labs or run self-paced sprints with mentor touchpoints every week.",
  },
  {
    title: "Appwrite Ready",
    description:
      "Auth, database, and functions stubs are pre-wired so you can connect instantly.",
  },
  {
    title: "AI Copilot Recipes",
    description:
      "Prompt libraries for formulas, VBA, Power Query, and Office Scripts.",
  },
  {
    title: "Portfolio Artifacts",
    description:
      "Ship dashboards, automations, and reports that demonstrate real-world skills.",
  },
];

export function FeatureGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
          <div className="relative flex items-start gap-3">
            <div className="mt-1 rounded-2xl bg-gradient-to-br from-emerald-500/80 to-green-600/80 p-2 text-white shadow-sm">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
              <p className="mt-2 text-sm text-slate-700">{feature.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
