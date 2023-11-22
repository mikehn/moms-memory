/**
 * Holds all network related constants
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''
export const APP_BASE_PATH = import.meta.env.VITE_APP_BASE_PATH || ''
export const DEFAULT_CACHE_DURATION_MS = 1000
export const DEFAULT_POLLING_INTERVAL_MS = 1000 * 60 * 2
export const APP_IS_DEV = import.meta.env.VITE_APP_IS_DEV === 'true'
