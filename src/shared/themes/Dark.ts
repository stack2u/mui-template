import { createTheme } from '@mui/material'

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF9000',
      contrastText: '#fff',
    },
    secondary: {
      main: '#9c741e',
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
      tab: '#333',
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
