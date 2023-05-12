import { AxiosRequestConfig } from 'axios'

export const tokenInterceptor = (request: AxiosRequestConfig) => {
  const token = localStorage.getItem('@palitan:token')

  if (token && request.headers) {
    request.headers.Authorization = `Bearer ${token}`
  }
  return request
}
