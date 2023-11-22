import { runInAction } from 'mobx'
import { RequestError } from '../types/API/Network.type'
import { LoadableObject } from '../types/store/store.type'
import { invokeApiCB } from './network.utils'

export const NO_ERROR: RequestError = {
  message: '',
  status: 'none',
  statusCode: 0
}
export const INITIAL_STATE = 'idle'

/**
 * a wrapper function that wraps any data that originates from an API request
 * Converts a given object to a loadable object, this is done to enable tracking the current state of the object
 * @param data
 * @returns a loadable initialized object
 */
export function loadable<T>(data: T): LoadableObject<T> {
  return {
    data,
    state: INITIAL_STATE,
    error: NO_ERROR
  }
}

export function invokeApiAction<T>(
  apiFunc: (...args: unknown[]) => Promise<T>,
  dataItem: LoadableObject<T>
) {
  return invokeApiCB<T>(
    apiFunc,
    (state) => {
      runInAction(() => {
        const hasData = dataItem.data !== null
        if (hasData && state === 'loading') return
        dataItem.state = state
      })
    },
    (data) => {
      runInAction(() => {
        dataItem.data = data
      })
    },
    (error) => {
      runInAction(() => {
        dataItem.error = error
      })
    }
  )()
}
