'use client';

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BarChart3, Star, Users } from "lucide-react";

const stats = [
  { icon: Star, value: 4.9, suffix: "/5", label: "learner rating", decimals: 1 },
  { icon: Users, value: 1200, suffix: "+", label: "learners enrolled", decimals: 0 },
  { icon: BarChart3, value: 300, suffix: "+", label: "dashboards built", decimals: 0 },
];

function useCountUp(target: number, decimals: number, trigger: boolean) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCurrent(target);
        clearInterval(timer);
      } else {
        setCurrent(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, trigger]);
  return decimals > 0 ? current.toFixed(decimals) : Math.floor(current).toLocaleString();
}

function StatCounter({ icon: Icon, value, suffix, label, decimals, trigger }: {
  icon: React.ComponentType<{ className?: string }>;
  value: number; suffix: string; label: string; decimals: number; trigger: boolean;
}) {
  const display = useCountUp(value, decimals, trigger);
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
        aria-label={label}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>
      <div>
        <p className="text-base font-bold text-slate-900 tabular-nums">
          {display}{suffix}
        </p>
        <p className="text-xs text-slate-500">{label}</p>
      </div>
    </div>
  );
}

const CHART_BARS = [40, 65, 55, 80, 72, 90, 85];
const HIGHLIGHTED_BAR = 5;

const dashboardRows = [
  { label: "Weekly Report", value: "↑ 34%", color: "text-emerald-600" },
  { label: "Automation Rate", value: "↑ 82%", color: "text-emerald-600" },
  { label: "Manual Hours", value: "↓ 6 hrs", color: "text-rose-500" },
  { label: "Dashboard Deploy", value: "✓ Live", color: "text-emerald-600" },
];

export function Hero() {
  const [triggered, setTriggered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax on mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 18 });
  const cardX = useTransform(smoothX, [-300, 300], [-8, 8]);
  const cardY = useTransform(smoothY, [-200, 200], [-5, 5]);

  useEffect(() => {
    const timer = setTimeout(() => setTriggered(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className="relative overflow-hidden rounded-3xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-green-50 px-6 py-12 shadow-[0_24px_80px_rgba(16,185,129,0.12)] md:px-10 md:py-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(34,197,94,0.12),transparent_35%)]" />

      <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
        {/* Left column */}
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            🔥 Excel · AI · Data Skills
          </div>

          <h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Master Excel, AI, and Data Skills That Actually{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
              Get You Promoted.
            </span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
            Build real dashboards, automate reporting, and become the person your
            team depends on — in weeks, not years.
          </p>

          {/* Animated counters */}
          <div className="flex flex-wrap gap-6 pt-1">
            {stats.map((s) => (
              <StatCounter key={s.label} {...s} trigger={triggered} />
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/bootcamp"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(16,185,129,0.35)] transition duration-300 hover:scale-[1.03] hover:shadow-[0_16px_34px_rgba(16,185,129,0.5)]"
            >
              <span className="relative z-10">Start Your Track</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition group-hover:translate-x-0.5" />
              {/* subtle glow pulse */}
              <span className="absolute inset-0 animate-[hero-pulse_6s_ease-in-out_infinite] bg-white/10 blur-xl" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400/60 hover:text-emerald-700 hover:shadow-[0_12px_26px_rgba(16,185,129,0.15)]"
            >
              See How It Works
            </Link>
          </div>
        </div>

        {/* Right column: animated fake dashboard UI */}
        <motion.div
          style={{ x: cardX, y: cardY }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative"
        >
          {/* Floating glow */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald-400/20 to-green-600/20 blur-2xl" />

          <div className="relative rounded-3xl border border-emerald-100 bg-white p-6 shadow-[0_24px_60px_rgba(16,185,129,0.14)]">
            {/* Dashboard header */}
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500">Live Dashboard</p>
                <p className="text-lg font-semibold text-slate-900">Q2 Analytics · Auto-Refreshed</p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Live
              </span>
            </div>

            {/* Fake bar chart */}
            <div className="mb-4 flex h-24 items-end gap-2">
              {CHART_BARS.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.4 + i * 0.06, duration: 0.5, ease: "easeOut" }}
                  style={{ height: `${h}%`, originY: "bottom" }}
                  className={`flex-1 rounded-t-md ${i === HIGHLIGHTED_BAR ? "bg-gradient-to-t from-emerald-600 to-emerald-400" : "bg-emerald-100"}`}
                />
              ))}
            </div>

            {/* Stats rows */}
            <div className="grid grid-cols-2 gap-3">
              {dashboardRows.map((row) => (
                <div key={row.label} className="rounded-2xl border border-emerald-100 bg-emerald-50/50 px-3 py-2">
                  <p className="text-xs text-slate-500">{row.label}</p>
                  <p className={`text-sm font-bold ${row.color}`}>{row.value}</p>
                </div>
              ))}
            </div>

            {/* Tool chips */}
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {["Power Query", "AI Copilot", "XLOOKUP", "Office Scripts"].map((t) => (
                <span key={t} className="rounded-full border border-emerald-100 bg-white px-3 py-1 text-slate-600">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Floating card */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-4 -top-6 rounded-2xl border border-emerald-200 bg-white px-4 py-2.5 shadow-[0_8px_24px_rgba(16,185,129,0.18)]"
          >
            <p className="text-xs font-semibold text-emerald-700">🎉 Promotion-ready</p>
            <p className="text-xs text-slate-500">in weeks, not years</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
