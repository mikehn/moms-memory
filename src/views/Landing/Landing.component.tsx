import React from 'react'
import { Link } from 'react-router-dom'
import { RouteConsts } from '../../utils/consts/Routes.consts'

const Landing = () => {
  return (
    <div className="flex size-full flex-col items-center justify-center">
      <div className="text-4xl">Template starter site </div>
      <span className="text-center text-xl text-slate-600">
        React + Typescript + Firebase + Mobx + tailwind + vtest + prettier +
        eslint + shadcn + react router + i18next
      </span>
      <span className="mt-2 text-xl font-semibold text-slate-950">
        implemented utilities:
      </span>
      <span className="text-center text-xl text-slate-600">
        Layouts, Error Handling,basic testing examples, firebase storage,
        firebase auth (gmail), firebase utils, Authenticated routes, i18n utils
        and setup
      </span>
      <Link
        className="ml-2 mt-4 text-xl text-blue-500 hover:underline"
        to={RouteConsts.TEST}
      >
        Test Page
      </Link>
    </div>
  )
}

export default Landing
