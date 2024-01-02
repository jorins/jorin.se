import type { ImageProps } from 'next/image'
import React from 'react'
import Image from 'next/image'

/**
 * Image props that require alt text
 */
interface StrictImageProps extends ImageProps {
  alt: string
}

const stub: ImageProps = {
  alt: 'Stub image',
  src: '',
  width: 500,
  height: 500,
}

const images: Record<string, StrictImageProps> = {
  grimoire: {
    alt: 'A grimoire floating above a glowing purple pentagram',
    src: '/images/grimoire.png',
    width: 500,
    height: 500,
  },
  machination: {
    alt: 'On a printed circuit board, a blue glowing orb is suspended in a brass icosahedron. Above, two gears surrounded purple neon parentheses float.',
    src: '/images/machination.png',
    width: 500,
    height: 500,
  },
  ramble: {
    alt: 'A megaphone spits fire and feces.',
    src: '/images/ramble.png',
    width: 500,
    height: 500,
  },
}

export interface PredefinedImageProps {
  /**
   * Class name to apply to the image. If `asFigure`, it will be applied to the
   * `<figure>` element. Otherwise. It will be applied to the wrapped `Image`
   * component
   */
  className?: string

  /**
   * ID of the pre-defined image.
   */
  imgId: string

  /**
   * If true, the image will be wrapped in a `<figure>` element and followed by
   * a `<figcaption>` containing the image's alt text.
   */
  asFigure?: boolean

  /**
   * Override any attributes of the predefined image.
   */
  override: Partial<StrictImageProps>
}

export function PredefinedImage({
  className,
  imgId,
  asFigure = false,
  override = {},
}: PredefinedImageProps): JSX.Element {
  const attributes: StrictImageProps = {
    ...images[imgId],
    ...override,
  }

  // N.B.: we manually set the alt attribute instead of relying on the
  // `{...attributes}` spread to satisfy the accessibility linter.

  if (asFigure) {
    return (
      <figure className={className}>
        <Image {...attributes} alt={attributes.alt} />
        <figcaption>{attributes.alt}</figcaption>
      </figure>
    )
  }

  return <Image className={className} {...attributes} alt={attributes.alt} />
}

export default PredefinedImage
