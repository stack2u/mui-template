export interface IUser {
  id?: number | null
  cnpj: string
  razao_social: string
  email: string
  phone: string
  created_at?: Date
  updated_at?: Date
  password?: string
  password1?: string
  avatar?: string
}
