import { Context } from 'aws-lambda';
import { executeBusinessLogic } from '@/services/example.service';
import { LambdaInput, LambdaOutput } from '@/types/lambda.types';

export const handler = async (
  event: LambdaInput,
  context: Context
): Promise<LambdaOutput> => {
  console.log(
    JSON.stringify({
      requestId: context.awsRequestId,
      functionName: context.functionName,
      event,
    })
  );

  try {
    // START WRITE HERE: validate and transform your event before executing your use case.
    const result = await executeBusinessLogic(event);

    return {
      success: true,
      message: 'Lambda executed successfully.',
      data: result,
    };
  } catch (error) {
    console.error('Unhandled lambda error', error);

    return {
      success: false,
      message: 'Lambda execution failed.',
    };
  }
};
