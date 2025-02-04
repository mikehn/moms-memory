// ObituaryCard.tsx
import { Card } from '@/components/ui/card'
import { Obituary } from '../../types/components/Obituaries.type'

export const ObituaryCard = ({ data }: { data: Obituary }) => {
  return (
    <Card className="transition-shadow duration-200 hover:shadow-lg">
      <div className="flex h-full flex-col p-6">
        <div className="flex-1">
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            from {data?.author}
          </h2>
          <p className="whitespace-pre-line leading-relaxed text-gray-700">
            {data.description}
          </p>
        </div>
        <div className="mt-4 border-t border-gray-100 pt-3">
          <p className="text-xs text-gray-500">
            Shared on{' '}
            {new Date(data.datePosted).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>
    </Card>
  )
}
