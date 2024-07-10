import {
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import { IMenuProps } from '../../hooks/drawer'
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom'

interface IProps extends IMenuProps {
  handleTitle: (title: string) => void
  onClick: (() => void) | undefined
  handleDrawer: (value: boolean) => void
}

export const SubMenus: React.FC<IProps> = ({
  icon,
  label,
  path,
  handleTitle,
  onClick,
  handleDrawer,
}) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const navigate = useNavigate()
  const resolvedPath = useResolvedPath(path)

  const match = useMatch({
    path: resolvedPath.pathname,
    end: false,
  })

  const handleClick = () => {
    handleTitle(label)

    if (smDown) handleDrawer(false)

    navigate(path)
    onClick?.()
  }

  return (
    <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 4 }} onClick={handleClick} selected={!!match}>
        <ListItemIcon>
          <Icon>{icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </List>
  )
}
