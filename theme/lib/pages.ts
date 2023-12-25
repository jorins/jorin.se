import type { Page } from 'nextra'

type TagRecord = Record<string, Page[]>

type Collection = {
  pages: Page[]
  tags: TagRecord
}

type Site = {
  grimoire: Collection
  machination: Collection
  ramble: Collection
  tags: TagRecord
}
