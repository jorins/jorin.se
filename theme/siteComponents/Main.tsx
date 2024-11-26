export interface MainProps {
  children: React.ReactNode
}

export function Main({ children }: MainProps): React.ReactNode {
  return <main className="site-block">{children}</main>
}
