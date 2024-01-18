import type { PredefinedImageProps } from 'pageComponents/PredefinedImage'

import { PredefinedImage } from 'pageComponents/PredefinedImage'

export interface CollectionHeaderProps {
  imgId: string
  imgOverride?: PredefinedImageProps['override']
  title: React.ReactNode
  description: React.ReactNode
}

/**
 * A header for a collection. It can be used on both the collection page, and
 * in a listing of collections.
 */
export function CollectionHeader({
  imgId,
  imgOverride = {},
  title,
  description,
}: CollectionHeaderProps): JSX.Element {
  return (
    <section className="collection-header">
      <PredefinedImage
        className="collection-image"
        imgId={imgId}
        asFigure={false}
        override={imgOverride}
      />
      <span className="collection-title">{title}</span>
      <span className="collection-description">{description}</span>
    </section>
  )
}

export default CollectionHeader
