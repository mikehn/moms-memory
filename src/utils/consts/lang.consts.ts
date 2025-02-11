import { LanguageData, Languages } from '../../types/general.types'

export const languagesMap: Record<Languages, LanguageData> = {
  en: { code: 'en', label: 'English' },
  he: { code: 'he', label: 'עברית' }
}

export const languagesList: LanguageData[] = Object.values(languagesMap)
