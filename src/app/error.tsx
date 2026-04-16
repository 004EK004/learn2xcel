'use client';

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-100">
        <AlertTriangle className="h-4 w-4 text-amber-300" />
        Something went wrong
      </div>
      <p className="max-w-xl text-sm text-slate-300">
        We hit an unexpected error. Try again or return home. Error digest:
        {error.digest || "n/a"}
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white"
      >
        <RotateCcw className="h-4 w-4" />
        Retry
      </button>
    </div>
  );
}
