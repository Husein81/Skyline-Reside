// eslint-disable-next-line no-unused-vars
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Routers } from 'react-router-dom' 
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './Context/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Routers>
    <AuthProvider>
    <App/>
    </AuthProvider>
  </Routers>
  </React.StrictMode>
)
