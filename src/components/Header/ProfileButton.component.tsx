'use client'

import React, { useState } from 'react'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'

// shadcn UI components:
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { auth } from '../../services/firebase/firebase.service'
import { LoginCard } from '../Login/Login.component'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { DialogContent, DialogTitle } from '@radix-ui/react-dialog'

export function LoginDialog() {
  const [open, setOpen] = useState(false)
  return (
    <div className="z-40">
      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setOpen(true)}>
            Login
          </Button>
        </DialogTrigger>
        <DialogContent className="fixed left-0 top-0 h-screen w-screen max-w-full rounded-none">
          <DialogTitle className="hidden">Login</DialogTitle>
          <div
            className="flex size-full items-center justify-center rounded-none bg-slate-800/60"
            onClick={() => {
              setOpen(false)
            }}
          >
            <LoginCard
              onCanceled={() => {
                setOpen(false)
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export function ProfileButton() {
  const [user, setUser] = React.useState<User | null>(null)
  const [loading, setLoading] = React.useState<boolean>(true)

  // Listen for auth state changes (no react-firebase-hooks)
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  // Sign out from Firebase
  const handleLogout = React.useCallback(() => {
    signOut(auth)
  }, [])

  if (loading) {
    // Show a temporary loading state (skeleton, spinner, etc.)
    return (
      <Button variant="ghost" disabled>
        Loading...
      </Button>
    )
  }

  // If user is not logged in, show "Login" button
  if (!user) {
    return <LoginDialog />
  }

  // User is logged in
  const displayName = user.displayName || 'User'
  const photoURL = user.photoURL || undefined
  const initial = displayName.charAt(0).toUpperCase()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-9 rounded-full p-0">
            <Avatar className="size-9">
              <AvatarImage src={photoURL} alt={displayName} />
              <AvatarFallback>{initial}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
