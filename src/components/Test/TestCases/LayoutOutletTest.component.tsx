import React from 'react'
import { TestBox } from '../Test.component'
import { useOutletContext } from 'react-router-dom'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

const LayoutOutletTest = () => {
  const { setMessage, message } = useOutletContext<{
    setMessage: React.Dispatch<React.SetStateAction<string>>
    message: string
  }>() // Access the context
  return (
    <TestBox
      title="Layout outlet test"
      description="test that sub component can pass info to layouts, look at the bell in the header"
    >
      <div className="flex items-center">
        <Switch
          id="test-outlet"
          defaultChecked={!!message}
          onCheckedChange={(e) => {
            console.log('::', setMessage)
            setMessage(e ? 'Layout Test Passed' : '')
          }}
        />
        <Label htmlFor="test-outlet" className="pl-2">
          Activate message
        </Label>
      </div>
    </TestBox>
  )
}

export default LayoutOutletTest
