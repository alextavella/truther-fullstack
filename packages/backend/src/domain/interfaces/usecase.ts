export interface UseCase<I = any, O = any> {
  execute(args: I): Promise<O>
}
