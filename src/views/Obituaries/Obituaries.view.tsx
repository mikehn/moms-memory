import { useState } from 'react'
import { Masonry } from 'masonic'
import { Button } from '@/components/ui/button'
import { Obituary } from '../../types/components/Obituaries.type'
import { AddObituaryModal } from '../../components/Obituary/ObitModal.component'
import { ObituaryCard } from '../../components/Obituary/ObitCard.component'

export const ObituariesPage = () => {
  const [obituaries, setObituaries] = useState<Obituary[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddObituary = (newObituary: Obituary) => {
    setObituaries([newObituary, ...obituaries])
    setIsModalOpen(false)
  }

  const renderObituary = ({ data }: { data: Obituary }) => (
    <div key={data.id} className="mb-4">
      <ObituaryCard data={data} />
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center">
          <h1 className="mb-2 font-serif text-3xl text-gray-900">
            In Loving Memory of
          </h1>
          <h2 className="text-4xl font-semibold text-gray-900">Emunah Hasin</h2>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex justify-center">
          <Button onClick={() => setIsModalOpen(true)}>
            Share Your Tribute
          </Button>
        </div>

        <div className="h-[calc(100vh-200px)] overflow-y-auto">
          <Masonry
            items={obituaries}
            render={renderObituary}
            columnGutter={24}
            rowGutter={24}
            columnCount={3}
            columnWidth={300}
            overscanBy={5}
          />
        </div>
      </main>

      <AddObituaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddObituary}
      />
    </div>
  )
}
