import { SliceZone } from "@prismicio/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Shell } from "@/components/Shell";
import { getAllRoutes, getPage } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { components } from "@/slices";

export async function generateStaticParams() {
  const routes = await getAllRoutes();
  return routes
    .filter((r) => r.type === "page" && r.uid && r.uid !== "home")
    .map((r) => ({ lang: r.lang, uid: r.uid! }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[uid]">): Promise<Metadata> {
  const { lang, uid } = await params;
  const page = await getPage(uid, lang);
  return page ? buildMetadata(page, lang) : {};
}

export default async function Page({ params }: PageProps<"/[lang]/[uid]">) {
  const { lang, uid } = await params;
  if (uid === "home") notFound();
  const page = await getPage(uid, lang);
  if (!page) notFound();

  return (
    <Shell lang={lang} doc={page} overlay={page.data.slices[0]?.slice_type === "hero"}>
      <SliceZone slices={page.data.slices} components={components} context={{ lang }} />
    </Shell>
  );
}
