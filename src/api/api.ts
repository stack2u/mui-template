import { api } from '../shared/services/api'

import { IResetPassword } from '../shared/dtos'

const forgotPassword = async (email: string) => {
  try {
    const result = await api.post('/forgot-password', { email })

    return result.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const login = async (email: string, password: string) => {
  try {
    const result = await api.post('/login', {
      email,
      password,
    })

    return result.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const resetPassword = async ({ token, password }: IResetPassword) => {
  try {
    const result = await api.patch(`/reset-password/${token}`, { password })

    return result.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

interface ICustomerRegisterProps {
  name: string
  email: string
  whatsapp: string
}

const customerRegister = async (data: ICustomerRegisterProps) => {
  try {
    const result = await api.post('/customer', data)

    return result.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export { login, forgotPassword, resetPassword, customerRegister }
