import {
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from '@mui/material'

import { useDrawer } from '../hooks/drawer'

interface IBaseLayoutPageProps {
  children: React.ReactNode
  title: string
  toolbar?: React.ReactNode
}

export const BaseLayoutPage: React.FC<IBaseLayoutPageProps> = ({
  children,
  title,
  toolbar,
}) => {
  const theme = useTheme()

  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  const { toggleDrawerOpen } = useDrawer()

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        padding={1}
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography
          variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {title}
        </Typography>
      </Box>

      {toolbar && <Box>{toolbar}</Box>}

      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  )
}
