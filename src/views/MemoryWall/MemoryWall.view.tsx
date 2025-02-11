import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import MemoryForm, {
  MemoryFormObject,
  MemoryImage
} from '@/components/MemoryWall/MemoryForm.component'
import MemoryCard from '@/components/MemoryWall/MemoryCard.component'
import { Masonry } from 'masonic'
import { FirebaseRtDbMemory, Memory } from '@/types/components/MemoryWall.type'
import { dbRef, dbUpdate } from '../../services/firebase/realtime.service'
import { useFirebaseRealtimeValue } from '../../utils/hooks/useFirebaseRealTimeData.hook'
import { getCurrentUID } from '../../services/firebase/auth.service'
import {
  deleteByLocation,
  uploadUserMedia
} from '../../services/firebase/storage.service'
import {
  getLocationFromFirebaseUrl,
  getNonIntersectingElements
} from '../../utils/gen.utils'
import PageLoading from '../../components/Utils/Loading.component'
import TitleBar from '../../components/TitleBar/TitleBar.component'
import { useTranslation } from 'react-i18next'
import { i18nKeys } from '@/assets/i18n/keys'
import { detectLanguage } from '../../utils/lang.utils'

type MemoriesObject = Record<string, Record<string, FirebaseRtDbMemory>>

function getMemoryList(memObject: MemoriesObject | null): Memory[] {
  if (!memObject) return []

  let allMessages: Memory[] = []

  Object.entries(memObject).forEach(([uid, userMessages]) => {
    const userMessageList = Object.values(userMessages)
      .flat()
      .map((values: FirebaseRtDbMemory) => ({ ...values, uid }))

    allMessages = [...allMessages, ...userMessageList]
  })

  return allMessages
}

const MemoryWall: React.FC = () => {
  const allMemoryCards = useFirebaseRealtimeValue<MemoriesObject>(
    dbRef.allMemoryCards()
  )
  const currentUID = getCurrentUID()
  const memoryList = getMemoryList(allMemoryCards)
  const memIdList = memoryList.map(({ id }) => id).join('')

  const [memories, setMemories] = useState<Memory[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMemory, setEditingMemory] = useState<Memory | null>(null)
  const [isLoading, setLoading] = useState(false)

  const { t } = useTranslation()
  useEffect(() => {
    console.log('memoryList', memoryList)
    setMemories(memoryList)
  }, [memIdList])

  const openDialog = (memory?: Memory) => {
    setEditingMemory(memory || null)
    setIsDialogOpen(true)
  }

  const closeDialog = () => setIsDialogOpen(false)

  const handleSaveMemory = async (memory: MemoryFormObject) => {
    closeDialog()
    setLoading(true)
    const updateMem = memoryList.find(({ id }) => id === memory.id)

    const [imagesToDelete, imagesToAdd] = getNonIntersectingElements(
      updateMem?.images || [],
      memory?.images?.map(({ preview }) => preview) || []
    )
    console.log('>>', imagesToDelete, imagesToAdd)
    console.log('memory:', memory)
    console.log('UPDATE:', updateMem)
    try {
      if (updateMem) await deleteCurrentImages(imagesToDelete)
      const imageLinks = await uploadImages(currentUID || null, memory)
      console.log('imageLinks:', imageLinks)
      const memoryWithLinks: Memory = createMemWithLinks(
        memory,
        currentUID,
        imageLinks
      )
      if (editingMemory && !!updateMem) {
        updateMem.images
        console.log('update::memoryWithLinks:', memoryWithLinks)

        if (memoryWithLinks.id) dbUpdate.memory(memoryWithLinks)
        // setMemories((prev) =>
        //   prev.map((m) => (m.id === memoryWithLinks.id ? memoryWithLinks : m))
        // )
      } else {
        console.log('memoryWithLinks:', memoryWithLinks)
        await dbUpdate.memory(memoryWithLinks)
        console.log('DB UPDATE ok')
        // setMemories((prev) => [...prev, { ...memoryWithLinks, id: Date.now() }])
      }
    } finally {
      setLoading(false)
    }
  }

  // Render function for each memory card
  const renderMemoryCard = ({ data }: { data: Memory }) => (
    <div key={data?.id || 'none'} className="mb-4 w-full px-2 md:px-0">
      <MemoryCard
        memory={data}
        onEdit={currentUID === data.uid ? () => openDialog(data) : undefined}
      />
    </div>
  )

  return (
    <>
      <TitleBar
        title={t(i18nKeys.page.memories.titleBar.title)}
        subTitle={t(i18nKeys.page.memories.titleBar.subTitle)}
      />
      <div className="relative min-h-screen bg-gray-50">
        <PageLoading message={'Updating memories'} show={isLoading} />
        <div className="h-[calc(100vh-218px)]  w-full overflow-y-auto overflow-x-hidden px-0 py-8 scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-slate-400 md:px-4">
          {/* Add Memory Button */}
          <div className="mb-8 flex justify-center">
            <Button
              onClick={() => openDialog()}
              className="flex items-center gap-2"
            >
              <PlusCircle className="size-5" />
              Add a Memory
            </Button>
          </div>

          {/* Masonic Masonry Layout */}
          <div className="container mx-auto max-w-screen-xl">
            <div className="mx-auto hidden md:block">
              {memories.length > 0 ? (
                <Masonry
                  maxColumnCount={3}
                  items={memories}
                  columnGutter={16} // Space between items
                  columnWidth={320} // Minimum width for each column
                  render={renderMemoryCard}
                />
              ) : (
                <p className="text-center text-gray-500">
                  No memories yet. Add one!
                </p>
              )}
            </div>
            <div className="mx-auto flex flex-col items-center md:hidden">
              {memories.map((mem) => renderMemoryCard({ data: mem }))}
            </div>
          </div>

          {/* Memory Form Dialog */}
          {isDialogOpen && (
            <MemoryForm
              memory={editingMemory || undefined}
              onClose={closeDialog}
              onSave={handleSaveMemory}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default MemoryWall

function createMemWithLinks(
  memory: MemoryFormObject,
  currentUID: string | undefined,
  imageLinks: string[]
): Memory {
  return {
    text: memory.text,
    author: memory.author,
    title: memory.title,
    uid: currentUID || '',
    id: memory.id,
    images: imageLinks,
    lang: detectLanguage(memory.text)
  }
}

async function deleteCurrentImages(imagesLinks: string[]) {
  for (const imageUrl of imagesLinks) {
    const location = getLocationFromFirebaseUrl(imageUrl)
    if (location) {
      await deleteByLocation(location)
    }
  }
}

// For each image, if it has a file property, upload it using the external service.
async function uploadImages(
  uid: string | null,
  memObject: MemoryFormObject
): Promise<string[]> {
  const images = memObject.images
  if (images === undefined) return []
  const uploadedUrls = await Promise.all(
    images.map(async (img: MemoryImage) => {
      if (img.file) {
        if (uid) return await uploadUserMedia(uid, img.file)
      } else {
        // If there's no file, assume the image is already uploaded.
        return img.preview
      }
    })
  )
  const filteredUrls: string[] = uploadedUrls.filter(
    (url): url is string => url !== undefined
  )

  return filteredUrls || []
}
