import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-sm uppercase tracking-[0.24em] text-cyan-100">
        404
      </div>
      <h1 className="text-3xl font-semibold text-white">Page not found</h1>
      <p className="max-w-lg text-sm text-slate-300">
        The page you&apos;re looking for doesn&apos;t exist yet. Head back to the
        tracks or reach out if you need help.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Return home
      </Link>
    </div>
  );
}
