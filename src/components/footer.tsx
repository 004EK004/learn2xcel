'use client';

import { useState } from "react";
import { ArrowUp, Bird, Code2, Link2, Send } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { saveLead } from "@/lib/appwrite";
import { cn } from "@/lib/utils";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Tracks", href: "/tracks" },
  { label: "Bootcamp", href: "/bootcamp" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

const resources = [
  { label: "Blog", href: "#" },
  { label: "YouTube Tutorials", href: "#" },
  { label: "Free Cheatsheets", href: "#" },
  { label: "Community Discord", href: "#" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please add your email");
      return;
    }
    setLoading(true);
    const result = await saveLead({ email });
    setLoading(false);
    if (result?.success) {
      toast.success("Signed up for the newsletter!");
      setEmail("");
    } else {
      toast.success("Captured locally — connect Appwrite to store leads.");
      setEmail("");
    }
  };

  return (
    <footer className="relative mt-16 border-t border-emerald-100 bg-emerald-50/40 text-slate-700">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.1),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.1),transparent_40%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-3 py-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-lg font-semibold text-white">
                L2X
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-700">Learn2Excel</p>
                <p className="text-xs text-slate-700">Excel + AI Bootcamp</p>
              </div>
            </div>
            <p className="text-sm text-slate-700">
              Build elite Excel, AI, and analytics skills with immersive,
              modern training built for fast movers.
            </p>
            <div className="flex gap-3">
              <SocialButton href="https://twitter.com" label="Twitter">
                <Bird className="h-4 w-4" />
              </SocialButton>
              <SocialButton href="https://www.linkedin.com" label="LinkedIn">
                <Link2 className="h-4 w-4" />
              </SocialButton>
              <SocialButton href="https://github.com" label="GitHub">
                <Code2 className="h-4 w-4" />
              </SocialButton>
            </div>
          </div>

          <FooterColumn title="Quick Links" items={quickLinks} />
          <FooterColumn title="Resources" items={resources} />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Newsletter</h3>
            <p className="text-sm text-slate-700">
              Practical Excel tips and updates delivered monthly.
            </p>
            <form onSubmit={onSubmit} className="space-y-3">
              <div className="relative overflow-hidden rounded-full border border-emerald-100 bg-white shadow-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full bg-transparent px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-600"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-1 top-1 inline-flex h-[38px] items-center rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(16,185,129,0.25)] transition hover:scale-[1.01]"
                >
                  <Send className="mr-1 h-4 w-4" />
                  {loading ? "Sending…" : "Join"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-emerald-100 pt-6 text-xs text-slate-600 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Learn2Excel. Practical Excel skills for
            modern professionals.
          </p>
          <div className="flex items-center gap-4">
            <Link className="hover:text-slate-900" href="/terms-and-conditions">
              Terms
            </Link>
            <Link className="hover:text-slate-900" href="/privacy-policy">
              Privacy
            </Link>
            <button
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-emerald-400/60 bg-white text-emerald-700 transition hover:bg-emerald-100"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <ul className="space-y-2 text-sm text-slate-700">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="relative inline-flex items-center gap-2 transition hover:text-slate-900"
            >
              <span className="absolute -left-2 h-6 w-6 rounded-full bg-gradient-to-r from-emerald-500/15 to-green-600/15 opacity-0 blur-sm transition group-hover:opacity-100" />
              <span className="relative">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialButton({
  href,
  children,
  label,
}: {
  href: string;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      aria-label={label}
      href={href}
      className="group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-emerald-100 bg-white text-slate-900 shadow-sm transition hover:border-emerald-400/70 hover:bg-emerald-50"
    >
      <span className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-green-500/20 opacity-0 transition-opacity group-hover:opacity-100" />
      <span className={cn("relative", "group-hover:animate-pulse")}>
        {children}
      </span>
    </Link>
  );
}
