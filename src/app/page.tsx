import { CTASection } from "@/components/cta";
import { FeatureGrid } from "@/components/feature-grid";
import { Hero } from "@/components/hero";
import { TrackCard } from "@/components/track-card";
import { Testimonials } from "@/components/testimonials";
import { AffiliateSupportSection } from "@/components/affiliate-support-section";
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
            <div className="h-1 w-10 rounded-full bg-gradient-to-r from-emerald-400 to-green-500" />
            <p className="text-xs uppercase tracking-[0.18em] text-slate-600">
              Tracks
            </p>
          </div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Three tracks, one outcome: launch-ready Excel and analytics skills.
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {tracks.map((track) => (
              <TrackCard key={track.slug} track={track} />
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-emerald-200/70 bg-white p-6 shadow-[0_24px_70px_rgba(16,185,129,0.14)]">
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-700">
            Bootcamp Schedule
          </p>
          <h3 className="text-xl font-semibold text-slate-900">
            Choose a cohort, join live sessions, and start building.
          </h3>
          <div className="space-y-3">
            {cohorts.map((cohort) => (
              <div
                key={cohort.id}
                className="flex flex-col gap-1 rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-sm text-slate-700 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(16,185,129,0.14)]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">{cohort.name}</span>
                  <span className="text-xs text-emerald-700">{cohort.format}</span>
                </div>
                <p className="text-xs text-slate-600">
                  Starts {formatDate(cohort.startDate)} · {cohort.price}
                </p>
              </div>
            ))}
          </div>
            <Link
              href="/bootcamp"
               className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(16,185,129,0.3)] transition duration-300 hover:scale-[1.03] hover:shadow-[0_16px_30px_rgba(16,185,129,0.42)]"
            >
              View full schedule
            </Link>
          </div>
        </section>

      <FeatureGrid />
      <Testimonials />
      <AffiliateSupportSection />
      <CTASection />
    </div>
  );
}
