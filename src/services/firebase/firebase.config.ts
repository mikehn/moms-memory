import * as yup from 'yup'

// TypeScript Interface
export interface FirebaseRtSchema {
  _test: {
    v1: number
    v2: string
  }
}

// Yup Schema
const FirebaseValidationSchema = yup.object().shape({
  _test: yup.object().shape({
    v1: yup.number().min(2, 'Must place a minimum number of 2'),
    v2: yup.string().email('Must be an email format')
  })
})

export { FirebaseValidationSchema }
