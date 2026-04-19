'use client';

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Mail,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import toast from "react-hot-toast";
import { saveLead } from "@/lib/appwrite";

const trustItems = [
  {
    title: "Career-first learning paths",
    description:
      "Get a practical route tailored to your role, deadlines, and growth goals.",
    icon: Sparkles,
  },
  {
    title: "Fast execution support",
    description:
      "Ship dashboards and automation quicker with direct, expert guidance.",
    icon: Zap,
  },
  {
    title: "Trusted delivery workflow",
    description:
      "A modern, structured process that keeps progress clear from day one.",
    icon: ShieldCheck,
  },
];

const faqs = [
  {
    question: "Who should join Learn2Excel?",
    answer:
      "Professionals, founders, and teams who want practical Excel and AI skills they can apply immediately.",
  },
  {
    question: "How quickly will you reply?",
    answer:
      "Usually within 24 hours. We review your message, understand your goals, and suggest the best next step.",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const messageLimit = 500;

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitted(false);
    const result = await saveLead(form);
    setSubmitting(false);
    if (result?.success) {
      toast.success("We received your message. Talk soon!");
      setForm({ email: "", message: "" });
      setSubmitted(true);
      window.setTimeout(() => setSubmitted(false), 4200);
    } else {
      toast.success("Captured locally. Connect Appwrite to store leads.");
      setForm({ email: "", message: "" });
      setSubmitted(true);
      window.setTimeout(() => setSubmitted(false), 4200);
    }
  };

  return (
    <div className="relative space-y-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] overflow-hidden">
        <div className="absolute left-[10%] top-6 h-60 w-60 animate-[float_8s_ease-in-out_infinite] rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute right-[8%] top-28 h-72 w-72 animate-[float_11s_ease-in-out_infinite] rounded-full bg-sky-200/30 blur-3xl [animation-delay:1.2s]" />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="space-y-4"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
          Contact
        </p>
        <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          Join the waitlist or talk with the team.
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Share your goals and timeline. We&apos;ll respond quickly with a
          personalized recommendation aligned to your role and career direction.
        </p>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm text-slate-700 shadow-sm backdrop-blur-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/80" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <Clock3 className="h-4 w-4 text-emerald-600" />
          <span className="font-medium">We reply in &lt; 24 hours</span>
          <span className="text-slate-500">
            {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </motion.section>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
          className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/80 hover:shadow-[0_28px_100px_rgba(16,185,129,0.16)] sm:p-8"
        >
          <div className="pointer-events-none absolute -right-16 -top-14 h-44 w-44 rounded-full bg-emerald-300/20 blur-3xl" />
          <form className="relative space-y-5" onSubmit={onSubmit}>
            <div className="relative">
              <div className="group/input relative rounded-2xl border border-slate-200 bg-slate-50/70 px-4 pt-5 pb-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition focus-within:border-emerald-400 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(16,185,129,0.18)]">
                <Mail className="absolute left-4 top-4 h-4 w-4 text-slate-400 transition group-focus-within/input:text-emerald-500" />
                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="peer w-full bg-transparent pl-7 text-sm text-slate-900 outline-none placeholder:text-transparent"
                  placeholder="Work email"
                  autoComplete="email"
                  required
                />
                <label
                  htmlFor="contact-email"
                  className="pointer-events-none absolute left-11 top-1/2 -translate-y-1/2 text-sm text-slate-500 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-focus:top-3 peer-focus:text-xs peer-focus:text-emerald-600 peer-[&:not(:placeholder-shown)]:top-3 peer-[&:not(:placeholder-shown)]:text-xs"
                >
                  Work email
                </label>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl border border-slate-200 bg-slate-50/70 px-4 pt-5 pb-3 transition focus-within:border-emerald-400 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(16,185,129,0.18)]">
                <MessageCircle className="absolute left-4 top-4 h-4 w-4 text-slate-400" />
                <textarea
                  id="contact-message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  maxLength={messageLimit}
                  className="peer w-full resize-none bg-transparent pl-7 text-sm text-slate-900 outline-none placeholder:text-transparent"
                  placeholder="Tell us what you want to build"
                  required
                />
                <label
                  htmlFor="contact-message"
                  className="pointer-events-none absolute left-11 top-7 -translate-y-1/2 text-sm text-slate-500 transition-all duration-200 peer-placeholder-shown:top-7 peer-focus:top-3 peer-focus:text-xs peer-focus:text-emerald-600 peer-[&:not(:placeholder-shown)]:top-3 peer-[&:not(:placeholder-shown)]:text-xs"
                >
                  What do you want to build?
                </label>
                <p className="mt-2 text-xs text-slate-500">
                  Dashboards, automations, team training, or career transitions.
                </p>
              </div>
              <p className="mt-2 text-right text-xs text-slate-500">
                {form.message.length}/{messageLimit}
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="group/button inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_38px_rgba(16,185,129,0.36)] transition duration-300 hover:scale-[1.02] hover:from-emerald-400 hover:to-emerald-600 disabled:cursor-not-allowed disabled:opacity-90"
            >
              {submitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                  Sending your message...
                </>
              ) : (
                <>
                  Submit
                  <ArrowRight className="h-4 w-4 transition group-hover/button:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          <AnimatePresence>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.35 }}
                className="pointer-events-none absolute inset-x-6 bottom-6 rounded-2xl border border-emerald-200 bg-white/95 p-4 shadow-lg"
              >
                <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Thank you — we&apos;ll be in touch shortly.
                </div>
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                  {[...Array(14)].map((_, index) => (
                    <span
                      key={index}
                      className="absolute top-0 h-2 w-1.5 animate-[confetti_900ms_ease-out_forwards] rounded-sm bg-emerald-400"
                      style={{
                        left: `${8 + index * 6.5}%`,
                        animationDelay: `${index * 40}ms`,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.section>

        <motion.aside
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="rounded-3xl border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.94))] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.07)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/80 sm:p-8"
        >
          <h2 className="text-2xl font-semibold text-slate-900">Why Learn2Excel</h2>
          <p className="mt-2 text-sm text-slate-600">
            A modern learning partner built to help you move faster with
            practical outcomes.
          </p>

          <ul className="mt-6 space-y-3">
            {trustItems.map((item, index) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: index * 0.1, duration: 0.35 }}
                className="group/item flex gap-3 rounded-2xl border border-slate-200 bg-white/85 p-4 transition duration-300 hover:border-emerald-300/80 hover:shadow-[0_14px_34px_rgba(16,185,129,0.18)]"
              >
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition duration-300 group-hover/item:border-emerald-300 group-hover/item:bg-emerald-50 group-hover/item:text-emerald-600">
                  <item.icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                </div>
              </motion.li>
            ))}
          </ul>

          <div className="mt-5 rounded-2xl border border-emerald-200/80 bg-emerald-50/60 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Appwrite-ready from day one</p>
            <p className="mt-1">
              If Appwrite variables are not configured yet, we safely capture
              locally for prototyping and switch to persistent storage when your
              project is connected.
            </p>
          </div>
        </motion.aside>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45 }}
        className="rounded-3xl border border-slate-200 bg-white/90 px-6 py-5 shadow-[0_16px_48px_rgba(15,23,42,0.07)]"
      >
        <p className="text-center text-sm text-slate-600">
          Teams at{" "}
          <span className="font-semibold text-slate-900">Northline</span>,{" "}
          <span className="font-semibold text-slate-900">Aster Labs</span>, and{" "}
          <span className="font-semibold text-slate-900">CloudLedger</span> use
          Learn2Excel to level up spreadsheet workflows.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45 }}
        className="space-y-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_16px_48px_rgba(15,23,42,0.07)]"
      >
        <h2 className="text-xl font-semibold text-slate-900">Quick FAQs</h2>
        <div className="space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={faq.question} className="rounded-2xl border border-slate-200 bg-white">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-slate-800"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-500 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-sm text-slate-600">{faq.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45 }}
        className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-5 py-4 text-sm text-slate-600"
      >
        <p>Explore Learn2Excel</p>
        <div className="flex flex-wrap items-center gap-3">
          <Link className="transition hover:text-slate-900" href="/">
            Home
          </Link>
          <Link className="transition hover:text-slate-900" href="/tracks">
            Tracks
          </Link>
          <Link className="transition hover:text-slate-900" href="/bootcamp">
            Bootcamp
          </Link>
          <Link className="transition hover:text-slate-900" href="/privacy-policy">
            Privacy
          </Link>
          <Link className="transition hover:text-slate-900" href="/terms-and-conditions">
            Terms
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
