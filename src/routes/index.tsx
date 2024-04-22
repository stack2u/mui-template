import React from 'react'
import { jwtDecode } from 'jwt-decode'

import { OpenRoutes } from './OpenRoutes'
import { PrivateRoutes } from './PrivateRoutes'
import { useAuth } from '../shared/hooks/auth'

export const AppRoutes: React.FC = () => {
  const { user, token } = useAuth()

  if (token) {
    const decoded: any = jwtDecode(token)

    if (user && decoded.exp >= new Date().getTime() / 1000)
      return <PrivateRoutes />
  }

  return <OpenRoutes />
}
