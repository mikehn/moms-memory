import React from 'react'
import TestComponent from '@/components/Test/Test.component'
import { Link } from 'react-router-dom'
import { RouteConsts } from '../../utils/consts/Routes.consts'

function Test() {
  return (
    <div className="flex flex-col p-1 pt-2 md:p-20 md:pt-6" dir="ltr">
      <div className="mb-2 border-b-2 text-3xl font-semibold">
        Test Page
        <span className="ml-2 text-xl font-light text-slate-400">
          this page is to showcase all elements in site (ui,services,utils,
          etc..)
        </span>
      </div>
      <Link
        className="w-fit rounded-md p-2 pr-3 hover:bg-slate-200"
        to={RouteConsts.LANDING}
      >
        ← Back
      </Link>
      <div className="mt-4">
        <TestComponent />
      </div>
    </div>
  )
}

export default Test
