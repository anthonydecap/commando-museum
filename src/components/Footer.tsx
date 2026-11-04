import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { PrismicLink as PrismicNextLink } from "./PrismicLink";
import Image from "next/image";
import Link from "next/link";

import type { Dictionary } from "@/i18n";

import { ArrowUpRight, Facebook, Mail } from "./Icons";
import { InlineRichText } from "./RichText";

type FooterProps = {
  settings: Content.SettingsDocument;
  homeHref: string;
  dict: Dictionary;
};

export function Footer({ settings, homeHref, dict }: FooterProps) {
  const s = settings.data;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="knife-lines text-teal opacity-[0.07]" />
      <div className="container-x relative pt-20 pb-10 lg:pt-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link
              href={homeHref}
              className="inline-flex items-center gap-3"
              aria-label={s.site_name ?? undefined}
            >
              <Image
                src="/commando-logo.svg"
                alt=""
                width={1512}
                height={1512}
                unoptimized
                className="h-24 w-auto"
              />
              {s.motto && (
                <span className="font-mono text-xs tracking-[0.3em] text-teal-soft uppercase">{s.motto}</span>
              )}
            </Link>
            <div className="mt-8 max-w-md space-y-4 text-white/70">
              <InlineRichText field={s.footer_intro} />
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="eyebrow text-teal-soft">{dict.visit}</h2>
              <address className="mt-5 space-y-1 text-white/80 not-italic [&_strong]:font-medium [&_strong]:text-white">
                <InlineRichText field={s.address} />
              </address>
            </div>
            <div>
              <h2 className="eyebrow text-teal-soft">{dict.explore}</h2>
              <ul className="mt-5 space-y-2.5">
                {[...s.navigation, ...s.footer_links].map(
                  (item, i) =>
                    isFilled.link(item.link) && (
                      <li key={i}>
                        <PrismicNextLink
                          field={item.link}
                          className="text-white/80 transition-colors hover:text-accent"
                        >
                          {item.link.text}
                        </PrismicNextLink>
                      </li>
                    ),
                )}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow text-teal-soft">{dict.contact}</h2>
              <ul className="mt-5 space-y-3">
                {s.email && (
                  <li>
                    <a
                      href={`mailto:${s.email}`}
                      className="inline-flex items-center gap-2.5 text-white/80 hover:text-accent"
                    >
                      <Mail /> {s.email}
                    </a>
                  </li>
                )}
                {s.phone && (
                  <li>
                    <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="text-white/80 hover:text-accent">
                      {s.phone}
                    </a>
                  </li>
                )}
                {s.social.map(
                  (item, i) =>
                    isFilled.link(item.link) && (
                      <li key={i}>
                        <PrismicNextLink
                          field={item.link}
                          className="inline-flex items-center gap-2.5 text-white/80 hover:text-accent"
                        >
                          {/facebook/i.test(item.link.text ?? "") ? <Facebook /> : <ArrowUpRight />}
                          {item.link.text}
                        </PrismicNextLink>
                      </li>
                    ),
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 font-mono text-[0.7rem] tracking-wider text-white/50 uppercase md:flex-row md:items-start md:justify-between">
          <p>
            © {year} {s.site_name} {dict.legalForm} · {dict.nonProfit}. {dict.rights}
          </p>
          <div className="flex flex-col gap-4 md:items-end">
            <p>
              {dict.websiteBy} <span className="text-white/80">Anthony Decap</span>
            </p>
            {isFilled.richText(s.credits) && (
              <details className="max-w-xl normal-case md:text-right">
                <summary className="cursor-pointer uppercase hover:text-white">{dict.credits}</summary>
                <div className="mt-3 text-xs leading-relaxed tracking-normal text-white/50">
                  <InlineRichText field={s.credits} />
                </div>
              </details>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
