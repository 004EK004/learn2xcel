'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarClock, CheckCircle2, Flame } from "lucide-react";
import { cohorts } from "@/data/content";
import { formatDate } from "@/lib/utils";

const TARGET_DATES: Record<string, Date> = {
  "cohort-may": new Date("2026-05-11T00:00:00Z"),
  "cohort-jun": new Date("2026-06-08T00:00:00Z"),
};

function useDaysLeft(id: string) {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    const target = TARGET_DATES[id];
    if (!target) return;
    const calc = () => {
      const diff = target.getTime() - Date.now();
      setDays(Math.max(0, Math.ceil(diff / 86_400_000)));
    };
    calc();
    const timerId = setInterval(calc, 60_000);
    return () => clearInterval(timerId);
  }, [id]);
  return days;
}

const RECOMMENDED_ID = "cohort-may";
const SEATS_LEFT: Record<string, number> = {
  "cohort-may": 9,
  "cohort-jun": 14,
  "cohort-self": 99,
};

function CohortCard({ cohort }: { cohort: typeof cohorts[number] }) {
  const days = useDaysLeft(cohort.id);
  const recommended = cohort.id === RECOMMENDED_ID;
  const seats = SEATS_LEFT[cohort.id] ?? 20;
  const scarce = seats <= 12;

  return (
    <div
      className={`relative flex flex-col gap-3 rounded-3xl border p-5 transition duration-300 hover:-translate-y-0.5 ${
        recommended
          ? "border-emerald-300 bg-white shadow-[0_16px_40px_rgba(16,185,129,0.18)]"
          : "border-emerald-100 bg-white shadow-sm hover:shadow-[0_12px_28px_rgba(16,185,129,0.14)]"
      }`}
    >
      {recommended && (
        <span className="absolute -top-3 left-5 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow">
          ⭐ Recommended
        </span>
      )}

      <div className="flex items-start justify-between gap-2">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
          <CalendarClock className="h-3.5 w-3.5" />
          {cohort.format}
        </div>
        {days !== null && days > 0 && (
          <span className="text-xs font-semibold text-slate-500 tabular-nums">
            {days}d left to join
          </span>
        )}
      </div>

      <div>
        <h3 className="text-base font-semibold text-slate-900">{cohort.name}</h3>
        <p className="text-xs text-slate-600">
          Starts{" "}
          {cohort.startDate === "Start anytime"
            ? cohort.startDate
            : formatDate(cohort.startDate)}
        </p>
      </div>

      <p className="text-xl font-bold text-emerald-700">{cohort.price}</p>

      <ul className="space-y-1 text-xs text-slate-600">
        {["Live labs & replays", "Mentor feedback", "Certificate"].map((item) => (
          <li key={item} className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            {item}
          </li>
        ))}
      </ul>

      {scarce && cohort.id !== "cohort-self" && (
        <p className="flex items-center gap-1.5 text-xs font-semibold text-rose-600">
          <Flame className="h-3.5 w-3.5 animate-pulse" />
          Only {seats} seats left
        </p>
      )}
    </div>
  );
}

export function ScheduleDecision() {
  return (
    <section className="space-y-5 rounded-3xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50/80 via-white to-green-50/60 p-6 shadow-[0_24px_70px_rgba(16,185,129,0.1)]">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.18em] text-emerald-700">
          Bootcamp Schedule
        </p>
        <h2 className="text-xl font-semibold text-slate-900">
          Choose your start date
        </h2>
        <p className="text-sm text-slate-600">
          One cohort is recommended — but all three deliver the same curriculum.
        </p>
      </div>

      <div className="grid gap-4 pt-2 sm:grid-cols-3">
        {cohorts.map((cohort) => (
          <CohortCard key={cohort.id} cohort={cohort} />
        ))}
      </div>

      <Link
        href="/bootcamp"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(16,185,129,0.3)] transition hover:scale-[1.03] hover:shadow-[0_14px_30px_rgba(16,185,129,0.42)]"
      >
        View full schedule & enroll
      </Link>
    </section>
  );
}
