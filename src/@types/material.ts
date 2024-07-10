import { Theme } from '@mui/material/styles'

// Estendendo a interface ThemeOptions para adicionar novas propriedades personalizadas
declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      status?: {
        main: string
        agregado?: string
        frota?: string
        terceiros?: string
        rejeitado?: string
      }
      icon?: {
        main: string
      }
      tab?: {
        main: string
      }
    }
  }
}

// Estendendo a interface ThemeOptions para adicionar novas propriedades personalizadas
declare module '@mui/material/styles' {
  interface ThemeOptions {
    custom: {
      status?: {
        main: string
        agregado?: string
        frota?: string
        terceiros?: string
        rejeitado?: string
      }
      icon?: {
        main: string
      }
      tab?: {
        main: string
      }
    }
  }
}
