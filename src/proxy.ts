import { NextResponse, type NextRequest } from "next/server";

import { fallbackLocale, isLocale, localeByPrefix, localeConfig, locales } from "./i18n";

/** Picks the best of our locales from the Accept-Language header. */
function preferredPrefix(request: NextRequest) {
  const header = request.headers.get("accept-language") ?? "";
  for (const part of header.split(",")) {
    const lang = part.split(";")[0].trim().slice(0, 2).toLowerCase();
    const match = locales.find((l) => l.prefix === lang);
    if (match) return match.prefix;
  }
  return localeConfig(fallbackLocale).prefix;
}

/**
 * Public URLs start with a short language prefix (/nl, /fr, /en) and use a
 * translated news segment. They are rewritten to the internal /[lang] tree,
 * which uses Prismic locale codes and /news.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, first = "", second, ...rest] = pathname.split("/");
  const url = request.nextUrl.clone();

  const locale = localeByPrefix(first);
  if (locale) {
    // /nl/nieuws/<post> → /nl-be/news/<post>; /nl/nieuws itself is the news index page.
    const isPost = second === locale.news && rest.length > 0;
    const segments = [locale.code, isPost ? "news" : second, ...rest].filter((s) => s !== undefined);
    url.pathname = `/${segments.join("/")}`;
    const headers = new Headers(request.headers);
    headers.set("x-locale", locale.code);
    return NextResponse.rewrite(url, { request: { headers } });
  }

  // Full locale codes (/nl-be/...) redirect to their short prefix.
  if (isLocale(first)) {
    const config = localeConfig(first);
    url.pathname = `/${[config.prefix, second === "news" && rest.length > 0 ? config.news : second, ...rest].filter((s) => s !== undefined).join("/")}`;
    return NextResponse.redirect(url);
  }

  // The root goes to the visitor's language; other unprefixed paths were English.
  url.pathname = pathname === "/" ? `/${preferredPrefix(request)}` : `/en${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|slice-simulator|seed|.*\\..*).*)"],
};
