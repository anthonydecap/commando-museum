import type { MetadataRoute } from "next";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.museedescommandos.be";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/slice-simulator"] },
    sitemap: `${site}/sitemap.xml`,
  };
}
