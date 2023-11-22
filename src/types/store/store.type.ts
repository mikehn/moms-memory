import { RequestState } from 'types/API/Network.type'
import { RequestError } from 'types/API/Network.type'

export interface LoadableStore {
  state: RequestState
  error: RequestError
}

export type LoadableObject<T> = {
  data: T
  state: RequestState
  error: RequestError
}
