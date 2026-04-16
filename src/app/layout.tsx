import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Learn2Excel · AI + Excel Bootcamp",
  description:
    "Learn2Excel is a modern Excel, AI, and data analysis bootcamp with Appwrite-ready integrations.",
  openGraph: {
    title: "Learn2Excel · AI + Excel Bootcamp",
    description:
      "Three tracks covering AI with Excel, Original Excel, and Data Analysis with Appwrite-ready integrations.",
    url: "https://learn2xcel.com",
    siteName: "Learn2Excel",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Learn2Excel Bootcamp",
      },
    ],
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
      <body className="min-h-screen bg-[#07070c] text-slate-200 antialiased">
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
