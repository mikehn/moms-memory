import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential
} from 'firebase/auth'

const auth = getAuth()
const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async (): Promise<UserCredential | null> => {
  try {
    return await signInWithPopup(auth, googleProvider)
  } catch (error) {
    console.error('Google Sign-In Error:', error)
    return null
  }
}

export const signInWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential | null> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.error('Email Login Error:', error)
    return null
  }
}

export const registerWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential | null> => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.error('Email Registration Error:', error)
    return null
  }
}

export const getCurrentUID = () => auth.currentUser?.uid
