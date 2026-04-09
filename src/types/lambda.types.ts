export type LambdaInput = Record<string, unknown>;

export interface LambdaOutput {
  success: boolean;
  message: string;
  data?: unknown;
}
