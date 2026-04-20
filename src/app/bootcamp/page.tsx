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
      toast.error("Enrollment could not be saved right now. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.18em] text-emerald-700">
          Bootcamp schedule
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">
          Cohorts built for momentum — live labs, mentor reviews, and live
          integrations.
        </h1>
        <p className="max-w-3xl text-sm text-slate-700">
          Pick a start date, lock a track, and move through secure real-world
          projects with seamless authentication. Every cohort ends with a
          portfolio artifact.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cohorts.map((cohort) => (
          <div
            key={cohort.id}
            className="group relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-5 shadow-[0_18px_42px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:border-emerald-300/70 hover:shadow-[0_24px_56px_rgba(16,185,129,0.16)]"
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
                <p>• Secure real-world projects</p>
                <p>• Weekly mentor feedback</p>
              </div>
              <div className="flex flex-wrap gap-2 pt-3">
                {tracks.map((track) => (
                  <button
                    key={track.slug}
                    disabled={submitting === `${track.slug}-${cohort.id}` || loading}
                    onClick={() => handleEnroll(track.slug, cohort.id)}
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition duration-300 hover:border-emerald-400/60 hover:bg-emerald-50/70"
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

      <div className="rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 via-white to-green-50/80 p-6 shadow-[0_18px_48px_rgba(16,185,129,0.12)]">
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
                "Seamless authentication integrated into your learner dashboard",
                "Database helpers for enrollments and user progress",
                "Starter schemas you can import into your Learn2Excel workspace",
                "Templates for dashboards, AI prompts, and reporting",
                "14-day 100% money-back guarantee window published at checkout",
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
