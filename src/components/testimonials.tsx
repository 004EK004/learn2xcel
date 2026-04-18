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
    <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(16,185,129,0.14),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(34,197,94,0.12),transparent_28%)]" />
      <div className="relative flex items-center gap-3 pb-6">
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Voices
        </div>
        <Sparkles className="h-4 w-4 text-emerald-600" />
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
              <Quote className="h-8 w-8 text-emerald-600" />
              <p className="text-lg leading-relaxed text-slate-900">{item.quote}</p>
              <div>
                <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                <p className="text-xs text-slate-700">
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
            className="h-2 flex-1 rounded-full bg-emerald-100 transition hover:bg-emerald-200"
          >
            <span
              className="block h-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 transition-all"
              style={{ width: idx === active ? "100%" : "0%" }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
