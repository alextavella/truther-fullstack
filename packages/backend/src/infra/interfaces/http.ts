import { AxiosRequestConfig } from 'axios'

export const HttpClient = {
  name: 'HttpClient',
}

export type HttpResponse<T = any> = {
  data: T
  status: number
}

export interface IHttpClient {
  request<T = any>(request: AxiosRequestConfig): Promise<HttpResponse<T>>
}
