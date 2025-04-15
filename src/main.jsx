import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Store } from './Context/Store.jsx'
createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <Store>
    <App />
    </Store>
    </BrowserRouter>

)
