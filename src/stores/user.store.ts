import { makeAutoObservable } from 'mobx'
import { RootStore } from './RootStore'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { invokeApiAction, loadable } from '../utils/store.utils'
// import { getOpenAiKey } from '../services/firebase/realtime.service'

class UserStore {
  // apiKey = loadable('')
  test = loadable('initial value')

  constructor(public root: RootStore) {
    makeAutoObservable(this)
  }
}

export { UserStore }
