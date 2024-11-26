/**
 * Context that provides access to MDX headings
 */

import type { Heading } from 'nextra'

import { createContext, useContext, useState } from 'react'

interface Headings {
  headings: Heading[]
  registerHeadings: (headings: Heading[]) => void
}

const HeadingsContext = createContext<Headings | undefined>(undefined)

export interface HeadingsProviderProps {
  children: React.ReactNode
}

export function HeadingsProvider({
  children,
}: HeadingsProviderProps): React.ReactNode {
  const [headings, setHeadings] = useState<Heading[]>([])

  function registerHeadings(newHeadings: Heading[]) {
    const toAdd: Heading[] = []

    for (const newHeading of newHeadings) {
      // If the heading is already registered, skip adding it.
      if (headings.find(heading => heading.id === newHeading.id)) {
        continue
      }

      toAdd.push(newHeading)
    }

    if (toAdd.length === 0) {
      return
    }

    setHeadings([...headings, ...toAdd])
  }

  return (
    <HeadingsContext.Provider value={{ headings, registerHeadings }}>
      {children}
    </HeadingsContext.Provider>
  )
}

export function useHeadings(): Headings {
  const context = useContext(HeadingsContext)
  if (context === undefined) {
    throw new Error('useHeadings was called outside of a HeadingsProvider')
  }
  return context
}
