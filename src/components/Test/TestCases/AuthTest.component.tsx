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

        <LoginCard />
        <div className="p-4">Test Logout</div>
        <LogoutButton />
      </div>
    </TestBox>
  )
}

export default AuthTest
