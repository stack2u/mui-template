import React from 'react'

import {
  Avatar,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Icon,
  useMediaQuery,
} from '@mui/material'
import { Box } from '@mui/system'
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom'

import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
} from '../../contexts'

interface IMenuSideBarProps {
  children: React.ReactNode
}

interface IListItemProps {
  label: string
  icon: string
  to: string
  children?: React.ReactNode
  onClick: (() => void) | undefined
}

const ListItemLink: React.FC<IListItemProps> = ({
  to,
  icon,
  label,
  onClick,
}) => {
  const navigate = useNavigate()

  const resolvedPath = useResolvedPath(to)

  const match = useMatch({
    path: resolvedPath.pathname,
    end: false,
  })

  const handleClick = () => {
    navigate(to)
    onClick?.()
  }
  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  )
}

export const MenuSideBar: React.FC<IMenuSideBarProps> = ({ children }) => {
  const theme = useTheme()

  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext()

  const { toggleTheme } = useAppThemeContext()

  const { logout } = useAuthContext()

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? 'temporary' : 'permanent'}
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{
                height: theme.spacing(12),
                width: theme.spacing(12),
              }}
              alt="Remy Sharp"
              src="https://avatars.githubusercontent.com/u/45999236?v=4"
            />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map((drawerOption) => (
                <ListItemLink
                  key={drawerOption.path}
                  to={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>
          <Box>
            <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>
                    {theme.palette.mode === 'dark' ? 'dark_mode' : 'light_mode'}
                  </Icon>
                </ListItemIcon>
                <ListItemText primary="Mudar tema" />
              </ListItemButton>

              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <Icon>logout</Icon>
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  )
}
