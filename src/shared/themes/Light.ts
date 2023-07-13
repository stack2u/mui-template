import { createTheme } from '@mui/material'
import { cyan, yellow } from '@mui/material/colors'

export const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1E76B8',
      dark: '#1E76B8',
      light: '#1E76B8',
      contrastText: '#fff',
    },
    secondary: {
      main: '#1F2452',
      dark: '#1F2452',
      light: '#1F2452',
      contrastText: '#fff',
    },
    background: {
      paper: '#fff',
      default: 'rgba(30, 118, 184, 0.1)',
    },
  },
  typography: {
    allVariants: {
      color: '#404051',
    },
  },
})
