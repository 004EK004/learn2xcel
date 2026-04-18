import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Learn2Excel | Excel Bootcamp",
  description:
    "Learn practical Excel skills through guided bootcamp tracks in AI with Excel, core spreadsheets, and data analysis.",
  openGraph: {
    title: "Learn2Excel | Excel Bootcamp",
    description:
      "Excel training with guided tracks, cohort learning, and practical portfolio outcomes.",
    url: "https://learn2xcel.com",
    siteName: "Learn2Excel",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Learn2Excel Bootcamp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn2Excel | Excel Bootcamp",
    description:
      "Excel training with guided tracks, cohort learning, and practical portfolio outcomes.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "Excel bootcamp",
    "Excel training",
    "AI with Excel",
    "data analysis bootcamp",
    "spreadsheet course",
  ],
  alternates: {
    canonical: "https://learn2xcel.com",
  },
  metadataBase: new URL("https://learn2xcel.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-800 antialiased">
        <Providers>
          <Navbar />
          <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-6 py-10">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
