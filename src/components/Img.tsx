import { useState, type ImgHTMLAttributes } from "react";
import sizes from "../data/image-sizes.json";
import { cn } from "../lib/utils";

const dims = sizes as unknown as Record<string, [number, number]>;

/** True when the photo exists in the optimized set (photos.json → npm run images). */
export const hasImg = (id?: string) => !!id && id in dims;

export const imgSrc = (id: string, size: "sm" | "lg" = "lg") => `/img/${id}-${size}.webp`;
export const imgRatio = (id: string) => {
  const d = dims[id];
  return d ? d[0] / d[1] : 4 / 3;
};

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  id: string;
  alt: string;
  /** Use the large file even on small screens (e.g. for heroes). */
  eager?: boolean;
};

/** Responsive WebP image with a blur-up fade-in. */
export function Img({ id, alt, className, eager, sizes: sizesAttr, ...rest }: Props) {
  const [loaded, setLoaded] = useState(false);
  const d = dims[id];
  return (
    <img
      src={imgSrc(id, "lg")}
      srcSet={`${imgSrc(id, "sm")} 640w, ${imgSrc(id, "lg")} 1600w`}
      sizes={sizesAttr ?? "(max-width: 768px) 100vw, 50vw"}
      width={d?.[0]}
      height={d?.[1]}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={cn(
        "transition-[opacity,filter,transform] duration-700 ease-out",
        loaded ? "opacity-100 blur-0" : "opacity-0 blur-md",
        className,
      )}
      {...rest}
    />
  );
}
