import Link from "next/link";
import { Check } from "lucide-react";
import { pricingPlans } from "@/data/content";

export default function PricingPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.18em] text-cyan-100">
          Pricing
        </p>
        <h1 className="text-3xl font-semibold text-white">
          Choose your plan and connect your Appwrite project when you&apos;re ready.
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl">
          Every plan includes access to all tracks, the Appwrite integration
          starter, and a responsive, neon UI. Upgrade to Pro for mentor reviews
          and automation recipes.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.45)] ${
              plan.highlight ? "ring-2 ring-cyan-400/60" : ""
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
            {plan.highlight && (
              <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-3 py-1 text-xs font-semibold text-white">
                Most popular
              </div>
            )}
            <div className="relative space-y-2">
              <p className="text-sm font-semibold text-white">{plan.name}</p>
              <p className="text-3xl font-bold text-white">
                {plan.price}
                <span className="text-sm font-normal text-slate-300">
                  {plan.period}
                </span>
              </p>
              <p className="text-sm text-slate-300">{plan.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-200">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-[2px] h-4 w-4 text-cyan-300" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/auth"
                className="mt-5 inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/60"
              >
                {plan.name === "Enterprise" ? "Talk to us" : "Get started"}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
