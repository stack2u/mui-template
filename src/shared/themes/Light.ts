import { createTheme } from '@mui/material'

export const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#fff',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fff',
      light: 'rgba(31, 36, 82, 0.2)',
      contrastText: '#fff',
    },
    text: {
      primary: '#333',
      secondary: '#555',
    },
    background: {
      default: '#fff',
      paper: '#c3c3c3c3',
    },
  },
  typography: {
    allVariants: {
      color: '#404051',
    },
  },
  custom: {
    tab: {
      tab: '#fff',
    },
    status: {
      main: '#333',
      agregado: '#014071',
      frota: '#75B0DE',
      terceiros: '#005BA3',
      rejeitado: '#e847475e',
    },
    icon: {
      main: '#014071',
    },
  },
})
