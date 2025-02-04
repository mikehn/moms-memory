// ObituaryForm.tsx
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { generateUUID } from '../../utils/gen.utils'
import { Obituary } from '../../types/components/Obituaries.type'

export const ObituaryForm = ({
  onSubmit,
  onCancel
}: {
  onSubmit: (obituary: Obituary) => void
  onCancel: () => void
}) => {
  const { register, handleSubmit, reset } = useForm<Obituary>()

  const handleFormSubmit = (data: Obituary) => {
    onSubmit({
      ...data,
      id: generateUUID(),
      datePosted: new Date()
    })
    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="author">Your Name</Label>
        <Input
          id="author"
          {...register('author', { required: true })}
          placeholder="Enter your name"
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="description">Your Tribute</Label>
        <Textarea
          id="description"
          {...register('description', {
            required: true,
            minLength: {
              value: 8,
              message: 'Please write at least 50 characters'
            }
          })}
          rows={5}
          placeholder="Share your memories, thoughts, and feelings about Emunah"
          className="resize-none"
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button type="submit">Share Tribute</Button>
      </div>
    </form>
  )
}
