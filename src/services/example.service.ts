import { LambdaInput } from '@/types/lambda.types';

export const executeBusinessLogic = async (
  event: LambdaInput
): Promise<Record<string, unknown>> => {
  // START WRITE HERE: call repositories, services, SDKs, or third-party APIs.
  return {
    receivedEventKeys: Object.keys(event),
    executedAt: new Date().toISOString(),
  };
};
