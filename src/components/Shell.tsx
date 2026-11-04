import type { Content } from "@prismicio/client";
import { asLink, isFilled } from "@prismicio/client";
import type { ReactNode } from "react";

import { getDictionary, locales } from "@/i18n";
import { getSettings } from "@/lib/content";
import { docPath, linkResolver } from "@/lib/routes";

import { Footer } from "./Footer";
import { Header, type Alternate, type NavItem } from "./Header";

type ShellProps = {
  lang: string;
  doc?: Pick<Content.AllDocumentTypes, "type" | "uid" | "lang" | "alternate_languages">;
  /** Let the header float over a full-bleed hero. */
  overlay?: boolean;
  children: ReactNode;
};

function toNav(field: Content.SettingsDocument["data"]["header_cta"]): NavItem | undefined {
  if (!isFilled.link(field)) return undefined;
  const href = asLink(field, { linkResolver });
  if (!href) return undefined;
  return { href, label: field.text ?? "", external: field.link_type === "Web" };
}

/** Page frame: header, main landmark and footer, driven by the Settings document. */
export async function Shell({ lang, doc, overlay = false, children }: ShellProps) {
  const settings = await getSettings(lang);
  const dict = getDictionary(lang);
  const s = settings.data;

  const nav = s.navigation.map((item) => toNav(item.link)).filter((x): x is NavItem => !!x);

  const alternates: Alternate[] = doc
    ? [
        { type: doc.type, uid: doc.uid, lang: doc.lang },
        ...doc.alternate_languages.map((a) => ({ type: a.type, uid: a.uid ?? null, lang: a.lang })),
      ]
        .map((a) => ({
          href: docPath(a.type, a.uid, a.lang),
          label: locales.find((l) => l.code === a.lang)?.label ?? a.lang.slice(0, 2).toUpperCase(),
          current: a.lang === doc.lang,
          order: locales.findIndex((l) => l.code === a.lang),
        }))
        .sort((a, b) => a.order - b.order)
    : [];

  const announcementHref = isFilled.link(s.announcement_link)
    ? (asLink(s.announcement_link, { linkResolver }) ?? undefined)
    : undefined;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-beret focus:px-4 focus:py-2 focus:text-white"
      >
        {dict.skip}
      </a>
      <Header
        siteName={s.site_name ?? "Commando Museum"}
        homeHref={docPath("page", "home", lang)}
        nav={nav}
        cta={toNav(s.header_cta)}
        announcement={s.announcement ? { text: s.announcement, href: announcementHref } : undefined}
        alternates={alternates}
        overlay={overlay}
        dict={dict}
      />
      <main id="main">{children}</main>
      <Footer settings={settings} homeHref={docPath("page", "home", lang)} dict={dict} />
    </>
  );
}
