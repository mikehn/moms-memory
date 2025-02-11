import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Edit } from 'lucide-react'
import ImageCarousel from '@/components/Utils/ImageCarousel.component'
import { Memory } from '@/types/components/MemoryWall.type'
import Show from '../Utils/Show.component'

interface MemoryCardProps {
  memory: Memory
  onEdit?: () => void
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memory, onEdit }) => {
  const imageCount = memory.images?.length || 0
  return (
    <Card className="group overflow-hidden">
      {/* Image Carousel - Full Width at Top */}
      {imageCount > 0 && (
        <div className="h-48 w-full overflow-hidden">
          <ImageCarousel images={memory.images || []} />
        </div>
      )}

      {/* Card Content */}
      <CardContent className="p-4">
        {/* Title - Prominent Placement */}
        <h2 className="mb-3 text-2xl font-bold text-gray-900">
          {memory.title}
        </h2>

        {/* Text with Scrollable Overflow */}
        <div
          className="mb-4 max-h-[500px] overflow-y-auto pr-2 text-gray-600"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(0,0,0,0.2) transparent'
          }}
        >
          {memory.text}
        </div>

        {/* Edit Button */}
        <Show if={!!onEdit}>
          <div className="flex justify-start gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Edit className="mr-2 size-4" />
              Edit
            </Button>
            {/* <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="transition-colors hover:bg-red-600 hover:text-primary-foreground"
            >
              <Trash className="mr-2 size-4" />
              Delete
            </Button> */}
          </div>
        </Show>
        <div className="mt-4 border-t border-gray-100 pt-3">
          <p className="text-xs text-gray-500">
            Shared by {memory.author} on{' '}
            {new Date(
              new Date(memory.createdAt || Date.now())
            ).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default MemoryCard
