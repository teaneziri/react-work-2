import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import LibraryManager from './components/LibraryManager'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LibraryManager/>
    
  </StrictMode>,
)
