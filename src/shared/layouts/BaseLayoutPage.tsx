import { Box, useMediaQuery, useTheme } from '@mui/material'

interface IBaseLayoutPageProps {
  children: React.ReactNode
  toolbar?: React.ReactNode
}

export const BaseLayoutPage: React.FC<IBaseLayoutPageProps> = ({
  children,
  toolbar,
}) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      height="calc(100% - 6rem)"
      display="flex"
      flexDirection="column"
      marginTop={9}
    >
      {toolbar && <Box>{toolbar}</Box>}

      <Box marginLeft={smDown ? 2 : 0} overflow="auto">
        {children}
      </Box>
    </Box>
  )
}
