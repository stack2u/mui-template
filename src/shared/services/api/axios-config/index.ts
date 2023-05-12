import axios from 'axios'

import { environment } from '../../../environment'

import {
  errorInterceptor,
  responseInterceptor,
  tokenInterceptor,
} from './interceptors'

const api = axios.create({
  baseURL: environment.BASE_URL,
})

api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
)

api.interceptors.request.use((request) => tokenInterceptor(request))

export { api }
