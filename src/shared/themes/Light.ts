import { createTheme } from '@mui/material'

export const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#55368B',
      light: '#9986B9',
      contrastText: '#fff',
    },
    secondary: {
      main: '#F0801E',
      light: '#F8A629',
      contrastText: '#fff',
    },
    text: {
      primary: '#333',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
  },
  typography: {
    allVariants: {
      color: '#333',
    },
  },
  custom: {
    tab: {
      main: '#333',
    },
    icon: {
      main: '#014071',
    },
  },
})
