import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/20 via-purple-600/15 to-blue-700/15 px-6 py-10 shadow-[0_25px_80px_rgba(0,0,0,0.5)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,240,255,0.25),transparent_35%),radial-gradient(circle_at_80%_50%,rgba(176,38,255,0.22),transparent_35%)]" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-100">
            Ready to accelerate?
          </p>
          <h3 className="text-2xl font-semibold text-white">
            Join the Learn2Excel bootcamp and launch your next dashboard faster.
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-slate-200">
            Enroll to unlock live sessions, mentor feedback, Appwrite-connected
            labs, and a certificate that proves you can ship.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/bootcamp"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0a0a0f] shadow-lg transition hover:-translate-y-0.5"
          >
            View Bootcamp Schedule
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/60"
          >
            Compare Plans
          </Link>
        </div>
      </div>
    </section>
  );
}
