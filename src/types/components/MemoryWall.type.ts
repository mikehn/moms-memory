import { Languages } from '../general.types'

interface MemoryText {
  title: string
  text: string
}

export interface Memory extends MemoryText {
  id?: number
  images?: string[]
  uid: string
  author: string
  lang: Languages
  createdAt?: string
  translation?: Partial<Record<Languages, MemoryText>>
}

export interface FirebaseRtDbMemory extends MemoryText {
  id?: number
  images: string[]
  author: string
  lang: Languages
  createdAt?: string
  translation?: Partial<Record<Languages, MemoryText>>
}
