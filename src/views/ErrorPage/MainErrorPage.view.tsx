import React from 'react'
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'
import { AppError } from '../../utils/error.utils'
/*
Place holder for the main error page
*/

const MainErrorPage = () => {
  return (
    <div className="flex h-screen flex-col content-center items-center justify-center bg-violet-200 text-4xl">
      <RouteErrorBoundary />
    </div>
  )
}

const RouteErrorBoundary: React.FC = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    // Handle React Router errors
    return (
      <div>
        <h1>Error</h1>
        <p>Status: {error.status}</p>
        <p>{error.statusText || 'Hmm.. we cant find the page you wanted'}</p>
      </div>
    )
  } else if (error instanceof AppError) {
    // Handle centralized errors
    return (
      <div>
        <p>{error.message}</p>
      </div>
    )
  } else if (error instanceof Error) {
    // Handle unexpected errors
    return (
      <div>
        <h1>Unexpected Error</h1>
        <p>{error.message}</p>
      </div>
    )
  } else {
    // Generic fallback
    return <div>An unexpected error occurred.</div>
  }
}

export default MainErrorPage
