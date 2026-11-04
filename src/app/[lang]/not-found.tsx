import Link from "next/link";

import { ArrowRight } from "@/components/Icons";
import { Shell } from "@/components/Shell";
import { headers } from "next/headers";

import { fallbackLocale, getDictionary, isLocale } from "@/i18n";
import { docPath } from "@/lib/routes";

export default async function NotFound() {
  // The proxy passes the requested locale along, since not-found pages get no params.
  const requested = (await headers()).get("x-locale") ?? "";
  const lang = isLocale(requested) ? requested : fallbackLocale;
  const dict = getDictionary(lang);

  return (
    <Shell lang={lang} overlay>
      <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-slate text-white">
        <div className="knife-lines -z-10 text-teal opacity-[0.15]" />
        <div className="container-x pt-32 pb-20">
          <p className="eyebrow text-teal-soft">404</p>
          <h1 className="display mt-6 text-[clamp(3rem,10vw,9rem)]">{dict.notFoundTitle}</h1>
          <p className="mt-6 max-w-xl text-lg text-white/75">{dict.notFoundBody}</p>
          <Link href={docPath("page", "home", lang)} className="btn btn-primary mt-10">
            <span>{dict.notFoundCta}</span>
            <ArrowRight />
          </Link>
        </div>
      </section>
    </Shell>
  );
}
