# Lightweight AWS Lambda TypeScript starter by yas

![Node](https://img.shields.io/badge/node-20-green)
![TypeScript](https://img.shields.io/badge/typescript-ready-blue)
![AWS Lambda](https://img.shields.io/badge/aws-lambda-orange)

Template base para criar handlers AWS Lambda em TypeScript, sem acoplamento a SES ou qualquer caso de uso especifico.

## Objetivo

Este repositorio foi simplificado para funcionar como ponto de partida de qualquer Lambda:
- Estrutura minima e organizada
- Handler com comentarios de inicio rapido (`START WRITE HERE`)
- Build TypeScript pronto para deploy
- Workflow GitHub Actions para deploy automatico na Lambda

## Estrutura

```txt
.
├── .github/
│   └── workflows/
│       └── lambda_deploy.yml
├── src/
│   ├── index.ts
│   ├── services/
│   │   └── example.service.ts
│   ├── utils/
│   │   ├── awsErrorHandler.ts
│   │   └── errorMessages.ts
│   └── types/
│       └── lambda.types.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Como usar

1. Instale dependencias:

```bash
npm install
```

2. Rode em modo desenvolvimento:

```bash
npm run dev
```

3. Valide tipagem:

```bash
npm run typecheck
```

4. Gere build para deploy:

```bash
npm run build
```

## Onde escrever sua regra de negocio

- Handler principal: `src/index.ts`
- Regra de negocio/external services: `src/services/example.service.ts`
- Tipos de entrada/saida da lambda: `src/types/lambda.types.ts`

Voce ja encontra comentarios com `START WRITE HERE` nos pontos ideais para comecar.

## Utilitario de erros AWS

O template inclui um utilitario para mapear erros padrao da AWS e Cognito para status code HTTP e mensagens em portugues:

- `src/utils/errorMessages.ts`
- `src/utils/awsErrorHandler.ts`

Exemplo de uso:

```ts
import { handleAwsError } from '@/utils/awsErrorHandler';

try {
	// sua logica aqui
} catch (error) {
	const mappedError = handleAwsError(error);

	return {
		statusCode: mappedError.statusCode,
		body: mappedError.body,
	};
}
```

## Deploy automatico (GitHub Actions)

O workflow `.github/workflows/lambda_deploy.yml` executa em push para `main` e tambem via disparo manual.

Fluxo do pipeline:
1. Checkout do codigo
2. Setup Node.js 20
3. Instalacao de dependencias
4. Build TypeScript
5. Geracao do `bundle.zip`
6. Deploy com `aws lambda update-function-code`

### Secrets necessarios no GitHub

Configure os seguintes secrets no repositorio:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `AWS_LAMBDA_FUNCTION_NAME`

## Observacoes importantes

- Este template nao inclui bibliotecas de dominio (ex.: SES, SQS, DynamoDB).
- Adicione apenas as dependencias necessarias para cada novo projeto.
- O retorno atual do handler e generico (`success`, `message`, `data`). Ajuste conforme sua integracao (API Gateway, SQS, EventBridge etc.).

## Proximos passos sugeridos

- Criar testes unitarios para `src/services`
- Adicionar lint/format (ESLint + Prettier)
- Definir estrategia de versionamento e release
