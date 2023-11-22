import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@/components/Header/Header.component'

const MainLayout = () => {
  const [message, setMessage] = useState<string>('')
  return (
    <div className="flex h-screen flex-col">
      <Header message={message} />
      <Outlet context={{ setMessage, message }} />
    </div>
  )
}

export default MainLayout
