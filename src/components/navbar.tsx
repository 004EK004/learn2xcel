'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, UserRound } from "lucide-react";
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
    <header className="sticky top-0 z-40 border-b border-emerald-100 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-lg font-semibold text-white shadow-[0_8px_20px_rgba(16,185,129,0.3)]">
            L2X
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-emerald-700">Learn2Excel</p>
            <p className="text-xs text-slate-600">
              Excel + AI bootcamps & tracks
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/70 px-3 py-1 text-sm text-slate-700 shadow-sm lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-2 transition hover:bg-white hover:text-emerald-700",
                pathname === link.href && "bg-white text-emerald-700"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <nav className="flex items-center gap-2 overflow-x-auto rounded-full border border-emerald-100 bg-emerald-50/70 px-3 py-1 text-xs text-slate-700 lg:hidden">
          {links.slice(0, 3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "whitespace-nowrap rounded-full px-3 py-2 transition hover:bg-white hover:text-emerald-700",
                pathname === link.href && "bg-white text-emerald-700"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3 py-2 text-sm text-slate-800">
                <UserRound className="h-4 w-4 text-emerald-600" />
                <span className="hidden sm:inline">{user.name || "Member"}</span>
              </div>
              <button
                onClick={async () => {
                  await logout();
                  router.push("/auth");
                }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(16,185,129,0.28)] transition hover:scale-[1.01]"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(16,185,129,0.28)] transition hover:scale-[1.01]"
            >
              {loading ? "…" : "Login"}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
