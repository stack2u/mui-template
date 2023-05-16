import React, { useEffect } from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'
import { useDrawer } from '../shared/hooks/drawer'
import { Dashboard } from '../pages'
export const AppRoutes: React.FC = () => {
  const { setDrawerOptions } = useDrawer()

  useEffect(() => {
    setDrawerOptions([
      {
        label: 'Página Inicial',
        icon: 'home',
        path: '/home',
      },
    ])
  }, [setDrawerOptions])

  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  )
}
