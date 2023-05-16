import React from 'react'

import { AuthProvider } from './auth'
import { DrawerProvider } from './drawer'
import { AppThemeProvider } from './theme'

interface Props {
  children: React.ReactNode
}

const AppProvider: React.FC<Props> = ({ children }) => (
  <AppThemeProvider>
    <AuthProvider>
      <DrawerProvider>{children}</DrawerProvider>
    </AuthProvider>
  </AppThemeProvider>
)

export { AppProvider }
