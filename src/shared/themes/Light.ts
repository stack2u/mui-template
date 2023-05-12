import { createTheme } from '@mui/material'
import { cyan, yellow } from '@mui/material/colors'

export const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: yellow[700],
      dark: yellow[800],
      light: yellow[500],
      contrastText: '#fff',
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: '#fff',
    },
    background: {
      paper: '#fff',
      default: '#f7f6f3',
    },
  },
  typography: {
    allVariants: {
      color: 'black',
    },
  },
})
