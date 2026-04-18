import type { MetadataRoute } from "next";
import { tracks } from "@/data/tracks";

const baseUrl = "https://learn2xcel.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/auth",
    "/bootcamp",
    "/contact",
    "/dashboard",
    "/tracks",
    "/privacy-policy",
    "/terms-and-conditions",
  ];

  const staticEntries = staticRoutes.map((route, index) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: index === 0 ? 1 : 0.7,
  }));

  const trackEntries = tracks.map((track) => ({
    url: `${baseUrl}/tracks/${track.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...trackEntries];
}
