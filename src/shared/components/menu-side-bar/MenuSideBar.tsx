/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'

import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

import {
  Icon,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Drawer as DrawerMui,
} from '@mui/material'
import { useDrawer } from '../../hooks/drawer'
import { useLocation } from 'react-router-dom'

import logoBlack from '../../../assets/logo-horizontal-black.png'

import { useAuth } from '../../hooks/auth'
import { Menus } from './Menus'
import { menu } from '../../utils/menu'

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: theme.custom.tab?.main,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    background: theme.custom.tab?.main,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

type IMenuSideBarProps = {
  children: React.ReactNode
}

export const MenuSideBar: React.FC<IMenuSideBarProps> = ({ children }) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const { pathname } = useLocation()

  const [open, setOpen] = useState(true)

  const [title, setTitle] = useState(() => {
    let titleName: any
    menu.forEach((item) =>
      item.items.map((it) => {
        if (it.path === pathname) titleName = it
      }),
    )

    return titleName?.label || 'Bem Vindo'
  })

  const { signOut } = useAuth()

  const { drawerOptions } = useDrawer()

  const handleDrawer = useCallback(() => {
    if (!smDown) return setOpen(true)

    setOpen(!open)
  }, [smDown, open])

  const handleTitle = (titlePage: string) => {
    setTitle(titlePage)
  }

  useEffect(() => {
    handleDrawer()
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={smDown ? false : open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && !smDown && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ color: theme.palette.primary.contrastText }}
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>

      {smDown ? (
        <DrawerMui variant={'temporary'} open={open} onClose={handleDrawer}>
          <DrawerHeader
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src={logoBlack} alt="Stack 2U Inovação Digital" width={140} />
          </DrawerHeader>
          <Divider />
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {drawerOptions.map((menu, index) => (
              <Menus
                key={index}
                title={menu.title}
                icon={menu.icon}
                items={menu.items}
                handleTitle={handleTitle}
                handleDrawer={handleDrawer}
              />
            ))}
          </List>
          <Divider />
          <Box
            flex={1}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box></Box>
            <Box>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  onClick={signOut}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon>logout</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Sair" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Box>
          </Box>
        </DrawerMui>
      ) : (
        <Drawer variant="permanent" open={open} onClose={handleDrawer}>
          <DrawerHeader
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src={logoBlack} alt="Stack 2U Inovação Digital" width={140} />
          </DrawerHeader>
          <Divider />
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {drawerOptions.map((menu, index) => (
              <Menus
                key={index}
                title={menu.title}
                icon={menu.icon}
                items={menu.items}
                handleTitle={handleTitle}
                handleDrawer={handleDrawer}
              />
            ))}
          </List>

          <Box
            flex={1}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box></Box>
            <Box>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  onClick={signOut}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon>logout</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Sair" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Box>
          </Box>
        </Drawer>
      )}

      <Box
        height="100vh"
        flex={1}
        marginLeft={smDown ? 0 : theme.spacing(2)}
        marginRight={smDown ? 0 : theme.spacing(2)}
      >
        {children}
      </Box>
    </Box>
  )
}
