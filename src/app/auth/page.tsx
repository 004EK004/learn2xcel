'use client';

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Code2, Mail, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function AuthPage() {
  const router = useRouter();
  const { login, register, loginOauth } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (mode === "signup") {
        await register(form.email, form.password, form.name);
        toast.success("Account created. Redirecting…");
      } else {
        await login(form.email, form.password);
        toast.success("Logged in!");
      }
      router.push("/dashboard");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Authentication failed. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs uppercase tracking-[0.18em] text-emerald-700">
          <Sparkles className="h-4 w-4" />
          Authentication
        </div>
        <h1 className="text-3xl font-semibold text-slate-900">
          {mode === "login"
            ? "Login to continue"
            : "Create your Learn2Excel account"}
        </h1>
        <p className="text-sm text-slate-700">
          Secure sign-in keeps your progress, projects, and certificates synced.
        </p>
      </div>

      <div className="rounded-3xl border border-emerald-200/70 bg-white p-6 shadow-[0_24px_70px_rgba(16,185,129,0.12)]">
        <form className="space-y-4" onSubmit={onSubmit}>
          {mode === "signup" && (
            <div className="space-y-2">
              <label className="text-sm text-slate-700">Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400/60 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.16)]"
                placeholder="Alex Analyst"
                required
              />
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm text-slate-700">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
               className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400/60 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.16)]"
              placeholder="you@company.com"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-700">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
               className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400/60 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.16)]"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(16,185,129,0.3)] transition duration-300 hover:scale-[1.03] hover:shadow-[0_16px_34px_rgba(16,185,129,0.45)]"
          >
            {submitting ? "Working..." : mode === "login" ? "Login" : "Create account"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-600">
          <span className="h-px flex-1 bg-white/10" />
          Or continue with
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => loginOauth("google")}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm font-semibold text-slate-900 transition duration-300 hover:border-emerald-400/60 hover:bg-emerald-50/60"
          >
            <Mail className="h-4 w-4 text-emerald-300" />
            Google
          </button>
          <button
            type="button"
            onClick={() => loginOauth("github")}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm font-semibold text-slate-900 transition duration-300 hover:border-emerald-400/60 hover:bg-emerald-50/60"
          >
            <Code2 className="h-4 w-4 text-emerald-300" />
            GitHub
          </button>
        </div>

        <p className="mt-5 text-center text-sm text-slate-700">
          {mode === "login" ? "New here?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="inline-flex items-center rounded-full border-2 border-emerald-500 bg-emerald-50 px-4 py-1.5 text-sm font-bold text-emerald-700 shadow-[0_10px_24px_rgba(16,185,129,0.22)] transition duration-300 hover:bg-emerald-100 hover:underline"
          >
            Switch to {mode === "login" ? "signup" : "login"}
          </button>
        </p>
      </div>
    </div>
  );
}
