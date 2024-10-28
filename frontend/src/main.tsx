import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { Router } from './router/Router'
import { Toaster} from "sonner";
import { Provider } from 'react-redux'
import store from './redux/store/store'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster richColors position='top-right'/>
      <RouterProvider router={Router}/>
    </Provider>
  </StrictMode>,
)
