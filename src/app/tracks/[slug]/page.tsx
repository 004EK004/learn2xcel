import { notFound } from "next/navigation";
import { tracks } from "@/data/tracks";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return tracks.map((track) => ({ slug: track.slug }));
}

export default function TrackDetail({
  params,
}: {
  params: { slug: string };
}) {
  const track = tracks.find((t) => t.slug === params.slug);
  if (!track) return notFound();

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.18em] text-cyan-100">
          Track detail
        </p>
        <h1 className="text-3xl font-semibold text-white">{track.name}</h1>
        <p className="max-w-3xl text-sm text-slate-300">{track.description}</p>
        <div className="flex flex-wrap gap-3 text-xs text-slate-200">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
            {track.level}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
            {track.duration}
          </span>
          {track.tools.map((tool) => (
            <span
              key={tool}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1"
            >
              <Sparkles className="h-3 w-3 text-cyan-300" />
              {tool}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.45)]">
          <div className="flex items-center gap-2">
            <div className="h-1 w-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500" />
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              Curriculum
            </p>
          </div>
          <div className="grid gap-3">
            {track.modules.map((module) => (
              <div
                key={module.title}
                className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 shadow-inner shadow-cyan-500/10"
              >
                <p className="text-sm font-semibold text-white">
                  {module.title}
                </p>
                <p className="text-xs text-slate-300">{module.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.45)]">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-100">
              Outcomes
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              {track.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-[2px] h-4 w-4 text-cyan-300" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/15 via-purple-600/15 to-blue-700/15 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.5)]">
            <h3 className="text-xl font-semibold text-white">
              Ready to enroll?
            </h3>
            <p className="mt-2 text-sm text-slate-200">
              Secure your spot in the next bootcamp cohort and connect your
              Appwrite project for real data capture.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/bootcamp"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#0a0a0f] shadow-lg transition hover:-translate-y-0.5"
              >
                Bootcamp schedule
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/60"
              >
                Compare plans
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
