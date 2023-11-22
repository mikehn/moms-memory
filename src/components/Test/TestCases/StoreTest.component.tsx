import { observer } from 'mobx-react-lite'
import { useUser } from '../../../services/providers/StoreProvider'
import { Button } from '../../ui/button'
import { TestBox } from '../Test.component'

const StoreTest = () => {
  const userStore = useUser()
  return (
    <TestBox
      title="Store Test"
      description="test the mobx store (click should update store and ui)"
    >
      <div className="flex items-center gap-2">
        <Button
          onClick={() => {
            userStore.test.data = 'Success : ' + new Date().toLocaleTimeString()
          }}
        >
          Test Store
        </Button>
        <div>Store test: [{String(userStore.test.data)}]</div>
      </div>
    </TestBox>
  )
}

export default observer(StoreTest)
