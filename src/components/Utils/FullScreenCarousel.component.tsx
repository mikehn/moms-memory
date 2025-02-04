import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface ImageGalleryModalProps {
  images: string[]
  initialSelectedIndex?: number
  isOpen: boolean
  onClose: () => void
}

const FullScreenGallery: React.FC<ImageGalleryModalProps> = ({
  images,
  initialSelectedIndex = 0,
  isOpen,
  onClose
}) => {
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex)

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (!isOpen || images.length === 0) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="size-full max-h-[90vh] max-w-[90vw] overflow-hidden p-0">
        <div className="relative flex size-full items-center justify-center">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-50 bg-black/50 text-white hover:bg-black/70"
            onClick={onClose}
          >
            <X className="size-6" />
          </Button>

          {/* Previous Image Button */}
          {images.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 z-50 bg-black/50 text-white hover:bg-black/70"
              onClick={handlePrevious}
            >
              <ChevronLeft className="size-8" />
            </Button>
          )}

          {/* Selected Image */}
          <div className="flex size-full items-center justify-center">
            <img
              src={images[selectedIndex]}
              alt={`Image ${selectedIndex + 1}`}
              className="max-h-full max-w-full object-cover"
            />
          </div>

          {/* Next Image Button */}
          {images.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 z-50 bg-black/50 text-white hover:bg-black/70"
              onClick={handleNext}
            >
              <ChevronRight className="size-8" />
            </Button>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-white">
              {selectedIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FullScreenGallery
