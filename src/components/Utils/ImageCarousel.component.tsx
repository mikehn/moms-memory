import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  ChevronLeft,
  ChevronRight,
  PauseCircle,
  PlayCircle,
  Maximize2
} from 'lucide-react'
import FullScreenGallery from '@/components/Utils/FullScreenCarousel.component'

interface ImageCarouselProps {
  images: string[]
  className?: string
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [images.length, isPaused])

  const openGallery = () => setIsGalleryOpen(true)
  const closeGallery = () => setIsGalleryOpen(false)

  const goToNextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length)
  const goToPreviousImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div
      className={`relative h-64 overflow-hidden rounded-lg bg-black ${className}`}
    >
      {/* Current Image */}
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          className={`absolute inset-0 size-full cursor-pointer object-contain transition-opacity duration-700 ${
            index === currentIndex ? 'z-10 opacity-100' : 'z-0 opacity-0'
          }`}
          onClick={openGallery}
        />
      ))}

      {/* Carousel Controls */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPreviousImage}
          className="pointer-events-auto size-10 bg-black/30 text-white hover:bg-black/50"
        >
          <ChevronLeft className="size-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={goToNextImage}
          className="pointer-events-auto size-10 bg-black/30 text-white hover:bg-black/50"
        >
          <ChevronRight className="size-6" />
        </Button>
      </div>

      {/* Bottom Controls */}
      <div className="absolute inset-x-2 bottom-2 flex items-center justify-between">
        {/* Pause/Play Button */}
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setIsPaused((prev) => !prev)}
          className="bg-black/30 text-white hover:bg-black/50"
        >
          {isPaused ? (
            <PlayCircle className="size-6" />
          ) : (
            <PauseCircle className="size-6" />
          )}
        </Button>

        {/* Image Counter */}
        <div className="rounded-full bg-black/30 px-2 py-1 text-sm text-white">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Fullscreen Button */}
        <Button
          size="icon"
          variant="ghost"
          onClick={openGallery}
          className="bg-black/30 text-white hover:bg-black/50"
        >
          <Maximize2 className="size-5" />
        </Button>
      </div>

      {/* Fullscreen Gallery */}
      <FullScreenGallery
        images={images}
        initialSelectedIndex={currentIndex}
        isOpen={isGalleryOpen}
        onClose={closeGallery}
      />
    </div>
  )
}

export default ImageCarousel
