import React, { ReactNode, useState } from 'react'
import TestCardGrid from './TestCardGrid.component'
import StoreTest from './TestCases/StoreTest.component'
import FirebaseTest from './TestCases/FirebaseTest.component'
import I18nTestComponent from './TestCases/I18nTest.component'
import AuthTest from './TestCases/AuthTest.component'
import FirebaseStorageTest from './TestCases/FirebaseStorageTest.component'
import LayoutOutletTest from './TestCases/LayoutOutletTest.component'
import { ChevronDown, ChevronUp } from 'lucide-react'
import UiComponentTest from './TestCases/UiComponentsTest.component'

const Test = () => {
  return (
    <TestCardGrid>
      <StoreTest />
      <I18nTestComponent />
      <AuthTest />
      <FirebaseTest />
      <FirebaseStorageTest />
      <LayoutOutletTest />
      <UiComponentTest />
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
  const [isCollapsed, setIsCollapsed] = useState(true)

  const toggleCollapse = () => {
    setIsCollapsed((prev: boolean) => !prev)
  }

  return (
    <div className="rounded-lg border shadow-sm">
      <div
        className="flex cursor-pointer items-center justify-between bg-slate-100 px-4 py-2 hover:bg-slate-200"
        onClick={toggleCollapse}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-slate-950">{title}</span>
        </div>
        {isCollapsed ? (
          <ChevronDown className="size-5 text-slate-500" />
        ) : (
          <ChevronUp className="size-5 text-slate-500" />
        )}
      </div>
      {!isCollapsed && (
        <div className="px-4 py-2">
          {description && <p className="mb-2 text-slate-600">{description}</p>}
          <div>{children}</div>
        </div>
      )}
    </div>
  )
}

export default Test
