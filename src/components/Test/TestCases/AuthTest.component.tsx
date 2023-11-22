// Note: You'll need to import your Firebase config and auth methods
import { TestBox } from '../Test.component'
import { LoginCard } from '../../Login/Login.component'
import { useContext } from 'react'
import { AuthContext } from '../../../services/providers/AuthProvider'
import { LogoutButton } from '../../Login/Logout.compontn'
import Show from '../../Utils/Show.component'
import { cx } from '../../../utils/gen.utils'
// import { auth, signInWithGoogle } from 'firebase/auth'

const AuthTest = () => {
  const context = useContext(AuthContext)
  const isLoggedIn = !!context?.currentUser
  return (
    <TestBox
      title="Authentication test"
      description="tests register and login flows"
    >
      <div className="flex flex-col items-center">
        <div
          className={cx(
            'mb-2 flex w-fit flex-col rounded-md border p-2 px-4 ',
            isLoggedIn ? 'bg-green-50' : 'bg-red-50'
          )}
        >
          <div className="font-bold">
            Current User:
            <span className="pl-1 font-normal">
              {!isLoggedIn && 'not logged in'}
            </span>
          </div>

          <Show if={isLoggedIn}>
            <div>
              <span className="font-semibold">email</span>:{' '}
              {context?.currentUser?.email || ''}
            </div>
            <div>
              <span className="font-semibold">uid</span>:{' '}
              {context?.currentUser?.uid || ''}
            </div>
          </Show>
        </div>
        <div className="m-1 rounded-md border p-2">
          <UserIcon
            photoURL={context?.currentUser?.photoURL || ''}
            email={context?.currentUser?.email || ''}
          />
        </div>
        <LoginCard />
        <div className="p-4">Test Logout</div>
        <LogoutButton />
      </div>
    </TestBox>
  )
}

const UserIcon = ({ photoURL, email }: { photoURL: string; email: string }) => {
  if (!email) return null
  return (
    <div className="flex items-center space-x-4">
      <Show if={!!photoURL}>
        {{
          then: (
            <img
              src={photoURL}
              alt="User Icon"
              className="size-12 rounded-full object-cover shadow"
            />
          ),
          else: (
            <div className="flex size-12 items-center justify-center rounded-full bg-gray-300 font-bold text-white">
              {email?.[0].toUpperCase() || 'U'}
            </div>
          )
        }}
      </Show>
      <p className="font-medium text-gray-700">{email}</p>
    </div>
  )
}

export default AuthTest
