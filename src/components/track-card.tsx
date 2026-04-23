"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock3, Sparkles, Star } from "lucide-react";
import type { Track } from "@/data/tracks";
import { cn } from "@/lib/utils";

const levelBadgeClass: Record<string, string> = {
  Beginner: "bg-sky-50 text-sky-700 border-sky-200",
  Intermediate: "bg-amber-50 text-amber-700 border-amber-200",
  Advanced: "bg-rose-50 text-rose-700 border-rose-200",
};

const outcomeMap: Record<string, string> = {
  "ai-excel": "Automate your weekly reporting in under 2 hours.",
  "original-excel": "Build dashboards you can show in interviews.",
  "data-analysis": "Ship executive-ready analysis stakeholders trust.",
};

export function TrackCard({ track, compact, highlight }: { track: Track; compact?: boolean; highlight?: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cn(
        "relative overflow-hidden rounded-3xl border bg-white p-6 shadow-sm transition duration-300",
        highlight
          ? "border-emerald-300 shadow-[0_16px_40px_rgba(16,185,129,0.2)]"
          : "border-emerald-100 hover:shadow-[0_18px_40px_rgba(16,185,129,0.14)]"
      )}
    >
      {highlight && (
        <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
          <Star className="h-3 w-3 fill-white" /> Most Popular
        </span>
      )}

      <div
        className={cn(
          "absolute inset-0 opacity-40 blur-3xl",
          `bg-gradient-to-br ${track.accent}`
        )}
      />

      <div className="relative flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <span
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-semibold",
              levelBadgeClass[track.level] ?? "bg-slate-50 text-slate-700 border-slate-200"
            )}
          >
            {track.level}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-white px-3 py-1 text-xs text-slate-600">
            <Clock3 className="h-3.5 w-3.5 text-emerald-600" />
            {track.duration}
          </span>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-900">{track.name}</h3>
          {/* Outcome-first headline */}
          <p className="mt-1 text-sm font-medium text-emerald-700">
            🔥 {outcomeMap[track.slug] ?? track.description}
          </p>
        </div>

        <p className="text-sm text-slate-600">{track.description}</p>

        {/* Tool chips */}
        {!compact && (
          <div className="flex flex-wrap gap-2">
            {track.tools.map((tool) => (
              <span
                key={tool}
                className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800"
              >
                <Sparkles className="h-3 w-3" />
                {tool}
              </span>
            ))}
          </div>
        )}

        <Link
          href={`/tracks/${track.slug}`}
          className="group mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(16,185,129,0.3)] transition hover:scale-[1.02] hover:shadow-[0_10px_24px_rgba(16,185,129,0.42)]"
        >
          View details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
