"use client";

import Image from "next/image";
import { useState } from "react";

type LiteYouTubeProps = { id: string; title: string; playLabel: string };

/** Shows a thumbnail and only connects to YouTube once the visitor presses play. */
export function LiteYouTube({ id, title, playLabel }: LiteYouTubeProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group absolute inset-0 h-full w-full"
      aria-label={`${playLabel}: ${title}`}
    >
      <Image
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        fill
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover grayscale-[40%] transition-[transform,filter] duration-700 group-hover:scale-105 group-hover:grayscale-0"
      />
      <span className="absolute inset-0 bg-ink/30 transition-colors group-hover:bg-ink/10" />
      <span className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-beret text-white shadow-lg transition-transform group-hover:scale-110">
        <svg viewBox="0 0 16 16" className="ml-1 size-6" fill="currentColor" aria-hidden>
          <path d="M4 2.5v11l9-5.5-9-5.5Z" />
        </svg>
      </span>
    </button>
  );
}
