'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote, Sparkles } from "lucide-react";
import { testimonials } from "@/data/content";

export function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setActive((prev) => (prev + 1) % testimonials.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(0,240,255,0.14),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(176,38,255,0.14),transparent_28%)]" />
      <div className="relative flex items-center gap-3 pb-6">
        <div className="rounded-2xl bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
          Voices
        </div>
        <Sparkles className="h-4 w-4 text-cyan-200" />
      </div>
      <div className="relative">
        {testimonials.map((item, idx) =>
          idx === active ? (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <Quote className="h-8 w-8 text-cyan-300" />
              <p className="text-lg leading-relaxed text-white/90">{item.quote}</p>
              <div>
                <p className="text-sm font-semibold text-white">{item.name}</p>
                <p className="text-xs text-slate-300">
                  {item.role} · {item.company}
                </p>
              </div>
            </motion.div>
          ) : null
        )}
      </div>
      <div className="relative mt-6 flex gap-2">
        {testimonials.map((item, idx) => (
          <button
            key={item.name}
            onClick={() => setActive(idx)}
            className="h-2 flex-1 rounded-full bg-white/10 transition hover:bg-white/20"
          >
            <span
              className="block h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all"
              style={{ width: idx === active ? "100%" : "0%" }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
