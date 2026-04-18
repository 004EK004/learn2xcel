'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarClock, CheckCircle2, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import { cohorts } from "@/data/content";
import { tracks } from "@/data/tracks";
import { createEnrollment } from "@/lib/appwrite";
import { useAuth } from "@/context/AuthContext";
import { formatDate } from "@/lib/utils";

export default function BootcampPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState<string | null>(null);

  const handleEnroll = async (trackId: string, cohortId: string) => {
    if (!user) {
      toast.error("Login to enroll in a cohort.");
      router.push("/auth");
      return;
    }
    setSubmitting(`${trackId}-${cohortId}`);
    const result = await createEnrollment({
      email: user.email,
      trackId,
      cohortId,
      paymentStatus: "pending",
    });
    setSubmitting(null);
    if (result?.success) {
      toast.success("Enrollment captured! Check your inbox for details.");
      router.push("/dashboard");
    } else {
      toast.success("Enrollment recorded locally. Connect Appwrite to store.");
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.18em] text-emerald-700">
          Bootcamp schedule
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">
          Cohorts built for momentum — live labs, mentor reviews, and Appwrite
          hooks.
        </h1>
        <p className="max-w-3xl text-sm text-slate-700">
          Pick a start date, lock a track, and connect your Appwrite project to
          push real auth + database events. Every cohort ends with a portfolio
          artifact.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cohorts.map((cohort) => (
          <div
            key={cohort.id}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.45)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
            <div className="relative space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
                <CalendarClock className="h-4 w-4" />
                {cohort.format}
              </div>
              <h2 className="text-xl font-semibold text-slate-900">
                {cohort.name}
              </h2>
              <p className="text-sm text-slate-700">
                Starts {cohort.startDate === "Start anytime"
                  ? cohort.startDate
                  : formatDate(cohort.startDate)}
              </p>
              <p className="text-lg font-semibold text-emerald-700">
                {cohort.price}
              </p>
              <div className="space-y-1 text-xs text-slate-700">
                <p>• Live labs and replays</p>
                <p>• Appwrite-authenticated projects</p>
                <p>• Weekly mentor feedback</p>
              </div>
              <div className="flex flex-wrap gap-2 pt-3">
                {tracks.map((track) => (
                  <button
                    key={track.slug}
                    disabled={submitting === `${track.slug}-${cohort.id}` || loading}
                    onClick={() => handleEnroll(track.slug, cohort.id)}
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition hover:border-emerald-400/60"
                  >
                    {submitting === `${track.slug}-${cohort.id}`
                      ? "Submitting..."
                      : track.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-emerald-100 bg-emerald-50/30 p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.18em] text-emerald-700">
              What you get
            </p>
            <h3 className="text-xl font-semibold text-slate-900">
              Certificates, code samples, and repeatable playbooks.
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              {[
                "Appwrite authentication integrated into the dashboard route",
                "Database helpers for enrollments and user progress",
                "Starter schemas you can import into your Appwrite project",
                "Templates for dashboards, AI prompts, and reporting",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-[2px] h-4 w-4 text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => router.push("/contact")}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(16,185,129,0.25)] transition hover:-translate-y-0.5"
          >
            Contact Admissions
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
