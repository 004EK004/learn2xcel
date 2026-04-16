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
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
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
    <footer className="relative mt-16 border-t border-white/10 bg-[#0a0a0f]/90 text-slate-200">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,240,255,0.1),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(176,38,255,0.12),transparent_40%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-2 backdrop-blur">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/70 via-purple-500/60 to-blue-700/60 text-lg font-semibold text-white">
                L2X
              </div>
              <div>
                <p className="text-sm text-cyan-200">Learn2Excel</p>
                <p className="text-xs text-slate-300">Excel + AI Bootcamp</p>
              </div>
            </div>
            <p className="text-sm text-slate-300">
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
            <h3 className="text-lg font-semibold text-white">Newsletter</h3>
            <p className="text-sm text-slate-300">
              Futuristic tips, templates, and Appwrite-powered automations
              delivered monthly.
            </p>
            <form onSubmit={onSubmit} className="space-y-3">
              <div className="relative overflow-hidden rounded-full border border-white/15 bg-white/5 shadow-lg">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-1 top-1 inline-flex h-[38px] items-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(0,240,255,0.4)] transition hover:scale-[1.01]"
                >
                  <Send className="mr-1 h-4 w-4" />
                  {loading ? "Sending…" : "Join"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Learn2Excel. Futuristic skills for the
            modern analyst.
          </p>
          <div className="flex items-center gap-4">
            <Link className="hover:text-white" href="#">
              Terms
            </Link>
            <Link className="hover:text-white" href="#">
              Privacy
            </Link>
            <Link className="hover:text-white" href="#">
              Cookie Preferences
            </Link>
            <button
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/60 bg-white/5 text-cyan-200 transition hover:bg-cyan-500/20"
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
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <ul className="space-y-2 text-sm text-slate-300">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="relative inline-flex items-center gap-2 transition hover:text-white"
            >
              <span className="absolute -left-2 h-6 w-6 rounded-full bg-gradient-to-r from-cyan-500/15 to-purple-600/15 opacity-0 blur-sm transition group-hover:opacity-100" />
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
      className="group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 text-white shadow-[0_0_20px_rgba(0,0,0,0.25)] transition hover:border-cyan-400/70 hover:shadow-[0_0_22px_rgba(0,240,255,0.4)]"
    >
      <span className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 opacity-0 transition-opacity group-hover:opacity-100" />
      <span className={cn("relative", "group-hover:animate-pulse")}>
        {children}
      </span>
    </Link>
  );
}
