import React, { createContext, useCallback, useState, useContext } from 'react'

import { api } from '../services/api'

interface IUser {
  id: string
  name: string
  email: string
  avatar_url: string
}

interface SignInCredencials {
  email: string
  password: string
}

interface AuthContextData {
  user: IUser
  signIn(credentials: SignInCredencials): Promise<void>
  signOut(): void
  updateUser(user: IUser): void
}

interface AuthState {
  token: string
  user: IUser
}

interface AuthProps {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC<AuthProps> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@sgps:token')
    const user = localStorage.getItem('@sgps: user')

    if (token && user) {
      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }: SignInCredencials) => {
    const response = await api.post('/login', {
      email,
      password,
    })

    const { token, user } = response.data

    localStorage.setItem('@sgps:token', token)
    localStorage.setItem('@sgps: user', JSON.stringify(user))

    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@sgps:token')
    localStorage.removeItem('@sgps:user')

    setData({} as AuthState)
  }, [])

  const updateUser = useCallback(
    (user: IUser) => {
      localStorage.setItem('@sgps: user', JSON.stringify(user))

      setData({
        token: data.token,
        user,
      })
    },
    [data.token],
  )

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
