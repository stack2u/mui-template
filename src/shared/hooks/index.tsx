import React from 'react'

import { AuthProvider } from './auth'
import { DrawerProvider } from './drawer'
import { AppThemeProvider } from './theme'
import { ToastProvider } from './Toast'

interface Props {
  children: React.ReactNode
}

const AppProvider: React.FC<Props> = ({ children }) => (
  <AppThemeProvider>
    <ToastProvider>
      <AuthProvider>
        <DrawerProvider>{children}</DrawerProvider>
      </AuthProvider>
    </ToastProvider>
  </AppThemeProvider>
)

export { AppProvider }
