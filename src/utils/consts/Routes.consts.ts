import { generatePath } from 'react-router-dom'
import { APP_BASE_PATH } from '@/utils/consts/network.consts'

function addBaseRoute<T extends Record<string, string>>(routes: T): T {
  return Object.keys(routes).reduce((acc, key) => {
    acc[key as keyof T] = `${APP_BASE_PATH}${routes[key]}` as T[keyof T]
    return acc
  }, {} as T)
}

const RouteConsts = addBaseRoute({
  LANDING: '/',
  LOGIN: '/login',
  EMAIL_LOGIN: '/signIn',
  RECORD: '/record',
  RECORD_SIMPLE: '/record/simple',
  EDIT_SINGLE: '/edit/:id',
  TEST: '/test',
  TEST_PROTECTED: '/test-protected',
  MEMORY_WALL: '/memory-wall',
  OBITUARIES: '/obituaries'
})

type SiteRoute = (typeof RouteConsts)[keyof typeof RouteConsts]

function getRoute(route: SiteRoute, params?: object | undefined) {
  return generatePath(route, params)
}

export { RouteConsts, getRoute }
