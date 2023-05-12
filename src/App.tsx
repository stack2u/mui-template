import React from 'react'

import { BrowserRouter } from 'react-router-dom'

import { AppThemeProvider } from './shared/contexts/ThemeContext'
import { DrawerProvider, AuthProvider } from './shared/contexts'

import { AppRoutes } from './routes'
import { MenuSideBar } from './shared/components'

export const App: React.FC = () => (
  <AuthProvider>
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <MenuSideBar>
            <AppRoutes />
          </MenuSideBar>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  </AuthProvider>
)
