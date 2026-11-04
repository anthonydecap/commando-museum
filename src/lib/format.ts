import { htmlLang } from "@/i18n";

export function formatDate(value: string | null | undefined, lang: string) {
  if (!value) return null;
  return new Intl.DateTimeFormat(`${htmlLang(lang)}-BE`, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}
