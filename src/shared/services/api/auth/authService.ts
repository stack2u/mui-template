import { api } from '../axios-config'

interface ILoginProps {
  email: string
  password: string
}

interface IAuth {
  accessToken: string
}

const auth = async (loginData: ILoginProps): Promise<IAuth | Error> => {
  try {
    const { email, password } = loginData
    const { data } = await api.get('/auth', {
      data: {
        email,
        password,
      },
    })

    if (data) return data

    return new Error('Erro no login')
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao logar')
  }
}

export const authService = { auth }
