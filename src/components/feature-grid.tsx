'use client';

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Bot, Database, Workflow } from "lucide-react";

const tabs = [
  {
    id: "automation",
    label: "Automation",
    icon: Workflow,
    headline: "Stop doing repetitive work. Automate it in minutes.",
    description:
      "Use Office Scripts, Power Query, and VBA to build workflows that run without you. Replace 6-hour manual processes with one-click refreshes.",
    visual: "⚙️",
    features: ["Office Scripts", "Power Query M", "VBA macros", "Scheduled refresh"],
  },
  {
    id: "ai",
    label: "AI Workflows",
    icon: Bot,
    headline: "Your AI co-pilot for every Excel challenge.",
    description:
      "Use ChatGPT, Copilot, and Azure ML directly inside Excel. Generate formulas, explain datasets, and ship explainable models — all without leaving your workbook.",
    visual: "🤖",
    features: ["ChatGPT formula generation", "Copilot integration", "Azure ML add-in", "Natural language queries"],
  },
  {
    id: "dashboards",
    label: "Dashboards",
    icon: BarChart3,
    headline: "Build dashboards you can show in interviews.",
    description:
      "Design production-grade KPI dashboards with slicers, dynamic charts, and conditional formatting that stakeholders trust and executives share.",
    visual: "📊",
    features: ["KPI dashboards", "Interactive slicers", "Dynamic arrays", "Conditional formatting"],
  },
  {
    id: "data",
    label: "Real Datasets",
    icon: Database,
    headline: "Walk away with proof you can actually do the job.",
    description:
      "Every project uses realistic sample data from finance, ops, and healthcare. You ship a portfolio artifact at the end of every cohort.",
    visual: "🗄️",
    features: ["SQL connectivity", "API data pulls", "Power Pivot models", "Portfolio artifacts"],
  },
];

export function FeatureGrid() {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];
  const Icon = current.icon;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="h-1 w-10 rounded-full bg-gradient-to-r from-emerald-400 to-green-500" />
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">What You&apos;ll Learn</p>
      </div>
      <h2 className="text-2xl font-semibold text-slate-900">
        Four skill areas that change how you work.
      </h2>

      {/* Tab bar */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition duration-200 ${
                active === tab.id
                  ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-[0_6px_16px_rgba(16,185,129,0.3)]"
                  : "border border-emerald-100 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700"
              }`}
            >
              <TabIcon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <Icon className="h-3.5 w-3.5" />
                {current.label}
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{current.headline}</h3>
              <p className="text-sm leading-relaxed text-slate-700">{current.description}</p>
              <div className="flex flex-wrap gap-2">
                {current.features.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.25 }}
              className="flex h-28 w-28 items-center justify-center rounded-3xl border border-emerald-100 bg-emerald-50 text-6xl shadow-sm md:h-36 md:w-36"
            >
              {current.visual}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
