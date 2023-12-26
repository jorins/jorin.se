import type { ImageProps } from 'next/image';
import React from "react";
import Image from "next/image";

type StrictImageProps = {
  alt: string
} & ImageProps

const stub: ImageProps = {
  alt: "Stub image",
  src: "",
  width: 500,
  height: 500,
};

const images: Record<string, StrictImageProps> = {
  grimoire: {
    alt: "A grimoire floating above a glowing purple pentagram",
    src: "/images/grimoire.png",
    width: 500,
    height: 500,
  },
  ramble: stub,
  machination: stub,
};

export interface PredefinedImageProps {
  imgId: keyof typeof images | string;
  asFigure?: boolean;
  override?: Partial<StrictImageProps>;
}

export function PredefinedImage({
  imgId,
  asFigure,
  override,
}: PredefinedImageProps): JSX.Element {
  const attributes: StrictImageProps = {
    ...images[imgId],
    ...(override ?? {}),
  };
  return asFigure ?? true ? (
    <figure>
      <Image {...attributes} alt={attributes.alt} />
      <figcaption>{attributes.alt}</figcaption>
    </figure>
  ) : (
    <Image {...attributes} alt={attributes.alt} />
  );
}

export default PredefinedImage;
