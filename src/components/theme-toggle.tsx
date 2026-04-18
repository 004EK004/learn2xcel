"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const activeTheme =
    (theme === "system" ? resolvedTheme : theme) === "light" ? "light" : "dark";

  return (
    <button
      type="button"
      className={cn(
        "group relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white/10 text-sm text-slate-900 backdrop-blur transition hover:shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:outline hover:outline-1 hover:outline-emerald-400",
        className
      )}
      aria-label="Toggle theme"
      onClick={() => setTheme(activeTheme === "dark" ? "light" : "dark")}
    >
      <span className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 via-transparent to-green-500/30 transition-opacity group-hover:opacity-80" />
      <span className="relative">
        {activeTheme === "light" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </span>
    </button>
  );
}
