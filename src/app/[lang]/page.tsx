import { SliceZone } from "@prismicio/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Shell } from "@/components/Shell";
import { getAllRoutes, getPage } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { components } from "@/slices";

export async function generateStaticParams() {
  const routes = await getAllRoutes();
  return [...new Set(routes.filter((r) => r.type === "page" && r.uid === "home").map((r) => r.lang))].map(
    (lang) => ({ lang }),
  );
}

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const page = await getPage("home", lang);
  return page ? buildMetadata(page, lang) : {};
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const page = await getPage("home", lang);
  if (!page) notFound();

  return (
    <Shell lang={lang} doc={page} overlay={page.data.slices[0]?.slice_type === "hero"}>
      <SliceZone slices={page.data.slices} components={components} context={{ lang }} />
    </Shell>
  );
}
