import { Loader2 } from 'lucide-react'
import { classNames } from '../../utils'

interface PageLoadingProps {
  message?: string
  fullscreen?: boolean
  className?: string
  show?: boolean
}

const PageLoading: React.FC<PageLoadingProps> = ({
  message = 'Loading...',
  fullscreen = false,
  className,
  show
}) => {
  if (!show) return null
  return (
    <div
      className={classNames(
        'flex items-center justify-center bg-black/50 backdrop-blur-md',
        fullscreen
          ? 'fixed inset-0 z-50'
          : 'absolute top-0 left-0 w-full h-full',
        className
      )}
    >
      <div className="flex flex-col items-center space-y-2 rounded-lg bg-white/80 p-4 shadow-md">
        <Loader2 className="size-8 animate-spin text-blue-600" />
        <span className="text-sm font-medium text-gray-700">{message}</span>
      </div>
    </div>
  )
}

export default PageLoading
