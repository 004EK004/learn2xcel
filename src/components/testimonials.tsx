'use client';

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Raman",
    role: "Senior Analyst, Retail Ops",
    company: "Orbit Corp",
    quote:
      "I replaced 6 hours of reporting every week and got promoted to Senior Analyst in 4 months.",
    result: "Promoted in 4 months",
    image: "/avatars/priya-raman.svg",
  },
  {
    name: "Marcus Lee",
    role: "FP&A Specialist, SaaS",
    company: "Northwind Retail",
    quote:
      "The live + self-paced mix let me build a forecasting dashboard leadership uses every Monday. It replaced two manual decks.",
    result: "Owns company forecasting dashboard",
    image: "/avatars/marcus-lee.svg",
  },
  {
    name: "Nadia Okafor",
    role: "Business Analyst, Healthcare",
    company: "MedCore Health",
    quote:
      "Power Query and Copilot changed how fast I clean data. My capstone went to production and I got pulled into higher-impact projects.",
    result: "Moved into strategic analytics",
    image: "/avatars/nadia-okafor.svg",
  },
  {
    name: "Daniel Ortiz",
    role: "Operations Manager, Logistics",
    company: "Volt Freight",
    quote:
      "I joined to improve Excel fundamentals and left with a complete KPI dashboard. Build dashboards you can show in interviews.",
    result: "Delivered first KPI dashboard",
    image: "/avatars/daniel-ortiz.svg",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(
      () => setActive((prev) => (prev + 1) % testimonials.length),
      4500
    );
  };

  useEffect(() => {
    if (!paused) startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused]);

  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm md:p-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(16,185,129,0.1),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(34,197,94,0.08),transparent_28%)]" />

      <div className="relative flex items-center gap-3 pb-6">
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Success Stories
        </div>
        <p className="text-xs text-slate-500">hover to pause · click dots to navigate</p>
      </div>

      <div className="relative min-h-[160px]">
        <AnimatePresence mode="wait">
          {testimonials.map((item, idx) =>
            idx === active ? (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                <Quote className="h-8 w-8 text-emerald-500" />
                <p className="text-lg leading-relaxed text-slate-900 md:text-xl">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    src={item.image}
                    alt={`${item.name} photo`}
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full border border-emerald-100 object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-500">
                      {item.role} · {item.company}
                    </p>
                  </div>
                  <span className="ml-auto rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {item.result}
                  </span>
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className="relative mt-6 flex gap-2">
        {testimonials.map((item, idx) => (
          <button
            key={item.name}
            onClick={() => { setActive(idx); setPaused(true); }}
            aria-label={`View testimonial from ${item.name}`}
            className="h-2 flex-1 rounded-full bg-emerald-100 transition hover:bg-emerald-200"
          >
            <span
              className="block h-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-500"
              style={{ width: idx === active ? "100%" : "0%" }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
