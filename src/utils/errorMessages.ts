export const ErrorMessages = {
  USERNAME_EXISTS: 'Ja existe um usuario com esse identificador.',
  INVALID_PASSWORD:'A senha informada e invalida. Revise os requisitos e tente novamente.',
  CODE_MISMATCH: 'Codigo invalido. Confira o codigo e tente novamente.',
  INVALID_CREDENTIALS: 'Credenciais invalidas.',
  USER_NOT_CONFIRMED: 'Usuario ainda nao confirmado.',
  USER_NOT_FOUND: 'Usuario nao encontrado.',
  EXPIRED_CODE: 'Codigo expirado. Solicite um novo codigo.',
  LIMIT_EXCEEDED: 'Limite excedido. Tente novamente mais tarde.',
  TOO_MANY_REQUESTS: 'Muitas requisicoes em pouco tempo. Tente novamente mais tarde.',
  VALIDATION_ERROR: 'Dados invalidos para esta operacao.',
  ACCESS_DENIED: 'Acesso negado para executar esta acao.',
  RESOURCE_NOT_FOUND: 'Recurso nao encontrado.',
  CONFLICT: 'Conflito de estado ao executar a operacao.',
  TOKEN_EXPIRED: 'Sessao expirada. Faca login novamente.',
  SERVICE_UNAVAILABLE:'Servico temporariamente indisponivel. Tente novamente em instantes.',
  INTERNAL_SERVER_ERROR: 'Erro interno do servidor.',
} as const;

export type ErrorMessageKey = keyof typeof ErrorMessages;
