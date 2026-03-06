import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './assets/css/globals.css'
import RouterConfig from './routers/RouterConfig'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterConfig/>
  </StrictMode>,
)
