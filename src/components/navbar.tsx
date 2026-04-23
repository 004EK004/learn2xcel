'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, UserRound } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const links = [
  { href: "/tracks", label: "Tracks" },
  { href: "/bootcamp", label: "Bootcamp" },
  { href: "/tracks", label: "Results" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setScrollPct(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-200/70 bg-white/90 backdrop-blur-xl">
      {/* Scroll progress bar */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-emerald-100/70">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-green-500 transition-all duration-200 ease-out"
          style={{ width: `${scrollPct}%` }}
        />
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-lg font-semibold text-white shadow-[0_10px_24px_rgba(16,185,129,0.32)] transition-transform duration-300 ease-out group-hover:scale-[1.03]">
            L2X
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-900">Learn2Excel</p>
            <p className="text-xs text-slate-500">Excel + AI bootcamps & tracks</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-emerald-100 bg-white/90 px-3 py-1 text-sm text-slate-700 shadow-sm lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-2 transition-all duration-250 ease-out hover:-translate-y-0.5 hover:bg-emerald-600 hover:text-white hover:shadow-[0_8px_20px_rgba(16,185,129,0.2)]",
                pathname === link.href && "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-[0_8px_20px_rgba(16,185,129,0.28)]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile nav */}
        <nav className="flex items-center gap-1 overflow-x-auto rounded-full border border-emerald-100 bg-white/90 px-3 py-1 text-xs text-slate-700 lg:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "whitespace-nowrap rounded-full px-3 py-2 transition-all duration-250 ease-out hover:bg-emerald-600 hover:text-white",
                pathname === link.href && "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-[0_6px_16px_rgba(16,185,129,0.25)]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/tracks"
            className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:-translate-y-px hover:border-emerald-300 hover:text-emerald-700 md:inline-flex"
          >
            See Curriculum
          </Link>
          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800">
                <UserRound className="h-4 w-4 text-slate-600" />
                <span className="hidden sm:inline">{user.name || "Member"}</span>
              </div>
              <button
                onClick={async () => {
                  await logout();
                  router.push("/auth");
                }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_26px_rgba(16,185,129,0.3)] transition hover:scale-[1.02]"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/bootcamp"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_26px_rgba(16,185,129,0.3)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_14px_32px_rgba(16,185,129,0.4)]"
            >
              {loading ? "…" : "Start Now"}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
