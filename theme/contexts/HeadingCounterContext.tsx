/**
 * @module
 * Context that counts hierarchical headings, e.g. in a pattern of
 * 1.
 *   1.1
 *   1.2
 *    1.2.1
 *    1.2.2.
 *   1.3
 * 2.
 */

import { createContext, useContext } from 'react'

/**
 * This is the interface exposed to consumers. You provide the level and it
 * gives the string representation. State is handled internally.
 */
type CountFn = (level: number) => string

/**
 * State of the counter. h1 is reserved for the title, so we cover h2 - h6.
 */
type HeadingCounterState = [
  PositionValue, // h2
  PositionValue, // h3
  PositionValue, // h4
  PositionValue, // h5
  PositionValue, // h6
]

/**
 * A position in the heading counter state.
 */
type PositionValue = number | null

/**
 * Get the default (blank) state
 */
function defaultState(): HeadingCounterState {
  return [null, null, null, null, null]
}

/**
 * Get a string representation of a heading count. Naively assumes that the
 * state is well constructed, i.e. all values following the first null are null.
 * @example
 * ```typescript
 * toString([1, 2, null, null, null])
 * ```
 *
 * gives
 *
 * ```typescript
 * '1.2.'
 * ```
 */
function toString(state: HeadingCounterState): string {
  return state.filter(i => i !== null).join('.') + '.'
}

/**
 * Count a heading at specified level. Gives the new heading count state.
 */
function countHeading(
  state: HeadingCounterState,
  level: number,
): HeadingCounterState {
  // Validate level
  if (level < 2 || level > 6 || Number.isNaN(level)) {
    throw new Error(
      `Trying to count heading of level ${level}, but the level must be between 2 and 6.`,
    )
  }

  // Avoid mutation of input argument
  const res: HeadingCounterState = [...state]

  // heading level 2 -> index 0
  const target = level - 2

  // Purge state following given index
  for (let i = target + 1; i < res.length; i++) {
    res[i] = null
  }

  // Increment target
  res[target] = (res[target] ?? 0) + 1

  return res
}

const HeadingCounterContext = createContext<
  ((level: number) => string) | undefined
>(undefined)

export interface HeadingCounterProviderProps {
  children: React.ReactNode
}

export function HeadingCounterProvider({
  children,
}: HeadingCounterProviderProps): React.ReactNode {
  // React.useState is a hook and causes redraws. Since we update the state
  // when we retrieve it, we handle state internally here.
  let state = defaultState()

  const count: CountFn = (level: number) => {
    state = countHeading(state, level)
    return toString(state)
  }

  return (
    <HeadingCounterContext.Provider value={count}>
      {children}
    </HeadingCounterContext.Provider>
  )
}

export function useHeadingCounter(): CountFn {
  const context = useContext(HeadingCounterContext)
  if (context === undefined) {
    throw new Error(
      'useHeadingCounter was called outside of a HeadingCounterProvider',
    )
  }

  return context
}
