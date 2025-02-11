import { Languages } from '../general.types'

// types.ts
export interface Obituary {
  id?: number
  author: string
  description: string
  datePosted: string
  lang: Languages
  translation?: Partial<Record<Languages, string>>
}
