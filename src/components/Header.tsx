"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import type { Dictionary } from "@/i18n";

import { ArrowRight } from "./Icons";
import { Logo } from "./Logo";

export type NavItem = { href: string; label: string; external?: boolean };
export type Alternate = { href: string; label: string; current: boolean };

type HeaderProps = {
  siteName: string;
  homeHref: string;
  nav: NavItem[];
  cta?: NavItem;
  announcement?: { text: string; href?: string };
  alternates: Alternate[];
  overlay: boolean;
  dict: Dictionary;
};

export function Header({
  siteName,
  homeHref,
  nav,
  cta,
  announcement,
  alternates,
  overlay,
  dict,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu after navigation.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || !overlay || open;
  const isActive = (href: string) => href !== homeHref && pathname.startsWith(href);

  return (
    <>
      {announcement?.text && (
        <div className="relative z-50 bg-beret text-white">
          <div className="container-x flex min-h-9 items-center justify-center py-1.5 text-center font-mono text-[0.7rem] tracking-[0.12em] uppercase sm:text-xs">
            {announcement.href ? (
              <Link href={announcement.href} className="hover:underline underline-offset-4">
                {announcement.text}
              </Link>
            ) : (
              announcement.text
            )}
          </div>
        </div>
      )}

      <header
        className={`on-dark sticky top-0 z-40 transition-[background-color,box-shadow,color] duration-500 ${
          solid ? "bg-slate text-white shadow-[0_1px_0_rgb(255_255_255/0.06)]" : "text-white"
        } ${overlay ? "-mb-[4.5rem] lg:-mb-20" : ""}`}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
          <Link href={homeHref} className="group flex items-center gap-3" aria-label={siteName}>
            <Logo className="h-12 w-auto transition-transform duration-500 group-hover:-translate-y-0.5" />
            <span className="display text-xl leading-none tracking-wide">
              {siteName}
              <span className="block font-mono text-[0.6rem] font-normal tracking-[0.3em] text-teal-soft">
                Flawinne · Namur
              </span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative px-3 py-2 font-display text-[0.95rem] tracking-[0.08em] uppercase transition-colors hover:text-accent ${
                      isActive(item.href) ? "text-accent" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {alternates.length > 1 && (
              <div className="hidden items-center gap-1 font-mono text-xs sm:flex" aria-label={dict.language}>
                {alternates.map((alt) => (
                  <Link
                    key={alt.label}
                    href={alt.href}
                    aria-current={alt.current ? "true" : undefined}
                    className={`px-1.5 py-1 ${alt.current ? "text-accent" : "text-white/60 hover:text-white"}`}
                  >
                    {alt.label}
                  </Link>
                ))}
              </div>
            )}
            {cta && (
              <Link href={cta.href} className="btn btn-primary hidden min-h-11 px-5 text-sm md:inline-flex">
                <span>{cta.label}</span>
                <ArrowRight />
              </Link>
            )}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-11 items-center gap-3 font-display text-sm tracking-[0.12em] uppercase lg:hidden"
            >
              <span>{open ? dict.close : dict.menu}</span>
              <span className="relative block h-3 w-6" aria-hidden>
                <span
                  className={`absolute left-0 h-0.5 w-6 bg-current transition-transform duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-6 bg-current transition-transform duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`on-dark fixed inset-0 z-30 bg-slate text-white transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="knife-lines text-teal opacity-15" />
        <nav aria-label="Mobile" className="container-x relative flex h-full flex-col pt-32 pb-10">
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li
                key={item.href}
                className={`transition-[opacity,transform] duration-700 ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                style={{ transitionDelay: open ? `${100 + i * 50}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  className={`display block py-1.5 text-5xl xs:text-6xl ${isActive(item.href) ? "text-accent" : "hover:text-accent"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-6">
            {cta && (
              <Link href={cta.href} className="btn btn-primary">
                <span>{cta.label}</span>
                <ArrowRight />
              </Link>
            )}
            {alternates.length > 1 && (
              <div className="flex gap-2 font-mono text-sm">
                {alternates.map((alt) => (
                  <Link
                    key={alt.label}
                    href={alt.href}
                    className={alt.current ? "text-accent" : "text-white/60"}
                  >
                    {alt.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
