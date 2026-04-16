'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkle } from "lucide-react";

const phrases = [
  "Master Excel with AI copilots.",
  "Ship dashboards in hours, not days.",
  "Automate reporting with Appwrite + Office Scripts.",
];

export function Hero() {
  const [displayed, setDisplayed] = useState(phrases[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const next = phrases[index];
    let frame = 0;
    const timer = setInterval(() => {
      frame += 1;
      const step = next.slice(0, frame);
      setDisplayed(step || next[0]);
      if (frame >= next.length) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f1729] via-[#0a0a0f] to-[#0c0c16] px-6 py-12 shadow-[0_30px_120px_rgba(0,0,0,0.6)] md:px-10 md:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,240,255,0.2),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(176,38,255,0.12),transparent_35%)]" />
      <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100 shadow-[0_0_18px_rgba(0,240,255,0.25)]">
            <Sparkle className="h-4 w-4 text-cyan-300" />
            Modern Excel Bootcamp
          </div>
          <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            Learn2Excel: Elite Excel, AI, and data analysis training for the
            modern professional.
          </h1>
          <p className="max-w-xl text-base text-slate-300 sm:text-lg">
            Three tracks, live cohorts, and Appwrite-ready integrations.
            Everything is designed to help you build production-grade reporting,
            automation, and analytics.
          </p>
          <motion.p
            key={displayed}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg font-medium text-cyan-100"
          >
            {displayed}
            <span className="ml-1 animate-pulse text-cyan-300">▌</span>
          </motion.p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/bootcamp"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(0,240,255,0.35)] transition hover:scale-[1.01]"
            >
              Explore Bootcamp
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tracks"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/60 hover:text-cyan-100"
            >
              View Tracks
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
            {[
              { label: "Career-ready tracks", value: "3" },
              { label: "Mentor feedback loops", value: "Weekly" },
              { label: "Certificate paths", value: "Yes" },
              { label: "Appwrite-ready", value: "Out of the box" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-center shadow-inner shadow-cyan-400/10"
              >
                <p className="text-lg font-semibold text-white">{stat.value}</p>
                <p className="text-xs text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.55)] backdrop-blur"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-600/10 blur-xl" />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Live Bootcamp
              </p>
              <p className="text-xl font-semibold text-white">
                Upcoming Cohorts
              </p>
            </div>
            <div className="rounded-full bg-gradient-to-r from-cyan-500/80 to-purple-600/80 px-3 py-1 text-xs font-semibold text-white">
              Limited seats
            </div>
          </div>
          <div className="grid gap-3">
            {[
              "AI with Excel Labs",
              "Classic Excel Mastery",
              "Data Analysis Deep Dive",
            ].map((item) => (
              <div
                key={item}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 px-4 py-3 shadow-inner shadow-cyan-500/10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />
                <p className="relative text-sm font-semibold text-white">
                  {item}
                </p>
                <p className="relative text-xs text-slate-400">
                  Hands-on labs · Mentor review · Certificate
                </p>
              </div>
            ))}
          </div>
          <div className="relative flex flex-wrap gap-2 text-xs text-slate-300">
            {["Dark mode first", "Futuristic gradients", "Responsive", "Appwrite auth ready"].map(
              (tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
