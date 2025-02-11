import React from 'react'

type Props = {
  title: string
  subTitle: string
}

const TitleBar = ({ subTitle, title }: Props) => {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-8 text-center">
        <h1 className="mb-2 font-serif text-3xl text-gray-900">{title}</h1>
        <h2 className="text-sm font-semibold text-gray-900 md:text-4xl">
          {subTitle}
        </h2>
      </div>
    </header>
  )
}

export default TitleBar
