import type { ILogger } from '../interfaces/logger'

export class Logger implements ILogger {
  public log(message: string) {
    console.log(message)
  }
  public error(err: Error) {
    throw err
  }
}
