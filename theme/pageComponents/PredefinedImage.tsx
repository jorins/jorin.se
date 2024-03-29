import type { ImageProps } from 'next/image'

import Image from 'next/image'
import React from 'react'

/**
 * Predefined image container. Add using `registerImage`
 */
const images: Record<string, StrictImageProps> = {}

/**
 * Image props that require alt text
 */
export interface StrictImageProps extends ImageProps {
  alt: string
}

/**
 * Register an image to be used per its ID
 */
export function registerImage(key: string, image: StrictImageProps): void {
  images[key] = image
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
