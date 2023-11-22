import { RequestError, RequestState } from '../types/API/Network.type'

export function invokeApiCB<T>(
  apiFunc: (...args: unknown[]) => Promise<T>,
  setState: (value: RequestState) => void,
  setData: (value: T) => void,
  setError: (value: RequestError) => void
) {
  const request = async (...args: unknown[]): Promise<T | undefined> => {
    setState('loading')
    setError({ message: '', status: 'none', statusCode: 0 })
    try {
      console.log('ACTION')
      const result: T = await apiFunc(...args)
      console.log('result', result)
      setData(result)
      setState('success')
      return result
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('ERROR', error)
      setError(error)
      setState('error')
    }
  }

  return request
}
