import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import Cookies from 'js-cookie'

import { authService } from '../services/api'
import { environment } from '../environment'

interface IAuthContextData {
  isAuthenticated: boolean
  logout: () => void
  login: (email: string, password: string) => Promise<string | void>
}

const AuthContext = createContext({} as IAuthContextData)

interface IAuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>()

  useEffect(() => {
    const accessToken = Cookies.get(environment.APP_NAME)
    if (accessToken) {
      setAccessToken(JSON.parse(accessToken))
    } else {
      setAccessToken(undefined)
    }
  }, [])

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await authService.auth({ email, password })

    if (result instanceof Error) return result.message

    setAccessToken(result.accessToken)
    Cookies.set(environment.APP_NAME, JSON.stringify(result.accessToken))
  }, [])

  const handleLogout = useCallback(() => {
    setAccessToken(undefined)
    Cookies.remove(environment.APP_NAME)
  }, [])

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken])
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
