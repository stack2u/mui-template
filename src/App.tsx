import React from 'react'

import { BrowserRouter } from 'react-router-dom'

import { AppProvider } from './shared/hooks'

import { AppRoutes } from './routes'
import { MenuSideBar } from './shared/components'

export const App: React.FC = () => (
  <AppProvider>
    <BrowserRouter>
      <MenuSideBar>
        <AppRoutes />
      </MenuSideBar>
    </BrowserRouter>
  </AppProvider>
)
