import type { IHttpClient } from '@/infra/interfaces/http'
import { type AxiosRequestConfig, type AxiosResponse } from 'axios'

export class FakeHttpClient implements IHttpClient {
  public req: AxiosRequestConfig | undefined
  public result: any

  async request<T = any>(req: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    this.req = req
    return this.result
  }
}
