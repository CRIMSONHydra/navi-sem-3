import { StrictMode } from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { SearchProvider } from './context/Search/SearchContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
