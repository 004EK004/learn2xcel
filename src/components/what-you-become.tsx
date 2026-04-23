'use client';

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const transformations = [
  {
    from: "Manual reports that eat your week",
    to: "Automated workflows that run while you sleep",
    emoji: "⚡",
  },
  {
    from: "Excel user everyone relies on for basics",
    to: "Data operator who drives business decisions",
    emoji: "📊",
  },
  {
    from: "Stuck at the same level for years",
    to: "Promotion-ready with dashboards to prove it",
    emoji: "🚀",
  },
];

export function WhatYouBecome() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="h-1 w-10 rounded-full bg-gradient-to-r from-emerald-400 to-green-500" />
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Identity Shift</p>
      </div>
      <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
        This isn&apos;t just a course. It&apos;s who you become.
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        {transformations.map((t, i) => (
          <motion.div
            key={t.from}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(16,185,129,0.16)]"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-50/60 via-transparent to-green-50/40 opacity-0 transition duration-300 group-hover:opacity-100" />
            <span className="text-3xl">{t.emoji}</span>
            <div className="relative mt-4 space-y-3">
              <p className="text-sm text-slate-500 line-through decoration-slate-300">
                {t.from}
              </p>
              <div className="flex items-center gap-2 text-emerald-600">
                <ArrowRight className="h-4 w-4 shrink-0" />
                <p className="text-sm font-semibold text-slate-900">{t.to}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
