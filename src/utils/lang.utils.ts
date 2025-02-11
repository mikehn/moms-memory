import { Languages } from '../types/general.types'

export function detectLanguage(text: string): Languages {
  let hebrewCount = 0
  let englishCount = 0

  for (const char of text) {
    // Check if character is in the Hebrew unicode block
    if (/[\u0590-\u05FF]/.test(char)) {
      hebrewCount++
    }
    // Check if character is an English letter
    else if (/[A-Za-z]/.test(char)) {
      englishCount++
    }
  }

  // Decide which language is predominant
  if (hebrewCount > englishCount) {
    return 'he'
  } else if (englishCount > hebrewCount) {
    return 'en'
  } else {
    return 'en' // default lang
  }
}
