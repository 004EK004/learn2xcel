import { TrackCard } from "@/components/track-card";
import { tracks } from "@/data/tracks";
import Link from "next/link";

export default function TracksPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.18em] text-cyan-100">
          Tracks overview
        </p>
        <h1 className="text-3xl font-semibold text-white">
          Choose the path that matches your next promotion or project.
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl">
          Each track is built to be production-ready with Appwrite authentication,
          database stubs, and sample data. Shift between live and self-paced
          learning without losing momentum.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {tracks.map((track) => (
          <TrackCard key={track.slug} track={track} />
        ))}
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300 shadow-[0_20px_70px_rgba(0,0,0,0.45)]">
        <p className="font-semibold text-white">Need help deciding?</p>
        <p className="mt-2">
          Start with{" "}
          <Link href="/tracks/ai-excel" className="text-cyan-200 underline">
            AI with Excel
          </Link>{" "}
          if you want faster dashboards,{" "}
          <Link
            href="/tracks/original-excel"
            className="text-cyan-200 underline"
          >
            Original Excel
          </Link>{" "}
          for fundamentals, and{" "}
          <Link href="/tracks/data-analysis" className="text-cyan-200 underline">
            Data Analysis
          </Link>{" "}
          to run analytics and modelling inside Excel.
        </p>
      </div>
    </div>
  );
}
