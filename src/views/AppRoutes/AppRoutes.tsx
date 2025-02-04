import { RouteObject, createBrowserRouter } from 'react-router-dom'
import { RouteConsts } from 'utils/consts/Routes.consts'
import MainErrorPage from '../ErrorPage/MainErrorPage.view'
// import Testing from '../Testing/Testing.view'
import ProtectedRoute from './ProtectedRoute'
import Landing from '../Landing/Landing.component'
import Test from '@/views/Test/Test.view'
import MainLayout from '../Layout/Main.layout'
import MemoryWall from '../MemoryWall/MemoryWall.view'
import { ObituariesPage } from '../Obituaries/Obituaries.view'

export function withLayout(
  layout: JSX.Element,
  children: RouteObject | RouteObject[]
): RouteObject {
  return {
    element: layout,
    children: Array.isArray(children) ? children : [children]
  }
}

/*
  Routes that should require authentication
*/
const protectedRoutes: RouteObject = {
  element: <ProtectedRoute />,
  errorElement: <MainErrorPage />,
  children: [
    {
      path: RouteConsts.TEST_PROTECTED,
      element: <Test />,
      errorElement: <MainErrorPage />
    }
  ]
}

/*
  Routes that can be accessed without authentication
*/
const unprotectedRoutes: RouteObject = {
  errorElement: <MainErrorPage />,
  children: [
    {
      path: RouteConsts.LANDING,
      element: <Landing />,
      errorElement: <MainErrorPage />
    },
    {
      path: RouteConsts.MEMORY_WALL,
      element: <MemoryWall />,
      errorElement: <MainErrorPage />
    },

    {
      path: RouteConsts.TEST,
      element: <Test />,
      errorElement: <MainErrorPage />
    },

    {
      path: RouteConsts.OBITUARIES,
      element: <ObituariesPage />,
      errorElement: <MainErrorPage />
    }
  ]
}

const AppRoutes = createBrowserRouter([
  withLayout(<MainLayout />, [
    //Unprotected Routes
    unprotectedRoutes,
    //Protected Routes
    protectedRoutes
  ]),
  {
    element: <MainErrorPage />,
    path: '*'
  }
])

export default AppRoutes
