import { Building2 } from "lucide-react";

const logos = [
  "Volt Finance",
  "Northwind Retail",
  "Orbit Logistics",
  "MedCore Health",
  "BlueSky Analytics",
  "Pinnacle FP&A",
];

const metrics = [
  { value: "4.9/5", label: "avg. learner rating" },
  { value: "1,200+", label: "professionals trained" },
  { value: "300+", label: "dashboards shipped" },
  { value: "92%", label: "report career impact" },
];

export function SocialProofBand() {
  return (
    <section className="overflow-hidden rounded-3xl border border-emerald-100 bg-emerald-50/50 py-8">
      {/* Metrics */}
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 px-6 pb-6">
        {metrics.map((m) => (
          <div key={m.label} className="text-center">
            <p className="text-2xl font-bold text-slate-900">{m.value}</p>
            <p className="text-xs text-slate-500">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Logo ticker */}
      <div className="relative overflow-hidden border-t border-emerald-100 pt-6">
        <div className="flex animate-[ticker_22s_linear_infinite] gap-8 whitespace-nowrap px-4">
          {[...logos, ...logos].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-5 py-2 text-xs font-semibold text-slate-700 shadow-sm"
            >
              <Building2 className="h-3.5 w-3.5 text-emerald-600" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
