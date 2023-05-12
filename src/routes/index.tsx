import React, { useEffect } from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'
import { useDrawerContext } from '../shared/contexts'
import { Dashboard } from '../pages'
export const AppRoutes: React.FC = () => {
  const { setDrawerOptions } = useDrawerContext()

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
