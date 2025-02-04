// AddObituaryModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Obituary } from '../../types/components/Obituaries.type'
import { ObituaryForm } from './ObitForm.component'

export const AddObituaryModal = ({
  isOpen,
  onClose,
  onSubmit
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: (obituary: Obituary) => void
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center font-serif">
            Share Your Tribute to Emunah
          </DialogTitle>
        </DialogHeader>
        <ObituaryForm onSubmit={onSubmit} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  )
}
