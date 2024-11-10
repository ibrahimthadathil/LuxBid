import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { Router } from './router/Router'
import { Toaster} from "sonner";
import { Provider } from 'react-redux'
import store from './redux/store/store'
import { ThemeProvider } from './components/theme/theme-provider'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      {/* <PersistGate></PersistGate> */}
      <Toaster richColors position='top-right'/>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={Router}/>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
