import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Learn2Excel",
  description:
    "Read how Learn2Excel collects, uses, and protects data, including analytics, advertising, and affiliate disclosures.",
};

export default function PrivacyPolicyPage() {
  return (
    <article className="mx-auto max-w-4xl space-y-6 rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold text-slate-900">Privacy Policy</h1>
      <p className="text-sm text-slate-600">Last updated: April 18, 2026</p>

      <section className="space-y-2 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">1. Information we collect</h2>
        <p>
          We collect information you provide directly, such as email addresses and
          messages submitted through forms. We may also collect basic technical
          data like browser type, device type, and anonymized usage metrics.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">2. How we use information</h2>
        <p>
          We use information to operate the website, respond to inquiries, improve
          learning content, monitor performance, and maintain site security.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">3. Advertising and analytics</h2>
        <p>
          We may use advertising and analytics services, including Google products,
          to understand traffic and display relevant ads. These providers may use
          cookies or similar technologies subject to their own policies.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">4. Affiliate links disclosure</h2>
        <p>
          Some outbound links are affiliate links. If you purchase through those
          links, Learn2Excel may receive a commission at no extra cost to you.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">5. Data retention</h2>
        <p>
          We retain personal data only as long as needed for legitimate business
          purposes or legal obligations, then delete or anonymize it.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">6. Your rights</h2>
        <p>
          You can request access, correction, or deletion of your personal data by
          contacting us via the contact page.
        </p>
      </section>
    </article>
  );
}
