import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import {
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarClock,
  ChartNoAxesColumn,
  CheckCircle2,
  Clock3,
  FileCheck2,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

type TrackOption = {
  slug: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  title: string;
  headline: string;
  description: string;
  skills: string[];
  proof: string;
  cta: string;
  highlight?: boolean;
};

const trackOptions: TrackOption[] = [
  {
    slug: "ai-excel",
    level: "Intermediate",
    duration: "6 weeks",
    title: "AI with Excel",
    headline: "Build dashboards faster with Copilot, ChatGPT, and Azure ML workflows.",
    description:
      "Move from manual reporting to AI-accelerated analysis so you can deliver production-ready dashboards and earn bigger project ownership.",
    skills: ["Copilot", "ChatGPT", "Power Query", "Office Scripts", "Azure ML"],
    proof: "4.9/5 learner rating • 1,200+ enrollments",
    cta: "Choose AI with Excel",
    highlight: true,
  },
  {
    slug: "original-excel",
    level: "Beginner",
    duration: "5 weeks",
    title: "Original Excel",
    headline: "Master Excel fundamentals that hiring managers expect in every analyst.",
    description:
      "Build confidence with formulas, pivots, and automation so you can contribute faster, reduce errors, and present cleaner business reports.",
    skills: ["XLOOKUP", "Dynamic Arrays", "Power Pivot", "VBA", "Power Query"],
    proof: "4.8/5 learner rating • 950+ enrollments",
    cta: "Choose Original Excel",
  },
  {
    slug: "data-analysis",
    level: "Advanced",
    duration: "6 weeks",
    title: "Data Analysis",
    headline: "Ship executive-ready analysis with advanced modeling and data storytelling.",
    description:
      "Transform large datasets into clear insights with SQL-connected models, what-if analysis, and dashboards stakeholders can trust.",
    skills: ["Power Query", "Power Pivot", "Solver", "SQL connectors", "Advanced Charts"],
    proof: "4.9/5 learner rating • 870+ enrollments",
    cta: "Choose Data Analysis",
  },
];

const testimonials = [
  {
    name: "Priya Raman",
    role: "Senior Analyst, Retail Ops",
    quote:
      "I completed AI with Excel while working full-time and used the project templates in my weekly reporting. I was promoted to Senior Analyst in four months.",
    result: "Promoted to Senior Analyst",
    image: "/avatars/priya-raman.svg",
  },
  {
    name: "Marcus Lee",
    role: "FP&A Specialist, SaaS",
    quote:
      "The live + self-paced mix helped me build a forecasting dashboard leadership now uses every Monday. It replaced two manual decks.",
    result: "Owned company forecasting dashboard",
    image: "/avatars/marcus-lee.svg",
  },
  {
    name: "Nadia Okafor",
    role: "Business Analyst, Healthcare",
    quote:
      "Power Query and Copilot changed how fast I clean data. I shipped my capstone to production and got pulled into higher-impact projects.",
    result: "Moved into strategic analytics projects",
    image: "/avatars/nadia-okafor.svg",
  },
  {
    name: "Daniel Ortiz",
    role: "Operations Manager, Logistics",
    quote:
      "I joined to improve Excel fundamentals and left with a complete KPI dashboard tied to real sample data and Appwrite-authenticated access.",
    result: "Delivered first end-to-end KPI dashboard",
    image: "/avatars/daniel-ortiz.svg",
  },
];

const faqs = [
  {
    question: "How much does each track cost?",
    answer:
      "Pricing is shown at checkout by track and format. You can start with the free preview and choose live or self-paced before payment.",
  },
  {
    question: "How many hours should I plan each week?",
    answer:
      "Most learners spend 4–6 hours weekly. Live sessions are recorded, so you can catch up on your own schedule.",
  },
  {
    question: "Can I switch between live and self-paced?",
    answer:
      "Yes. Every track supports both formats, so you can adjust if your work schedule changes mid-program.",
  },
  {
    question: "Is the certificate useful for my career?",
    answer:
      "You receive a completion certificate plus project artifacts you can share in performance reviews, internal mobility discussions, and interviews.",
  },
  {
    question: "What is the refund policy?",
    answer:
      "If the track is not the right fit, request a refund within the published guarantee window shown at checkout.",
  },
];

export const metadata: Metadata = {
  title:
    "Excel Data Analysis Course & AI Excel Training | Learn2Excel Tracks",
  description:
    "Compare Learn2Excel tracks for AI Excel, Power Query training, and Excel data analysis. Learn Excel online with live or self-paced flexibility and production-ready projects.",
  keywords: [
    "AI Excel course",
    "Excel with Copilot",
    "learn Excel online",
    "Excel data analysis course",
    "Power Query training",
  ],
  alternates: {
    canonical: "https://learn2xcel.com/tracks",
  },
};

export const revalidate = 86400;

export default function TracksPage() {
  const daysUntilNextCohort = getDaysUntilNextCohort();
  const urgencyMessage =
    daysUntilNextCohort === 0
      ? "Next cohort starts today — secure your spot."
      : `Next cohort starts in ${daysUntilNextCohort} days — secure your spot.`;

  return (
    <div className="flex flex-col gap-16">
      <section className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-green-50 p-6 shadow-sm md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Tracks Overview
        </p>
        <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          Master AI Excel skills to win bigger projects and promotions.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-slate-700 md:text-base">
          Build faster dashboards and production-ready projects with live or
          self-paced flexibility, Appwrite authentication, and real sample data.
          Learn Excel online in a format that fits your workweek.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="#decision-guide"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(16,185,129,0.35)] transition hover:scale-[1.01]"
          >
            Find My Perfect Track →
          </Link>
          <p className="text-sm font-medium text-slate-700">
            Trusted by professionals building faster reporting workflows.
          </p>
        </div>
        <div className="mt-8 grid gap-3 rounded-2xl border border-emerald-100 bg-white p-4 text-sm text-slate-700 md:grid-cols-2 lg:grid-cols-4">
          <div className="inline-flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-emerald-700" />
            Self-paced or Live
          </div>
          <div className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-700" />
            Money-back guarantee
          </div>
          <div className="inline-flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-emerald-700" />
            Certificate of completion
          </div>
          <div className="inline-flex items-center gap-2">
            <Workflow className="h-4 w-4 text-emerald-700" />
            Production-ready projects
          </div>
        </div>
      </section>

      <section className="space-y-6" aria-labelledby="compare-tracks-heading">
        <div className="space-y-2">
          <h2
            id="compare-tracks-heading"
            className="text-2xl font-semibold text-slate-900 md:text-3xl"
          >
            Compare All Tracks
          </h2>
          <p className="text-sm text-slate-700">
            Quick side-by-side view to pick the best Excel data analysis course
            for your current goals.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-700">
              <caption className="sr-only">Learn2Excel track comparison table</caption>
              <thead className="bg-emerald-50 text-xs uppercase tracking-[0.16em] text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Track</th>
                  <th className="px-4 py-3 font-semibold">Best for</th>
                  <th className="px-4 py-3 font-semibold">Duration</th>
                  <th className="px-4 py-3 font-semibold">Format</th>
                  <th className="px-4 py-3 font-semibold">Typical outcome</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-emerald-100">
                  <th className="px-4 py-4 font-semibold text-slate-900">AI with Excel</th>
                  <td className="px-4 py-4">Analysts who want to automate dashboard workflows</td>
                  <td className="px-4 py-4">6 weeks</td>
                  <td className="px-4 py-4">Live or Self-Paced</td>
                  <td className="px-4 py-4">Faster reporting with Copilot-ready projects</td>
                </tr>
                <tr className="border-t border-emerald-100">
                  <th className="px-4 py-4 font-semibold text-slate-900">Original Excel</th>
                  <td className="px-4 py-4">Professionals building core spreadsheet confidence</td>
                  <td className="px-4 py-4">5 weeks</td>
                  <td className="px-4 py-4">Live or Self-Paced</td>
                  <td className="px-4 py-4">Cleaner models and stronger team reporting</td>
                </tr>
                <tr className="border-t border-emerald-100">
                  <th className="px-4 py-4 font-semibold text-slate-900">Data Analysis</th>
                  <td className="px-4 py-4">Experienced users driving strategic analysis</td>
                  <td className="px-4 py-4">6 weeks</td>
                  <td className="px-4 py-4">Live or Self-Paced</td>
                  <td className="px-4 py-4">Decision-ready analysis and executive dashboards</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="space-y-5" aria-labelledby="track-cards-heading">
        <h2 id="track-cards-heading" className="text-2xl font-semibold text-slate-900 md:text-3xl">
          Choose your career track
        </h2>
        <div className="grid gap-5 lg:grid-cols-3">
          {trackOptions.map((track) => (
            <article
              key={track.slug}
              className={`relative flex h-full flex-col rounded-3xl border bg-white p-6 shadow-sm ${
                track.highlight
                  ? "border-emerald-300 shadow-[0_16px_34px_rgba(16,185,129,0.18)]"
                  : "border-emerald-100"
              }`}
            >
              {track.highlight && (
                <span className="absolute right-4 top-4 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                  {track.level}
                </span>
                <p className="inline-flex items-center gap-1 text-xs text-slate-600">
                  <Clock3 className="h-4 w-4 text-emerald-700" />
                  {track.duration} · Live or Self-Paced
                </p>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900">{track.title}</h3>
              <p className="mt-2 text-sm font-medium text-slate-900">{track.headline}</p>
              <p className="mt-3 text-sm text-slate-700">{track.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {track.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800"
                  >
                    <Sparkles className="h-3 w-3" />
                    {skill}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs font-semibold text-slate-600">{track.proof}</p>
              <Link
                href={`/tracks/${track.slug}`}
                className="mt-5 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.01]"
              >
                {track.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="decision-guide" className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">Need help deciding?</h2>
        <p className="mt-2 text-sm text-slate-700">
          Start with this track if your current goal matches one of the paths
          below.
        </p>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
            <p className="text-sm font-semibold text-slate-900">Start with Original Excel if…</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li className="inline-flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-700" />You need confidence with formulas and pivots.</li>
              <li className="inline-flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-700" />You want cleaner reporting in your current role.</li>
              <li className="inline-flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-700" />You are early-career or self-taught in Excel.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-100/50 p-5">
            <p className="text-sm font-semibold text-slate-900">Start with AI with Excel if…</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li className="inline-flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-700" />You need to ship dashboards faster this quarter.</li>
              <li className="inline-flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-700" />You want practical Copilot and ChatGPT workflows.</li>
              <li className="inline-flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-700" />You are targeting promotion-level project impact.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
            <p className="text-sm font-semibold text-slate-900">Start with Data Analysis if…</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li className="inline-flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-700" />You already know Excel fundamentals.</li>
              <li className="inline-flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-700" />You handle large datasets and executive requests.</li>
              <li className="inline-flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-700" />You need robust SQL-connected modeling workflows.</li>
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="testimonials-heading" className="space-y-5">
        <h2 id="testimonials-heading" className="text-2xl font-semibold text-slate-900 md:text-3xl">
          Success stories from recent learners
        </h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <Image
                  src={item.image}
                  alt={`${item.name} avatar`}
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-full border border-emerald-100"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-600">{item.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-700">“{item.quote}”</p>
              <p className="mt-3 text-xs font-semibold text-emerald-700">{item.result}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="why-learn2excel-heading" className="space-y-5">
        <h2 id="why-learn2excel-heading" className="text-2xl font-semibold text-slate-900 md:text-3xl">
          Why Learn2Excel
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <FeatureItem
            icon={<ChartNoAxesColumn className="h-5 w-5 text-emerald-700" />}
            title="Dashboard speed"
            description="Use AI-assisted workflows to reduce reporting cycle time and deliver insights faster."
          />
          <FeatureItem
            icon={<FileCheck2 className="h-5 w-5 text-emerald-700" />}
            title="Production-ready projects"
            description="Every track includes practical projects built with realistic data and clean delivery standards."
          />
          <FeatureItem
            icon={<CalendarClock className="h-5 w-5 text-emerald-700" />}
            title="Flexible format"
            description="Choose live or self-paced learning and switch without resetting your momentum."
          />
          <FeatureItem
            icon={<BadgeCheck className="h-5 w-5 text-emerald-700" />}
            title="Career-ready proof"
            description="Share your completion certificate and projects in reviews, interviews, and internal promotions."
          />
          <FeatureItem
            icon={<BriefcaseBusiness className="h-5 w-5 text-emerald-700" />}
            title="Business-first curriculum"
            description="Lessons are designed for analysts, finance, operations, and product teams—not abstract demos."
          />
          <FeatureItem
            icon={<BookOpenCheck className="h-5 w-5 text-emerald-700" />}
            title="Real support"
            description="Structured curriculum, practical examples, and clear implementation guidance each week."
          />
        </div>
      </section>

      <section className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Risk-free guarantee</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-700">
              Start with confidence. If your selected track is not the right fit,
              request a refund within the guarantee window provided at checkout.
            </p>
          </div>
          <ShieldCheck className="h-10 w-10 text-emerald-700" />
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="space-y-5">
        <h2 id="faq-heading" className="text-2xl font-semibold text-slate-900 md:text-3xl">
          Frequently asked questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-slate-900">
                <span>{faq.question}</span>
                <span
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-emerald-200 text-emerald-700 transition group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-slate-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-600 to-green-600 p-6 text-white shadow-sm md:p-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-emerald-100">
              Enrollment
            </p>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
              {urgencyMessage}
            </h2>
            <p className="mt-2 text-sm text-emerald-50">
              Choose your track now and begin with guided onboarding, real project
              briefs, and support from day one.
            </p>
          </div>
          <Link
            href="/bootcamp"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:scale-[1.01]"
          >
            Enroll Now — Start Free Today
          </Link>
        </div>
      </section>
    </div>
  );
}

function getDaysUntilNextCohort() {
  const today = new Date();
  const day = today.getDay();
  const daysToNextMonday = (8 - day) % 7;
  return daysToNextMonday;
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
        {icon}
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-700">{description}</p>
    </article>
  );
}
