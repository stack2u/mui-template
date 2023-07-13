import React from 'react'
import jwt from 'jwt-decode'

import { OpenRoutes } from './OpenRoutes'
import { PrivateRoutes } from './PrivateRoutes'
import { useAuth } from '../shared/hooks/auth'

export const AppRoutes: React.FC = () => {
  const { user, token } = useAuth()

  if (token) {
    const decoded: any = jwt(token)

    if (user && decoded.exp >= new Date().getTime() / 1000)
      return <PrivateRoutes />
  }

  return <OpenRoutes />
}
