'use client';

import Link from "next/link";
import type { MouseEvent } from "react";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export function CTASection() {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const glowX = useTransform(smoothX, (value) => `${value}%`);
  const glowY = useTransform(smoothY, (value) => `${value}%`);
  const glowBackground = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(16,185,129,0.24), transparent 35%)`;

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.section
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(50);
        mouseY.set(50);
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      className="relative overflow-hidden rounded-3xl border border-emerald-200/90 bg-gradient-to-r from-emerald-50 via-white to-green-50 px-6 py-10 shadow-[0_24px_80px_rgba(16,185,129,0.12)]"
      style={{ backgroundSize: "220% 220%" }}
    >
      {/* Mouse-follow glow keeps interaction subtle and performant. */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: glowBackground }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_80%_50%,rgba(34,197,94,0.14),transparent_35%)]" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-700">
            Ready to accelerate?
          </p>
          <h3 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            Join the Learn2Excel bootcamp and launch your next dashboard faster.
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-700 md:text-base">
            Enroll to unlock live sessions, mentor feedback, hands-on labs, and
            a certificate that proves you can ship.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/bootcamp"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(16,185,129,0.35)] transition duration-300 hover:scale-[1.04] hover:shadow-[0_20px_44px_rgba(16,185,129,0.5)]"
          >
            View Bootcamp Schedule
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
