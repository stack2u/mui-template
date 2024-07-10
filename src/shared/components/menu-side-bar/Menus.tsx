import {
  Collapse,
  Icon,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

import { Fragment, useState } from 'react'
import { IMenuProps } from '../../hooks/drawer'
import { SubMenus } from './SubMenus'

type IProps = {
  title: string
  icon: string
  items: IMenuProps[]
  handleTitle: (title: string) => void
  handleDrawer: (value: boolean) => void | undefined
}

export const Menus: React.FC<IProps> = ({
  title,
  icon,
  items,
  handleTitle,
  handleDrawer,
}) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const [openSubMenu, setOpenSubMenu] = useState(false)

  const handleSubMenu = () => {
    setOpenSubMenu(!openSubMenu)
  }

  return (
    <Fragment>
      <ListItemButton onClick={handleSubMenu}>
        <ListItemIcon>
          <Icon>{icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={title} />
        {openSubMenu ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
        {items.map((item, index) => (
          <SubMenus
            key={index}
            icon={item.icon}
            label={item.label}
            path={item.path}
            handleTitle={handleTitle}
            handleDrawer={handleDrawer}
            onClick={smDown ? handleSubMenu : undefined}
          />
        ))}
      </Collapse>
    </Fragment>
  )
}
