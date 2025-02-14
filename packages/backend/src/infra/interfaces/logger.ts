export interface ILogger {
  log(message: string): void
  error(err: Error): void
}
