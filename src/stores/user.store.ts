import { makeAutoObservable } from 'mobx'
import { RootStore } from './RootStore'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { invokeApiAction, loadable } from '../utils/store.utils'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
// import { getOpenAiKey } from '../services/firebase/realtime.service'

class UserStore {
  // apiKey = loadable('')
  test = loadable('initial value')
  user: User | null = null
  uid: string | null = null

  constructor(public root: RootStore) {
    makeAutoObservable(this)
  }

  getCurrentUUID() {
    return
  }

  private initAuthListener() {
    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
      this.user = user
      this.uid = user ? user.uid : null
    })
  }
}

export { UserStore }
