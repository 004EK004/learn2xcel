'use client';

import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Choose your track",
    description:
      "Pick Beginner, Intermediate, or Advanced. One track is highlighted as the most popular starting point.",
  },
  {
    step: "02",
    title: "Build real projects",
    description:
      "Work through live labs, realistic datasets, and mentor-reviewed deliverables every week.",
  },
  {
    step: "03",
    title: "Ship dashboards + get certified",
    description:
      "Graduate with a portfolio artifact and a certificate you can share in reviews, interviews, and promotions.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="h-1 w-10 rounded-full bg-gradient-to-r from-emerald-400 to-green-500" />
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">How It Works</p>
      </div>
      <h2 className="text-2xl font-semibold text-slate-900">
        Three steps from signup to promotion-ready.
      </h2>

      <div className="relative grid gap-6 md:grid-cols-3">
        {/* Connecting line (desktop) */}
        <div className="pointer-events-none absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent md:block" />

        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className="group relative rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(16,185,129,0.16)]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-sm font-bold text-white shadow-[0_8px_18px_rgba(16,185,129,0.3)]">
              {s.step}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
