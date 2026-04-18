import Link from "next/link";

const affiliateLinks = [
  {
    label: "Microsoft 365",
    description: "Official Excel tools for learning and practice.",
    href: "https://www.microsoft.com/microsoft-365",
  },
  {
    label: "Coursera Excel Certificates",
    description: "Structured certification paths for professionals.",
    href: "https://www.coursera.org/courses?query=excel",
  },
  {
    label: "Udemy Excel Practice Courses",
    description: "Hands-on drills to strengthen spreadsheet skills.",
    href: "https://www.udemy.com/topic/excel/",
  },
];

export function AffiliateSupportSection() {
  return (
    <section className="rounded-3xl border border-emerald-100 bg-emerald-50/40 p-6 shadow-sm">
      <p className="text-xs uppercase tracking-[0.18em] text-emerald-700">
        Support Learn2Excel
      </p>
      <h3 className="mt-2 text-2xl font-semibold text-slate-900">
        Affiliate recommendations
      </h3>
      <p className="mt-2 max-w-3xl text-sm text-slate-700">
        Some links below are affiliate links. If you purchase through them, we
        may earn a small commission at no additional cost to you.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {affiliateLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="rounded-2xl border border-emerald-100 bg-white p-4 transition hover:border-emerald-300 hover:bg-emerald-50"
          >
            <p className="text-sm font-semibold text-slate-900">{link.label}</p>
            <p className="mt-1 text-xs text-slate-600">{link.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
