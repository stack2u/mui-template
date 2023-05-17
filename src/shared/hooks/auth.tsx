import React, { createContext, useCallback, useState, useContext } from 'react'

import { environment } from '../environment'
// import { api } from '../services/api'

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
    const payload = localStorage.getItem(environment.APP_NAME)

    if (payload) {
      console.log(JSON.parse(payload))
      const { token, user } = JSON.parse(payload)

      return { token, user }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }: SignInCredencials) => {
    // const response = await api.post('/login', {
    //   email,
    //   password,
    // })

    // const { token, user } = response.data

    // const payload = {
    //   user,
    //   token,
    // }

    const payload = {
      token: 'iuHAisu-asd23412312-asdasdasda-23123123',
      user: {
        id: '01129',
        name: 'Rodrigo Bighetti',
        email: 'rodrigo@stack2u.net',
        avatar_url: '',
      },
    }

    localStorage.setItem(environment.APP_NAME, JSON.stringify(payload))

    setData({ token: payload.token, user: payload.user })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem(environment.APP_NAME)

    setData({} as AuthState)
  }, [])

  const updateUser = useCallback(
    (user: IUser) => {
      localStorage.setItem(environment.APP_NAME, JSON.stringify(user))

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
