import React from 'react'

import { OpenRoutes } from './OpenRoutes'
import { PrivateRoutes } from './PrivateRoutes'
import { useAuth } from '../shared/hooks/auth'

export const AppRoutes: React.FC = () => {
  const { user } = useAuth()

  if (user) return <PrivateRoutes />

  return <OpenRoutes />
}
