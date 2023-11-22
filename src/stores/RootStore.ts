import { UserStore } from './user.store'
export class RootStore {
  public userStore: UserStore

  constructor() {
    this.userStore = new UserStore(this)
  }
}
