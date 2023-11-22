export type RequestState = 'loading' | 'error' | 'success' | 'idle'

export type NetworkRequestError = {
  status: 'error' | 'warning' | 'fail' | 'none'
  message: string
  statusCode: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: any
}

export type RequestError = NetworkRequestError
