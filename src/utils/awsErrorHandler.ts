import { ErrorMessages } from '@/utils/errorMessages';

type ErrorCtor = new (...args: any[]) => Error;

interface ErrorDefinition {
  statusCode: number;
  message: string;
}

export interface HandledError {
  statusCode: number;
  body: {
    message: string;
  };
}

const errorNameMap = new Map<string, ErrorDefinition>([
  ['UsernameExistsException', { statusCode: 409, message: ErrorMessages.USERNAME_EXISTS }],
  ['InvalidPasswordException', { statusCode: 400, message: ErrorMessages.INVALID_PASSWORD }],
  ['CodeMismatchException', { statusCode: 400, message: ErrorMessages.CODE_MISMATCH }],
  ['NotAuthorizedException', { statusCode: 401, message: ErrorMessages.INVALID_CREDENTIALS }],
  ['UserNotConfirmedException', { statusCode: 403, message: ErrorMessages.USER_NOT_CONFIRMED }],
  ['UserNotFoundException', { statusCode: 404, message: ErrorMessages.USER_NOT_FOUND }],
  ['ExpiredCodeException', { statusCode: 400, message: ErrorMessages.EXPIRED_CODE }],
  ['LimitExceededException', { statusCode: 429, message: ErrorMessages.LIMIT_EXCEEDED }],
  ['TooManyRequestsException', { statusCode: 429, message: ErrorMessages.TOO_MANY_REQUESTS }],
  ['ValidationException', { statusCode: 400, message: ErrorMessages.VALIDATION_ERROR }],
  ['AccessDeniedException', { statusCode: 403, message: ErrorMessages.ACCESS_DENIED }],
  ['ResourceNotFoundException', { statusCode: 404, message: ErrorMessages.RESOURCE_NOT_FOUND }],
  ['ConditionalCheckFailedException', { statusCode: 409, message: ErrorMessages.CONFLICT }],
  ['ExpiredTokenException', { statusCode: 401, message: ErrorMessages.TOKEN_EXPIRED }],
  ['ServiceUnavailableException', { statusCode: 503, message: ErrorMessages.SERVICE_UNAVAILABLE }],
  ['InternalServerException', { statusCode: 500, message: ErrorMessages.INTERNAL_SERVER_ERROR }],
  ['ThrottlingException', { statusCode: 429, message: ErrorMessages.TOO_MANY_REQUESTS }],
]);

const getErrorName = (error: unknown): string | undefined => {
  if (!error || typeof error !== 'object') {
    return undefined;
  }

  const maybeName = (error as { name?: unknown }).name;
  return typeof maybeName === 'string' ? maybeName : undefined;
};

export function handleAwsError(
  error: unknown,
  constructorMap?: Map<ErrorCtor, ErrorDefinition>
): HandledError {
  if (constructorMap && error instanceof Error) {
    for (const [ErrorType, config] of constructorMap) {
      if (error instanceof ErrorType) {
        return {
          statusCode: config.statusCode,
          body: { message: config.message },
        };
      }
    }
  }

  const errorName = getErrorName(error);

  if (errorName && errorNameMap.has(errorName)) {
    const mapped = errorNameMap.get(errorName)!;
    return {
      statusCode: mapped.statusCode,
      body: { message: mapped.message },
    };
  }

  return {
    statusCode: 500,
    body: {
      message: ErrorMessages.INTERNAL_SERVER_ERROR,
    },
  };
}
