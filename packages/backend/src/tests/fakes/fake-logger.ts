import type { ILogger } from '@/infra/interfaces/logger'

export class FakeLogger implements ILogger {
  log(message: string): void {
    console.log(message)
  }
  error(err: Error): void {
    console.error(err.message)
  }
}
