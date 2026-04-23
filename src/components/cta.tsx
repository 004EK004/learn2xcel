'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const NEXT_COHORT = new Date("2026-05-11T00:00:00Z");

function useCohortCountdown() {
  const [days, setDays] = useState(0);
  useEffect(() => {
    const calc = () => {
      const diff = NEXT_COHORT.getTime() - Date.now();
      setDays(Math.max(0, Math.ceil(diff / 86_400_000)));
    };
    calc();
    const id = setInterval(calc, 60_000);
    return () => clearInterval(id);
  }, []);
  return days;
}

export function CTASection() {
  const days = useCohortCountdown();
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const glowX = useTransform(smoothX, (v) => `${v}%`);
  const glowY = useTransform(smoothY, (v) => `${v}%`);
  const glowBackground = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(16,185,129,0.3), transparent 40%)`;

  return (
    <motion.section
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
        mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
      }}
      onMouseLeave={() => { mouseX.set(50); mouseY.set(50); }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-12 shadow-[0_24px_80px_rgba(15,23,42,0.3)] md:px-10 md:py-14"
      style={{ backgroundSize: "220% 220%" }}
    >
      {/* Animated glow follow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: glowBackground }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.2),transparent_35%),radial-gradient(circle_at_80%_50%,rgba(34,197,94,0.15),transparent_35%)]" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl space-y-3">
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-400">
            Enrollment Open
          </p>
          <h3 className="text-2xl font-semibold text-white md:text-3xl">
            Your next promotion won&apos;t wait.
          </h3>
          <p className="text-sm leading-relaxed text-slate-300 md:text-base">
            Join the next cohort in under 2 minutes. Live sessions, real
            projects, and a certificate that proves you can ship.
          </p>
          {days > 0 && (
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">
              🗓 Next cohort starts in{" "}
              <span className="tabular-nums text-emerald-200">{days}</span>{" "}
              days — secure your spot.
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/bootcamp"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 px-7 py-4 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(16,185,129,0.4)] transition duration-300 hover:scale-[1.04] hover:shadow-[0_20px_44px_rgba(16,185,129,0.55)]"
          >
            Start Now
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/tracks"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            Browse Tracks
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
