import type { PredefinedImageProps } from '../pageComponents/PredefinedImage'
import PredefinedImage from '../pageComponents/PredefinedImage'

export interface CollectionHeaderProps {
  imgId: string
  imgOverride?: PredefinedImageProps['override']
  title: string
  children: React.ReactNode
}

/**
 * A header for a collection. It can be used on both the collection page, and
 * in a listing of collections.
 */
export function CollectionHeader({
  imgId,
  imgOverride,
  title,
  children,
}: CollectionHeaderProps): JSX.Element {
  return (
    <section className="collection-header">
      <PredefinedImage
        className="collection-image"
        imgId={imgId}
        asFigure={false}
        override={imgOverride}
      />
      <h1 className="collection-title">{title}</h1>
      <span className="collection-description">{children}</span>
    </section>
  )
}

export default CollectionHeader
