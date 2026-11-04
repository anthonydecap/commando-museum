import type { ImageField } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import Image from "next/image";

type ImgProps = {
  field: ImageField;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
};

/** Renders a Prismic image field. Also handles bundled seed images served from /seed. */
export function Img({ field, className, sizes = "100vw", priority, fill }: ImgProps) {
  if (!isFilled.image(field)) return null;

  if (field.url.startsWith("/")) {
    return (
      <Image
        src={field.url}
        alt={field.alt ?? ""}
        className={className}
        sizes={sizes}
        priority={priority}
        {...(fill ? { fill: true } : { width: field.dimensions.width, height: field.dimensions.height })}
      />
    );
  }

  return (
    <PrismicNextImage
      field={field}
      className={className}
      sizes={sizes}
      priority={priority}
      fill={fill}
      fallbackAlt=""
    />
  );
}
