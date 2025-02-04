export function cx(...args: unknown[]) {
  return args
    .flat()
    .filter((x) => typeof x === 'string')
    .join(' ')
    .trim()
}

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const getLocationFromFirebaseUrl = (url: string): string | null => {
  try {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname // Get the path part of the URL

    // Extract the last part after the last '/'
    const fileName = decodeURIComponent(pathname.split('/').pop() || '')

    return fileName || null
  } catch (error) {
    console.error('Invalid Firebase URL:', error)
    return null
  }
}

export function getNonIntersectingElements<T>(
  array1: T[],
  array2: T[]
): [T[], T[]] {
  const set1 = new Set(array1)
  const set2 = new Set(array2)

  return [
    array1.filter((item) => !set2.has(item)), // Elements in array1 but not in array2
    array2.filter((item) => !set1.has(item)) // Elements in array2 but not in array1
  ]
}
