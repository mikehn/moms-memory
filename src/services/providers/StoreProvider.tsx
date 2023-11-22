import { FC, ReactNode, createContext, useContext } from 'react'
//import { useParams } from 'react-router-dom';
import { RootStore } from 'stores/RootStore'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StoreContext = createContext<any>(null)
const rootStore = new RootStore()

interface StoreProviderProps {
  children: ReactNode
}

const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  const Provider = StoreContext.Provider
  return <Provider value={rootStore}>{children}</Provider>
}

function useUser() {
  const root = useContext<RootStore>(StoreContext)
  return root.userStore
}

export { StoreProvider, useUser }
