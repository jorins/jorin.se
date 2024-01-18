/**
 * Context for wrapping LayoutProps.
 */

import type { ThemeLayoutProps } from 'lib/types'

import { createContext, useContext } from 'react'

const LayoutContext = createContext<ThemeLayoutProps | undefined>(undefined)

export interface LayoutPropsProviderProps {
  layoutProps: ThemeLayoutProps
  children: React.ReactNode
}

export function LayoutPropsProvider({
  layoutProps,
  children,
}: LayoutPropsProviderProps) {
  return (
    <LayoutContext.Provider value={layoutProps}>
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayoutProps(): ThemeLayoutProps {
  const context = useContext(LayoutContext)
  if (context === undefined) {
    throw new Error(
      'useLayoutProps was called outside of a LayoutPropsProvider',
    )
  }
  return context
}
