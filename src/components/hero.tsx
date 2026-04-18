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
    <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-green-50 px-6 py-12 shadow-sm md:px-10 md:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(34,197,94,0.12),transparent_35%)]" />
      <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            <Sparkle className="h-4 w-4 text-emerald-600" />
            Modern Excel Bootcamp
          </div>
          <h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Learn2Excel: Elite Excel, AI, and data analysis training for the
            modern professional.
          </h1>
          <p className="max-w-xl text-base text-slate-700 sm:text-lg">
            Three tracks, live cohorts, and Appwrite-ready integrations.
            Everything is designed to help you build production-grade reporting,
            automation, and analytics.
          </p>
          <motion.p
            key={displayed}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg font-medium text-emerald-700"
          >
            {displayed}
            <span className="ml-1 animate-pulse text-emerald-600">▌</span>
          </motion.p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/bootcamp"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(16,185,129,0.25)] transition hover:scale-[1.01]"
            >
              Explore Bootcamp
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tracks"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-emerald-400/60 hover:text-emerald-700"
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
                className="rounded-2xl border border-emerald-100 bg-white px-3 py-3 text-center shadow-sm"
              >
                <p className="text-lg font-semibold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative grid gap-4 rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-transparent to-green-600/10 blur-xl" />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-600">
                Live Bootcamp
              </p>
              <p className="text-xl font-semibold text-slate-900">
                Upcoming Cohorts
              </p>
            </div>
            <div className="rounded-full bg-gradient-to-r from-emerald-500/80 to-green-600/80 px-3 py-1 text-xs font-semibold text-white">
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
                className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />
                <p className="relative text-sm font-semibold text-slate-900">
                  {item}
                </p>
                <p className="relative text-xs text-slate-600">
                  Hands-on labs · Mentor review · Certificate
                </p>
              </div>
            ))}
          </div>
          <div className="relative flex flex-wrap gap-2 text-xs text-slate-700">
            {["Google-ready metadata", "Clean design", "Responsive", "Beginner friendly"].map(
              (tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-emerald-100 bg-white px-3 py-1"
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
