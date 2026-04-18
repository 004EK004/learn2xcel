"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock3, Sparkles } from "lucide-react";
import type { Track } from "@/data/tracks";
import { cn } from "@/lib/utils";

export function TrackCard({ track, compact }: { track: Track; compact?: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm"
    >
      <div
        className={cn(
          "absolute inset-0 opacity-80 blur-3xl",
          `bg-gradient-to-br ${track.accent}`
        )}
      />
      <div className="relative flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-lg font-semibold text-emerald-700">
              {track.name.split(" ").slice(0, 2).map((word) => word[0]).join("")}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-600">
                {track.level}
              </p>
              <h3 className="text-xl font-semibold text-slate-900">{track.name}</h3>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs text-slate-700">
            <Clock3 className="h-4 w-4 text-emerald-600" />
            {track.duration}
          </span>
        </div>
        <p className="text-sm text-slate-700">{track.description}</p>
        {!compact && (
          <div className="flex flex-wrap gap-2 text-xs text-emerald-700">
            {track.tools.map((tool) => (
              <span
                key={tool}
                className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1"
              >
                <Sparkles className="h-3 w-3" />
                {tool}
              </span>
            ))}
          </div>
        )}
        <Link
          href={`/tracks/${track.slug}`}
          className="group inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-95"
        >
          View details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
