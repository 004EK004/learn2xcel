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
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur"
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
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-lg font-semibold text-white shadow-inner shadow-cyan-400/20">
              {track.name.split(" ").slice(0, 2).map((word) => word[0]).join("")}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                {track.level}
              </p>
              <h3 className="text-xl font-semibold text-white">{track.name}</h3>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-slate-200">
            <Clock3 className="h-4 w-4 text-cyan-300" />
            {track.duration}
          </span>
        </div>
        <p className="text-sm text-slate-300">{track.description}</p>
        {!compact && (
          <div className="flex flex-wrap gap-2 text-xs text-cyan-100">
            {track.tools.map((tool) => (
              <span
                key={tool}
                className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 shadow-inner shadow-cyan-500/10"
              >
                <Sparkles className="h-3 w-3" />
                {tool}
              </span>
            ))}
          </div>
        )}
        <Link
          href={`/tracks/${track.slug}`}
          className="group inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-white/10 to-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-400/60 hover:from-cyan-500/20 hover:to-purple-600/20"
        >
          View details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
