import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-100/60 via-white to-green-100/50 px-6 py-10 shadow-sm">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_80%_50%,rgba(34,197,94,0.15),transparent_35%)]" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-700">
            Ready to accelerate?
          </p>
          <h3 className="text-2xl font-semibold text-slate-900">
            Join the Learn2Excel bootcamp and launch your next dashboard faster.
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-slate-700">
            Enroll to unlock live sessions, mentor feedback, Appwrite-connected
            labs, and a certificate that proves you can ship.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/bootcamp"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(16,185,129,0.25)] transition hover:-translate-y-0.5"
          >
            View Bootcamp Schedule
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
