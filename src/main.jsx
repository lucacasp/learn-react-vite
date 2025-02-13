localStorage.removeItem('loglevel');
localStorage.removeItem('loglevel:');  // Alcune librerie usano questo formato
localStorage.setItem('loglevel', 'ERROR');  // Imposta un valore di default

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
