export interface PageTitleProps {
  children: React.ReactNode
}

export function PageTitle({ children }: PageTitleProps): JSX.Element {
  return <h1 className="page-title">{children}</h1>
}
