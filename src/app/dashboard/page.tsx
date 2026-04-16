'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, FileBadge2, Loader2, Shield } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { getUserProgress } from "@/lib/appwrite";
import { tracks } from "@/data/tracks";
import { Skeleton } from "@/components/skeleton";
import type { Models } from "appwrite";

type ProgressItem = {
  trackId: string;
  completedLessons: string[];
  certificateUrl?: string;
};

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please login to view your dashboard.");
      router.push("/auth");
    }
  }, [loading, user, router]);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) return;
      setLoadingProgress(true);
      const docs = await getUserProgress(user.$id);
      if (docs.length === 0) {
        // Fallback demo progress
        setProgress(
          tracks.map((track, idx) => ({
            trackId: track.slug,
            completedLessons: track.modules.slice(0, idx + 1).map((m) => m.title),
          }))
        );
      } else {
        setProgress(
          docs.map(
            (
              doc: Models.Document & {
                trackId?: string;
                completedLessons?: string[];
                certificateUrl?: string;
              }
            ) => ({
              trackId: doc.trackId || "unknown-track",
              completedLessons: doc.completedLessons || [],
              certificateUrl: doc.certificateUrl,
            })
          )
        );
      }
      setLoadingProgress(false);
    };
    fetchProgress();
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
        <Shield className="h-4 w-4 text-cyan-300" />
        Redirecting to login…
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.18em] text-cyan-100">
          Dashboard
        </p>
        <h1 className="text-3xl font-semibold text-white">
          Welcome back, {user.name || "Learner"}.
        </h1>
        <p className="text-sm text-slate-300">
          Track your enrolled courses, progress, and certificates. Data syncs
          with Appwrite when configured.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {loadingProgress &&
          Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton key={idx} className="h-36" />
          ))}
        {!loadingProgress &&
          progress.map((item) => {
            const track = tracks.find((t) => t.slug === item.trackId);
            if (!track) return null;
            const completion =
              Math.round(
                (item.completedLessons.length / track.modules.length) * 100
              ) || 0;
            return (
              <div
                key={track.slug}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.45)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      {track.level}
                    </p>
                    <p className="text-lg font-semibold text-white">
                      {track.name}
                    </p>
                  </div>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-slate-200">
                    {completion}% complete
                  </span>
                </div>
                <div className="relative mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-600"
                    style={{ width: `${completion}%` }}
                  />
                </div>
                <div className="mt-3 text-xs text-slate-300">
                  Completed lessons:
                  <div className="mt-1 flex flex-wrap gap-2">
                    {item.completedLessons.map((lesson) => (
                      <span
                        key={lesson}
                        className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1"
                      >
                        <CheckCircle2 className="h-3 w-3 text-cyan-300" />
                        {lesson}
                      </span>
                    ))}
                  </div>
                </div>
                {item.certificateUrl && (
                  <a
                    href={item.certificateUrl}
                    target="_blank"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200"
                  >
                    <FileBadge2 className="h-4 w-4" />
                    View certificate
                  </a>
                )}
              </div>
            );
          })}
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300 shadow-[0_25px_80px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2 text-white">
          <Loader2 className="h-4 w-4 animate-spin text-cyan-300" />
          Live data note
        </div>
        <p className="mt-2">
          Connect your Appwrite endpoint, project, and database IDs in
          <code className="mx-1 rounded bg-black/40 px-2 py-1 text-xs text-cyan-200">
            .env.local
          </code>
          to sync enrollments and progress automatically.
        </p>
      </div>
    </div>
  );
}
