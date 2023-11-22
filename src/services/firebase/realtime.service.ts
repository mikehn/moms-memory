import {
  set,
  // get,
  // push,
  //query,
  //orderByChild,
  // DatabaseReference,
  update,
  ref
} from 'firebase/database'
import { auth, database } from './firebase.service'
import { FirebaseRtSchema, FirebaseValidationSchema } from './firebase.config'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const currentUid = () => auth.currentUser?.uid
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const db = (link: string) => ref(database, link)

export const dbRef = {
  test: (valId?: string) => (valId ? db(`_test/${valId}`) : db(`_test`)),
  user: (uid: string, bookNum: number) => db(`user/${uid}/${bookNum}`)
}

export const dbUpdate = {
  testV1: async (num: number) => {
    console.log(':::', num)
    await FirebaseValidationSchema.validateAt('_test.v1', {
      _test: { v1: num }
    })
    await set(dbRef.test('v1'), num)
  },
  testV2: async (email: string) => {
    await FirebaseValidationSchema.validateAt('_test.v2', email)
    await set(dbRef.test('v2'), email)
  },
  test: async (values: Partial<FirebaseRtSchema['_test']>) => {
    await update(dbRef.test(), { ...values })
  }
}

//export const testQuery = () => fbRefs.test('v1')
