import './App.style.css'
import { RouterProvider } from 'react-router-dom'
import AppRoutes from '../AppRoutes/AppRoutes'
import { StoreProvider } from '../../services/providers/StoreProvider'
import { Toaster } from '../../components/ui/toaster'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/assets/i18n/i18n'
import { AuthProvider } from '../../services/providers/AuthProvider'
function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <I18nextProvider i18n={i18n}>
          <div className="relative overflow-hidden bg-slate-50">
            <div className="h-screen">
              <RouterProvider router={AppRoutes} />
              <Toaster />
            </div>
          </div>
        </I18nextProvider>
      </StoreProvider>
    </AuthProvider>
  )
}

export default App