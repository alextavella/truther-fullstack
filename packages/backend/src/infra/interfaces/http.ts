import { AxiosRequestConfig, type AxiosResponse } from 'axios'

export const HttpClient = {
  name: 'HttpClient',
}

export interface IHttpClient {
  request<T = any>(request: AxiosRequestConfig): Promise<AxiosResponse<T>>
}
