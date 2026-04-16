'use client';

import { FormEvent, useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import { saveLead } from "@/lib/appwrite";

export default function ContactPage() {
  const [form, setForm] = useState({ email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const result = await saveLead(form);
    setSubmitting(false);
    if (result?.success) {
      toast.success("We received your message. Talk soon!");
      setForm({ email: "", message: "" });
    } else {
      toast.success("Captured locally. Connect Appwrite to store leads.");
      setForm({ email: "", message: "" });
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.18em] text-cyan-100">
          Contact
        </p>
        <h1 className="text-3xl font-semibold text-white">
          Join the waitlist or talk with the team.
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl">
          Tell us about your goals. We&apos;ll align you with the right track,
          cohort, and Appwrite setup. We respond within one business day.
        </p>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.45)]">
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label className="text-sm text-slate-200">Email</label>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white">
                <Mail className="h-4 w-4 text-cyan-300" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
                  placeholder="you@company.com"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-200">What do you want to build?</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/60"
                placeholder="Dashboards, automations, team training, or something else?"
                required
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_22px_rgba(0,240,255,0.3)] transition hover:scale-[1.01]"
            >
              <MessageCircle className="h-4 w-4" />
              {submitting ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </div>

      <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.5)]">
        <h3 className="text-xl font-semibold text-white">Why Learn2Excel</h3>
        <ul className="space-y-3 text-sm text-slate-200">
          {[
            "Dark-mode-first UI with glassmorphism and neon gradients.",
            "Appwrite authentication baked into dashboard routes.",
            "Reusable data collection for leads, enrollments, and progress.",
            "Responsive layouts that feel intentional on mobile and desktop.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-[6px] h-2 w-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-slate-300">
          We keep leads locally if Appwrite env variables are missing so you can
          prototype quickly. Connect your Appwrite database to persist data.
        </div>
      </div>
    </div>
  );
}
