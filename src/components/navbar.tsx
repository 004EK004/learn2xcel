'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, UserRound } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/tracks", label: "Tracks" },
  { href: "/bootcamp", label: "Bootcamp" },
  { href: "/pricing", label: "Pricing" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, loading } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0f]/70 backdrop-blur-xl border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/70 via-purple-500/60 to-blue-700/60 text-lg font-semibold text-white shadow-[0_0_25px_rgba(0,240,255,0.35)]">
            L2X
          </span>
          <div className="leading-tight">
            <p className="text-sm text-cyan-200">Learn2Excel</p>
            <p className="text-xs text-slate-300">
              Excel + AI bootcamps & tracks
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200 shadow-lg backdrop-blur lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-2 transition hover:text-white hover:bg-white/10",
                pathname === link.href && "bg-white/15 text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <nav className="lg:hidden flex items-center gap-2 overflow-x-auto rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200 backdrop-blur">
          {links.slice(0, 4).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "whitespace-nowrap rounded-full px-3 py-2 transition hover:text-white hover:bg-white/10",
                pathname === link.href && "bg-white/15 text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90">
                <UserRound className="h-4 w-4 text-cyan-300" />
                <span className="hidden sm:inline">{user.name || "Member"}</span>
              </div>
              <button
                onClick={async () => {
                  await logout();
                  router.push("/auth");
                }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500/80 to-purple-600/80 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition hover:scale-[1.01]"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500/80 to-purple-600/80 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition hover:scale-[1.01]"
            >
              {loading ? "…" : "Login"}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
