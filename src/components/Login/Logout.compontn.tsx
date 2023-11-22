import React from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { Button } from '@/components/ui/button'

export const LogoutButton: React.FC = () => {
  const auth = getAuth()

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className="bg-red-500 text-white hover:bg-red-600"
    >
      Logout
    </Button>
  )
}
