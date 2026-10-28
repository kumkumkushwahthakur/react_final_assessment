import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {BrowserRouter} from 'react-router'

const client = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter><QueryClientProvider client = {client}><App /></QueryClientProvider></BrowserRouter>
  </StrictMode>,
)
