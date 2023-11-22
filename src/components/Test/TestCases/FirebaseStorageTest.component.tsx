import {
  uploadBytes,
  getDownloadURL,
  ref,
  deleteObject
} from 'firebase/storage'
import { useEffect, useState } from 'react'
import { storage } from '@/services/firebase/firebase.service'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { TestBox } from '../Test.component'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useToast } from '../../../utils/hooks/use-toast'

const FirebaseStorageTest = () => {
  return (
    <TestBox title="Storage Test" description="tests firebase storage">
      <ImageUploader />
    </TestBox>
  )
}

export const ImageUploader: React.FC = () => {
  const auth = getAuth()
  const [userId, setUserId] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid)
        loadExistingImage()
      } else {
        setUserId(null)
        setImageUrl(null)
      }
    })
    return unsubscribe
  }, [auth])

  const loadExistingImage = async () => {
    const fileRef = ref(storage, `test/t1.jpg`)
    try {
      const url = await getDownloadURL(fileRef)
      setImageUrl(url)
    } catch (error) {
      console.log('No existing image found.')
    }
  }

  const handleUpload = async (file: File) => {
    if (!userId) {
      toast({
        title: 'Failed to upload',
        description: String('You must be signed in to upload')
      })
      return
    }

    setUploading(true)
    const fileRef = ref(storage, `test/t1.jpg`)
    try {
      await uploadBytes(fileRef, file)
      const url = await getDownloadURL(fileRef)
      setImageUrl(url)
      toast({
        title: 'success',
        description: String('Image uploaded successfully')
      })
    } catch (error) {
      console.error('Error uploading image:', error)
      toast({
        title: 'Failed to upload',
        description: String('Failed to upload image. Please try again.')
      })
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async () => {
    if (!userId || !imageUrl) {
      toast({
        title: 'Failed to delete',
        description: String('No image to delete.')
      })
      return
    }

    const fileRef = ref(storage, `test/t1.jpg`)
    try {
      await deleteObject(fileRef)
      setImageUrl(null)
      toast({
        title: 'success',
        description: String('Image deleted successfully!')
      })
    } catch (error) {
      console.error('Error deleting image:', error)
      toast({
        title: 'Failed to delete',
        description: String('Failed to delete image. Please try again.')
      })
    }
  }

  return (
    <Card className="mx-auto max-w-md bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-center text-lg font-bold">
          Image Uploader
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Uploaded"
              className="h-auto max-h-64 w-full rounded-md object-cover shadow"
            />
          ) : (
            <div className="flex h-64 w-full items-center justify-center rounded-md border border-dashed border-gray-300 text-center text-gray-500">
              No Image
            </div>
          )}
        </div>

        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleUpload(file)
          }}
          disabled={uploading}
          className="mt-2 bg-green-200"
        />

        <div className="flex gap-2">
          <Button
            onClick={handleDelete}
            disabled={!imageUrl || uploading}
            className="w-full bg-red-500 text-white hover:bg-red-600"
          >
            Delete Image
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
export default FirebaseStorageTest
