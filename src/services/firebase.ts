// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyATvG3UjWmXlu7FdAnLWVEJVEunCBiPDUo',
  authDomain: 'emunah-greenberg-hasin.firebaseapp.com',
  projectId: 'emunah-greenberg-hasin',
  storageBucket: 'emunah-greenberg-hasin.appspot.com',
  messagingSenderId: '195417571706',
  appId: '1:195417571706:web:595e2245466eb71fe896c3',
  measurementId: 'G-T8SWKSHBJG'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app)
