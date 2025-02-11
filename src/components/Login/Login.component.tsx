import { useState } from 'react'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Button } from '../ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Input } from '../ui/input'
import {
  signInWithGoogle,
  registerWithEmail,
  signInWithEmail
} from '../../services/firebase/auth.service'
import Show from '../Utils/Show.component'

interface LoginCardProps {
  onCanceled?: () => void
}

export const LoginCard: React.FC<LoginCardProps> = ({ onCanceled }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const handleGoogleSignIn = async () => {
    const result = await signInWithGoogle()
    if (result) {
      //alert('Google Sign-In Successful!')
    } else {
      //alert('Google Sign-In Failed.')
    }
  }

  const handleEmailAuth = async () => {
    let result = null

    if (isRegistering) {
      result = await registerWithEmail(email, password)
      if (result) alert('Registration Successful!')
    } else {
      result = await signInWithEmail(email, password)
      if (result) alert('Login Successful!')
    }

    if (!result) alert('Error with email/password authentication.')
  }

  return (
    <Card
      className="w-full max-w-md bg-white shadow-md"
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
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
        <Button
          onClick={onCanceled}
          className="w-full bg-red-500 text-white hover:bg-red-700"
        >
          Cancel
        </Button>
        <Show if={false}>
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
        </Show>
      </CardContent>
    </Card>
  )
}

interface AuthModalProps {
  isOpen: boolean
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen }) => {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="flex flex-col items-center space-y-2 rounded-lg bg-white/80 p-4 shadow-md">
        <div>AAA</div>
        <LoginCard />
      </div>
    </div>
  )
}

export { AuthModal }
