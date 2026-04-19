'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, MessageCircle, UserRound } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/tracks", label: "Tracks" },
  { href: "/bootcamp", label: "Bootcamp" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, loading } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-lg font-semibold text-white shadow-[0_10px_24px_rgba(15,23,42,0.25)]">
            L2X
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-900">Learn2Excel</p>
            <p className="text-xs text-slate-500">
              Excel + AI bootcamps & tracks
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-slate-200/90 bg-white/80 px-3 py-1 text-sm text-slate-700 shadow-sm lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-2 transition hover:bg-slate-900 hover:text-white",
                pathname === link.href && "bg-slate-900 text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <nav className="flex items-center gap-2 overflow-x-auto rounded-full border border-slate-200/90 bg-white/80 px-3 py-1 text-xs text-slate-700 lg:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "whitespace-nowrap rounded-full px-3 py-2 transition hover:bg-slate-900 hover:text-white",
                pathname === link.href && "bg-slate-900 text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 md:inline-flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <MessageCircle className="h-3.5 w-3.5" />
            Live chat
          </span>
          {user ? (
            <div className="flex items-center gap-3">
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
              href="/auth"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_26px_rgba(16,185,129,0.3)] transition hover:scale-[1.02] hover:from-emerald-400 hover:to-emerald-600"
            >
              {loading ? "…" : "Login"}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
