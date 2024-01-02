export interface PageTitleProps {
  children: React.ReactNode
}

/**
 * Title of the page. Just an h1 wrapper with a class name of page-title.
 */
export function PageTitle({ children }: PageTitleProps): JSX.Element {
  return <h1 className="page-title">{children}</h1>
}
