import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

import { LiteYouTube } from "@/components/LiteYouTube";
import { Reveal } from "@/components/Reveal";
import { InlineRichText } from "@/components/RichText";
import { SectionHeading } from "@/components/SectionHeading";
import { getDictionary } from "@/i18n";
import type { SliceContext } from "@/lib/slice-context";
import { youTubeId } from "@/lib/youtube";

export type VideoListProps = SliceComponentProps<Content.VideoListSlice, SliceContext>;

const VideoList = ({ slice, slices, context }: VideoListProps) => {
  const p = slice.primary;
  const dict = getDictionary(context.lang);
  const isLastList = slices.filter((s) => s.slice_type === "video_list").at(-1) === slice;
  const videos = p.videos.filter((v) => youTubeId(v.youtube_url));

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-paper py-20 lg:py-28"
    >
      <div className="container-x">
        <SectionHeading eyebrow={p.eyebrow} title={p.title}>
          {isFilled.richText(p.intro) && <InlineRichText field={p.intro} />}
        </SectionHeading>
        <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {videos.map((video, i) => (
            <Reveal as="li" key={i} delay={(i % 3) * 80}>
              <div className="relative aspect-video overflow-hidden bg-ink">
                <LiteYouTube
                  id={youTubeId(video.youtube_url)!}
                  title={video.title ?? "Video"}
                  playLabel={dict.playVideo}
                />
              </div>
              {video.meta && (
                <p className="mt-5 font-mono text-xs tracking-[0.12em] text-teal uppercase">{video.meta}</p>
              )}
              <h3 className="display mt-2 text-2xl">{video.title}</h3>
              {video.description && <p className="mt-2 text-ink/70">{video.description}</p>}
            </Reveal>
          ))}
        </ul>
        {isLastList && (
          <p className="mt-12 font-mono text-[0.68rem] tracking-[0.12em] text-muted uppercase">
            {dict.videoNote}
          </p>
        )}
      </div>
    </section>
  );
};

export default VideoList;
