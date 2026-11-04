"use client";

import { useDeferredValue, useMemo, useState } from "react";

/** [title, author, publisher, year, shelf] */
export type Book = [string, string, string, string, string];

type Labels = {
  search: string;
  placeholder: string;
  title: string;
  author: string;
  publisher: string;
  year: string;
  shelf: string;
  results: string;
  showMore: string;
  noResults: string;
};

const PAGE = 40;

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

export function LibrarySearch({ books, labels }: { books: Book[]; labels: Labels }) {
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE);
  const deferred = useDeferredValue(query);

  const index = useMemo(() => books.map((b) => normalize(b.join(" "))), [books]);
  const results = useMemo(() => {
    const terms = normalize(deferred).split(/\s+/).filter(Boolean);
    if (!terms.length) return books;
    return books.filter((_, i) => terms.every((t) => index[i].includes(t)));
  }, [books, index, deferred]);

  return (
    <div className="mt-12 lg:mt-16">
      <div className="flex flex-col gap-4 border-b-2 border-ink pb-5 sm:flex-row sm:items-end sm:justify-between">
        <label className="block w-full max-w-xl">
          <span className="eyebrow text-teal">{labels.search}</span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(PAGE);
            }}
            placeholder={labels.placeholder}
            className="mt-3 block min-h-12 w-full border border-ink/25 bg-white px-4 text-base outline-none transition-colors focus:border-beret"
          />
        </label>
        <p className="font-mono text-xs tracking-[0.12em] text-muted uppercase" aria-live="polite">
          {results.length.toLocaleString()} {labels.results}
        </p>
      </div>

      {results.length === 0 ? (
        <p className="py-10 text-muted">{labels.noResults}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[40rem] text-left text-[0.95rem]">
            <thead>
              <tr className="font-mono text-[0.7rem] tracking-[0.12em] text-muted uppercase">
                <th className="py-3 pr-4 font-medium">{labels.title}</th>
                <th className="py-3 pr-4 font-medium">{labels.author}</th>
                <th className="hidden py-3 pr-4 font-medium md:table-cell">{labels.publisher}</th>
                <th className="py-3 pr-4 font-medium">{labels.year}</th>
                <th className="py-3 font-medium whitespace-nowrap">{labels.shelf}</th>
              </tr>
            </thead>
            <tbody>
              {results.slice(0, limit).map((b, i) => (
                <tr key={i} className="border-t border-ink/10 align-top">
                  <td className="py-3 pr-4 font-medium">{b[0]}</td>
                  <td className="py-3 pr-4 text-muted">{b[1]}</td>
                  <td className="hidden py-3 pr-4 text-muted md:table-cell">{b[2]}</td>
                  <td className="py-3 pr-4 font-mono text-sm text-muted">{b[3]}</td>
                  <td className="py-3 font-mono text-sm whitespace-nowrap text-muted">{b[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {results.length > limit && (
        <button
          type="button"
          onClick={() => setLimit((l) => l + PAGE * 3)}
          className="btn btn-ghost mt-8"
        >
          <span>{labels.showMore}</span>
        </button>
      )}
    </div>
  );
}
