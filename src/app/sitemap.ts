import type { MetadataRoute } from "next";
import { CATALOG } from "@/data/catalog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl.replace(/\/$/, "");
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/play`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/cards`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/label-lens`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/method`, changeFrequency: "monthly", priority: 0.6 },
    ...CATALOG.map((card) => ({ url: `${base}/cards/${card.slug}`, changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
