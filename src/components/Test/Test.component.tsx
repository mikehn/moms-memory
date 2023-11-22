import React, { ReactNode } from 'react'
import TestCardGrid from './TestCardGrid.component'
import StoreTest from './TestCases/StoreTest.component'
import FirebaseTest from './TestCases/FirebaseTest.component'
import I18nTestComponent from './TestCases/I18nTest.component'
import AuthTest from './TestCases/AuthTest.component'
import FirebaseStorageTest from './TestCases/FirebaseStorageTest.component'

const Test = () => {
  return (
    <TestCardGrid>
      <StoreTest />

      <I18nTestComponent />
      <AuthTest />
      <FirebaseTest />
      <FirebaseStorageTest />
    </TestCardGrid>
  )
}

/**
 * Utility - for adding title and description for tests
 */
export const TestBox = ({
  title,
  description,
  children
}: {
  title: string
  description?: string
  children: ReactNode
}) => {
  return (
    <div>
      <div className="mb-8">
        <div className="flex content-center items-end gap-2 border-b-2 align-bottom text-slate-950">
          <span className="text-xl font-semibold">{title}</span>
        </div>
        <p className="text-slate-600">{description}</p>
      </div>
      {children}
    </div>
  )
}

export default Test
