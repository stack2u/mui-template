import React, { useEffect } from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'
import { useDrawer } from '../shared/hooks/drawer'
import {
  Dashboard,
  PageExemple,
  User,
  Analytics,
  Configurations,
} from '../pages'

import { MenuSideBar } from '../shared/components'
import { menu } from '../shared/utils/menu'

export const PrivateRoutes: React.FC = () => {
  const { setDrawerOptions } = useDrawer()

  useEffect(() => {
    setDrawerOptions(menu)
  }, [setDrawerOptions])

  return (
    <MenuSideBar>
      <Routes>
        <Route path="/home" element={<Dashboard />} />
        <Route path="/page-example" element={<PageExemple />} />
        <Route path="/users" element={<User />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/configs" element={<Configurations />} />

        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </MenuSideBar>
  )
}
