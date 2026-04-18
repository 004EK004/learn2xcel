import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://learn2xcel.com/sitemap.xml",
    host: "https://learn2xcel.com",
  };
}
