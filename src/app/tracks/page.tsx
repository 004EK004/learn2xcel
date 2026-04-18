import { TrackCard } from "@/components/track-card";
import { tracks } from "@/data/tracks";
import Link from "next/link";

export default function TracksPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.18em] text-emerald-700">
          Tracks overview
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">
          Choose the path that matches your next promotion or project.
        </h1>
        <p className="text-sm text-slate-700 max-w-3xl">
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
      <div className="rounded-3xl border border-emerald-100 bg-white p-6 text-sm text-slate-700 shadow-sm">
        <p className="font-semibold text-slate-900">Need help deciding?</p>
        <p className="mt-2">
          Start with{" "}
          <Link href="/tracks/ai-excel" className="text-emerald-700 underline">
            AI with Excel
          </Link>{" "}
          if you want faster dashboards,{" "}
          <Link
            href="/tracks/original-excel"
            className="text-emerald-700 underline"
          >
            Original Excel
          </Link>{" "}
          for fundamentals, and{" "}
          <Link href="/tracks/data-analysis" className="text-emerald-700 underline">
            Data Analysis
          </Link>{" "}
          to run analytics and modelling inside Excel.
        </p>
      </div>
    </div>
  );
}
