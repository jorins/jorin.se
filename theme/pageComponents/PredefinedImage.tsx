import Image, { ImageProps } from 'next/image'

const stub: ImageProps = {
  alt: "Stub image",
  src: '',
  width: 500,
  height: 500
}

const images: Record<string, ImageProps> = {
  grimoire: {
    alt: "A grimoire floating above a glowing purple pentagram",
    src: '/images/grimoire.png',
    width: 500,
    height: 500,
  },
  ramble: stub,
  machination: stub,
}

export interface PredefinedImageProps {
  imgId: keyof typeof images | string
  asFigure?: boolean
  override?: Partial<ImageProps>
}

export function PredefinedImage({imgId, asFigure, override}: PredefinedImageProps): JSX.Element {
  const attributes = {
    ...images[imgId],
    ...(override ?? {}),
  }
  return (asFigure ?? true)
    ? (<figure>
      <Image {...attributes} />
      <figcaption>{attributes.alt}</figcaption>
    </figure>)
    : (<Image {...attributes} />)
}

export default PredefinedImage
