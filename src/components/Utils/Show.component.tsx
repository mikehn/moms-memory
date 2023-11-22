import React, { ReactNode } from 'react'

interface ShowProps {
  if: boolean
  children:
    | ReactNode
    | {
        then: ReactNode
        else: ReactNode
      }
}

const Show: React.FC<ShowProps> = ({ if: condition, children }) => {
  // If children is a plain ReactNode, handle it as before
  if (!children || typeof children !== 'object' || !('then' in children)) {
    return condition ? <>{children}</> : null
  }

  // Handle object children with then/else
  const { then, else: elseContent } = children as {
    then: ReactNode
    else: ReactNode
  }
  return condition ? <>{then}</> : <>{elseContent}</>
}

export default Show
