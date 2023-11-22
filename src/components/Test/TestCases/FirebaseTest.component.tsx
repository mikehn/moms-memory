import React, { useState } from 'react'
import { useFirebaseRealtimeValue } from '@/utils/hooks/useFirebaseRealTimeData.hook'
import { dbRef, dbUpdate } from '@/services/firebase/realtime.service'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/utils/hooks/use-toast'
import { TestBox } from '../Test.component'

const FirebaseTest = () => {
  const [num, setNum] = useState(0)
  const [buttonEnabled, setEnabled] = useState(true)
  const dbTestVal = useFirebaseRealtimeValue<string>(dbRef.test('v1'))

  const { toast } = useToast()
  return (
    <TestBox
      title="Firebase Test"
      description="test the firebase realtime database"
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <div className="font-semibold">DB read test value: </div>
          <div>{dbTestVal}</div>
        </div>
        <div className="flex gap-2">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="email"
              defaultValue={num}
              placeholder="Update Value"
              onChange={(e) => {
                const val = Number(e.target.value)
                const isNumber = !isNaN(val)
                setEnabled(isNumber)
                if (isNumber) {
                  setNum(Number(e.target.value))
                }
              }}
            />
            <Button
              disabled={!buttonEnabled}
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                dbUpdate.testV1(Number(num)).catch((e: any) => {
                  console.log(':::', e.message)
                  toast({
                    title: 'Could not update value',
                    description: String(e.message)
                  })
                })
              }}
            >
              update
            </Button>
          </div>
        </div>
      </div>
    </TestBox>
  )
}

export default FirebaseTest
