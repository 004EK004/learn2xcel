import { CTASection } from "@/components/cta";
import { FAQSection } from "@/components/faq-section";
import { FeatureGrid } from "@/components/feature-grid";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { ScheduleDecision } from "@/components/schedule-decision";
import { SocialProofBand } from "@/components/social-proof-band";
import { Testimonials } from "@/components/testimonials";
import { TrackCard } from "@/components/track-card";
import { WhatYouBecome } from "@/components/what-you-become";
import { tracks } from "@/data/tracks";

export default function Home() {
  return (
    <div className="flex flex-col gap-14">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Social proof numbers band */}
      <SocialProofBand />

      {/* 3. Identity transformation */}
      <WhatYouBecome />

      {/* 4. Tracks — outcome-first cards */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-10 rounded-full bg-gradient-to-r from-emerald-400 to-green-500" />
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Tracks</p>
        </div>
        <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
          Three tracks, one outcome: launch-ready skills.
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map((track) => (
            <TrackCard
              key={track.slug}
              track={track}
              highlight={track.slug === "ai-excel"}
            />
          ))}
        </div>
      </section>

      {/* 5. Bootcamp schedule decision engine */}
      <ScheduleDecision />

      {/* 6. Testimonials carousel */}
      <Testimonials />

      {/* 7. How it works */}
      <HowItWorks />

      {/* 8. Interactive feature tabs */}
      <FeatureGrid />

      {/* 9. Final CTA — dark, high-pressure */}
      <CTASection />

      {/* 10. FAQ */}
      <FAQSection />
    </div>
  );
}
