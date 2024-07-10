import { createTheme } from '@mui/material'

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
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
      primary: '#fff',
    },
    background: {
      default: '#423F4D',
      paper: '#28262E',
    },
  },
  typography: {
    allVariants: {
      color: '#fff',
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
