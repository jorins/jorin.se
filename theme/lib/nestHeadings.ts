import type { Heading } from 'nextra'

export type NestedHeadings = Array<Heading | NestedHeadings>

function json(i: any) {
  return JSON.stringify(i, undefined, 2)
}

export function nest(headings: Heading[], targetDepth = 2): NestedHeadings {
  if (headings.length === 0) {
    throw new Error('Heading nesting algorithm: called with empty headings')
  }

  // HTML heading levels are 1 through 6.
  if (targetDepth > 6) {
    throw new Error('Heading nesting algorithm: depth limit exceeded')
  }

  const chunk = []

  for (let index = 0; index < headings.length; ) {
    const item = headings[index]

    if (targetDepth > item.depth) {
      // If the item is further up than the current target depth, the chunking
      // algorithm has failed to slice a correct sub-chunk. This should never
      // happen as chunking should provide a `headings` that has no entries with
      // lesser depth than what is currently targeted.
      throw new Error(
        `Heading nesting algorithm error: target depth ${targetDepth} exceeded received item's depth ${json(
          item,
        )}`,
      )
    } else if (targetDepth === item.depth) {
      // This is the target depth, add it to the output and proceed one index.
      chunk.push(item)
      index += 1
    } else {
      // This heading is deeper than current chunk, start a new chunk
      // This chunk should include items starting at current index, which is
      // deeper than current targetDepth, up to the item before we encounter
      // the current targetDepth again.

      // Construct a chunk from current item up until the next item with a
      // lesser depth.

      // Start by finding the index of the next item that's back down to this
      // target depth.
      let subChunkEndIndex = headings.findIndex(
        (heading, nextIndex, { length }) => {
          return nextIndex >= index && targetDepth === heading.depth
        },
      )

      // subChunkEndIndex didn't get a match, so we set it to undefined instead
      // to make Array.slice use the full remainder of the array.
      if (subChunkEndIndex === -1) {
        subChunkEndIndex = undefined
      }

      // Slice, recurse with added depth, and push results
      const subHeadings = headings.slice(index, subChunkEndIndex)
      const res = nest(subHeadings, targetDepth + 1)
      chunk.push(res)

      // Go to the end of the chunk
      index = subChunkEndIndex
    }
  }

  return chunk
}
