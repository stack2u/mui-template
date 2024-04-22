import { environment } from '../../../../environment'

export const tokenInterceptor = (request: any) => {
  const token = localStorage.getItem(environment.APP_NAME)

  if (token && request.headers) {
    request.headers.Authorization = `Bearer ${token}`
  }
  return request
}
