type errorCodes = 'AUTH' | 'UNKNOWN'

export class AppError extends Error {
  code: string
  metadata?: Record<string, unknown>

  constructor(
    message: string,
    code: errorCodes,
    metadata?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.metadata = metadata
    Object.setPrototypeOf(this, AppError.prototype)
  }
}
