import { useState } from 'react'
import { Masonry } from 'masonic'
import { Button } from '@/components/ui/button'
import { Obituary } from '../../types/components/Obituaries.type'
import { AddObituaryModal } from '../../components/Obituary/ObitModal.component'
import { ObituaryCard } from '../../components/Obituary/ObitCard.component'
import { dbRef, dbUpdate } from '../../services/firebase/realtime.service'
import { useFirebaseRealtimeValue } from '../../utils/hooks/useFirebaseRealTimeData.hook'
import TitleBar from '../../components/TitleBar/TitleBar.component'
import { useToggleKey } from '../../utils/hooks/useToggleKey.hook'
import Show from '../../components/Utils/Show.component'
import { useUser } from '../../services/providers/StoreProvider'
import { i18nKeys } from '../../assets/i18n/keys'
import { useTranslation } from 'react-i18next'

type ObitObject = Record<string, Record<string, Obituary>>

function getObitList(obitObject: ObitObject | null): Obituary[] {
  if (!obitObject) return []

  let allMessages: Obituary[] = []

  Object.entries(obitObject).forEach(([uid, userObituaries]) => {
    const userMessageList = Object.values(userObituaries)
      .flat()
      .map((values: Obituary) => ({ ...values, uid }))

    allMessages = [...allMessages, ...userMessageList]
  })

  return allMessages
}

export const ObituariesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showAdd = useToggleKey({ key: 'Q', ctrl: true })
  const allObitCards = useFirebaseRealtimeValue<ObitObject>(
    dbRef.allObituaries()
  )
  const { t } = useTranslation()
  const obitList = getObitList(allObitCards)
  const userStore = useUser()
  console.log('allObitCards', obitList, showAdd)

  const handleAddObituary = (newObituary: Obituary) => {
    dbUpdate.obituary(newObituary)
    setIsModalOpen(false)
  }

  const renderObituary = ({ data }: { data: Obituary }) => (
    <div key={data.id} className="mb-4 px-4">
      <ObituaryCard data={data} />
    </div>
  )

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <TitleBar
        title={t(i18nKeys.page.obituaries.titleBar.title)}
        subTitle={t(i18nKeys.page.obituaries.titleBar.subTitle)}
      />

      <main className="h-[calc(98vh-240px)]  w-full overflow-y-auto overflow-x-hidden px-0 py-8 scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-slate-400 md:px-4">
        <Show if={showAdd && !!userStore.uid}>
          <div className="mb-8 flex justify-center">
            <Button onClick={() => setIsModalOpen(true)}>Add Obituary</Button>
          </div>
        </Show>
        <div className="mx-auto hidden w-full max-w-7xl md:block">
          <Masonry
            items={obitList}
            render={renderObituary}
            columnGutter={16} // Space between items
            columnWidth={400} // Minimum width for each column
          />
        </div>
        <div className="flex flex-col justify-center md:hidden">
          {obitList.map((obit) => renderObituary({ data: obit }))}
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
