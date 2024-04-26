import React from 'react'

import 'react-toastify/dist/ReactToastify.css'

import { BrowserRouter } from 'react-router-dom'

import { AppProvider } from './shared/hooks'

import { AppRoutes } from './routes'

import './global.css'

export const App: React.FC = () => (
  <AppProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppProvider>
)
