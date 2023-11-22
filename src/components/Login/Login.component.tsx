import { Label } from '@radix-ui/react-dropdown-menu'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Input } from '../ui/input'

export const LoginCard: React.FC = () => {
  const auth = getAuth()
  const googleProvider = new GoogleAuthProvider()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      console.error(error)
    }
  }

  const handleEmailAuth = async () => {
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password)
        alert('Registration successful!')
      } else {
        await signInWithEmailAndPassword(auth, email, password)
        alert('Login successful!')
      }
    } catch (error) {
      console.error(error)
      alert('Error with email/password authentication.')
    }
  }

  return (
    <>
      <Card className="w-full max-w-md bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            {isRegistering ? 'Register' : 'Login'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="flex w-full items-center justify-center gap-2"
          >
            Sign in with Google
          </Button>

          <div className="relative">
            <Label>Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2"
            />
          </div>
          <div className="relative">
            <Label>Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2"
            />
          </div>

          <Button
            onClick={handleEmailAuth}
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            {isRegistering ? 'Register' : 'Login'}
          </Button>
          <p className="text-center text-sm">
            {isRegistering
              ? 'Already have an account?'
              : "Don't have an account?"}{' '}
            <span
              onClick={() => setIsRegistering(!isRegistering)}
              className="cursor-pointer text-blue-600 hover:underline"
            >
              {isRegistering ? 'Login' : 'Register'}
            </span>
          </p>
        </CardContent>
      </Card>
    </>
  )
}
