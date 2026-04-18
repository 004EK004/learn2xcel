import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Learn2Excel",
  description:
    "Read the Learn2Excel website terms and conditions for use, content, affiliate links, and limitations.",
};

export default function TermsAndConditionsPage() {
  return (
    <article className="mx-auto max-w-4xl space-y-6 rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold text-slate-900">Terms and Conditions</h1>
      <p className="text-sm text-slate-600">Last updated: April 18, 2026</p>

      <section className="space-y-2 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">1. Acceptance of terms</h2>
        <p>
          By accessing this website, you agree to these terms and all applicable
          laws and regulations.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">2. Educational content</h2>
        <p>
          Learn2Excel provides educational information only. We do not guarantee
          specific outcomes, employment, or earnings from using this content.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">3. Acceptable use</h2>
        <p>
          You must not misuse the site, attempt unauthorized access, interfere
          with service operation, or violate applicable laws.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">4. Third-party links</h2>
        <p>
          This site may include third-party and affiliate links. We are not
          responsible for external sites, services, or content.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">5. Limitation of liability</h2>
        <p>
          Learn2Excel is provided on an &quot;as is&quot; basis. To the extent permitted
          by law, we disclaim liability for damages arising from site use.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">6. Changes to terms</h2>
        <p>
          We may update these terms at any time. Continued use of the website
          after updates means you accept the revised terms.
        </p>
      </section>
    </article>
  );
}
