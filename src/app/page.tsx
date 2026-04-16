import { CTASection } from "@/components/cta";
import { FeatureGrid } from "@/components/feature-grid";
import { Hero } from "@/components/hero";
import { TrackCard } from "@/components/track-card";
import { Testimonials } from "@/components/testimonials";
import { cohorts } from "@/data/content";
import { tracks } from "@/data/tracks";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <Hero />

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-1 w-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500" />
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              Tracks
            </p>
          </div>
          <h2 className="text-2xl font-semibold text-white">
            Three tracks, one outcome: launch-ready Excel and analytics skills.
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {tracks.map((track) => (
              <TrackCard key={track.slug} track={track} />
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_25px_70px_rgba(0,0,0,0.45)]">
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-100">
            Bootcamp Schedule
          </p>
          <h3 className="text-xl font-semibold text-white">
            Choose a cohort, connect Appwrite, and start building.
          </h3>
          <div className="space-y-3">
            {cohorts.map((cohort) => (
              <div
                key={cohort.id}
                className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{cohort.name}</span>
                  <span className="text-xs text-cyan-200">{cohort.format}</span>
                </div>
                <p className="text-xs text-slate-400">
                  Starts {formatDate(cohort.startDate)} · {cohort.price}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/bootcamp"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_22px_rgba(0,240,255,0.3)] transition hover:scale-[1.01]"
          >
            View full schedule
          </Link>
        </div>
      </section>

      <FeatureGrid />
      <Testimonials />
      <CTASection />
    </div>
  );
}
