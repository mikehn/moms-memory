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
import { database } from './firebase.service'
import { FirebaseRtSchema, FirebaseValidationSchema } from './firebase.config'
import { Memory } from '../../types/components/MemoryWall.type'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const db = (link: string) => ref(database, link)

export const dbRef = {
  test: (valId?: string) => (valId ? db(`_test/${valId}`) : db(`_test`)),
  user: (uid: string, bookNum: number) => db(`user/${uid}/${bookNum}`),
  userMemoryCard: (uid: string, id: number) => db(`memory-wall/${uid}/${id}`),
  allMemoryCards: () => db(`memory-wall`)
}

export const dbUpdate = {
  testV1: async (num: number) => {
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
  },
  memory: async (
    // title: string,
    // memory: string,
    // images: string[],
    // uid?: string,
    // id?: number
    memory: Memory
  ) => {
    if (!memory.uid) throw new Error('User is not authenticated.')

    const memoryData = {
      ...memory,
      memory: memory.text,

      createdAt: Date.now()
    }

    if (memory.id) {
      console.log('update: memory.uid', memory.uid, ':', memory.id, memoryData)
      // Update existing memory
      await update(dbRef.userMemoryCard(memory.uid, memory.id), memoryData)
    } else {
      // Add new memory with unique ID
      const newId = Date.now() // You can replace this with a UUID if needed
      memoryData.id = newId
      console.log('__add: memory.uid', memory.uid, ':', newId, memoryData)

      await set(dbRef.userMemoryCard(memory.uid, newId), memoryData)
    }
  }
}

//export const testQuery = () => fbRefs.test('v1')
