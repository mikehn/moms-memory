import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { X } from 'lucide-react'
import { Memory } from '@/types/components/MemoryWall.type'
//import { auth } from '../../services/firebase/firebase.service'
//import { uploadUserMedia } from '../../services/firebase/storage.service'
import { getCurrentUID } from '../../services/firebase/auth.service'

// Define a type for image objects in the state
export interface MemoryImage {
  preview: string
  file?: File // If present, this image needs to be uploaded.
}

export interface MemoryFormObject {
  id?: number
  title: string
  text: string
  images?: MemoryImage[]
  uid: string
  author: string
}

interface MemoryFormProps {
  memory?: Memory
  onClose: () => void
  onSave: (memory: MemoryFormObject) => void
}

const MemoryForm: React.FC<MemoryFormProps> = ({ memory, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: memory?.title || '',
    text: memory?.text || '',
    author: memory?.author || '',
    // For an existing memory, assume memory.images is an array of URLs.
    images: memory?.images
      ? memory.images.map((url) => ({ preview: url }))
      : ([] as MemoryImage[])
  })

  const [error, setError] = useState('')

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Title is required.')
      return false
    }
    if (!formData.text.trim()) {
      setError('Memory text is required.')
      return false
    }
    setError('')
    return true
  }

  const removeImage = (index: number) => {
    console.log('::::', formData.images[index])
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (formData.images.length + files.length > 8) {
      setError(
        'Only 8 images can be uploaded per memory. Consider adding images to the image section.'
      )
      return
    }

    setError('') // Clear error if valid
    const newImages = files.map((file) => ({
      preview: URL.createObjectURL(file),
      file: file
    }))
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }))
  }

  const handleSave = async () => {
    if (!validateForm()) return

    try {
      // For each image, if it has a file property, upload it using the external service.
      // const uploadedUrls = await Promise.all(
      //   formData.images.map(async (img: MemoryImage) => {
      //     if (img.file) {
      //       if (auth.currentUser?.uid)
      //         return await uploadUserMedia(auth.currentUser?.uid, img.file)
      //     } else {
      //       // If there's no file, assume the image is already uploaded.
      //       return img.preview
      //     }
      //   })
      // )
      // const filteredUrls: string[] = uploadedUrls.filter(
      //   (url): url is string => url !== undefined
      // )

      // Call onSave with the memory data including the array of uploaded image URLs.
      const uid = getCurrentUID()
      if (!uid) return
      onSave({
        ...memory,
        title: formData.title,
        text: formData.text,
        images: formData.images,
        author: formData.author,
        uid
      })
    } catch (uploadError) {
      console.error('Error uploading images:', uploadError)
      setError('There was an error uploading images. Please try again.')
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{memory ? 'Edit Memory' : 'Add a Memory'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Name Field */}
          <Input
            type="text"
            placeholder="Enter your name"
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
          />
          {/* Title Field */}
          <Input
            type="text"
            placeholder="Enter memory title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          {/* Memory Text */}
          <Textarea
            rows={4}
            placeholder="Share your memory..."
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          />

          {/* Error Message */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Image Preview */}
          <div className="flex gap-2 overflow-x-auto">
            {formData.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.preview}
                  alt={`Preview ${index + 1}`}
                  className="size-20 rounded-lg object-cover"
                />
                <button
                  type="button"
                  className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                  onClick={() => removeImage(index)}
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Image Button */}
          <div className="flex justify-start">
            <Button
              onClick={() => document.getElementById('file-input')?.click()}
              variant="outline"
            >
              Upload Images
            </Button>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {memory ? 'Update Memory' : 'Add Memory'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default MemoryForm
