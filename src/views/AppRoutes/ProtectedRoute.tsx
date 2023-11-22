import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../../services/providers/AuthProvider'

interface ProtectedRouteProps {
  children?: JSX.Element
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { currentUser, loading } = useAuth()

  if (loading) {
    //TODO: change to spinner
    return <div>Loading...</div>
  } else if (!currentUser) {
    return <Navigate to="/login" replace />
  } else {
    return children ? children : <Outlet />
  }
}

export default ProtectedRoute
