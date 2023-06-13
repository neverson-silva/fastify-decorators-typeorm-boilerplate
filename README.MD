[# Fastify TypeScript API Template

Este é um boilerplate/template para um projeto backend usando Fastify e TypeScript. O objetivo deste projeto é fornecer uma experiência similar ao NestJS, porém com menos dependências e melhor desempenho.

## Como utilizar

1. Certifique-se de ter o Node.js instalado (versão 16 ou superior).
2. Clone este repositório: `git clone https://github.com/seu-usuario/fastify-typescript-api.git`
3. Acesse o diretório do projeto: `cd fastify-typescript-api`
4. Instale as dependências: `npm install`
5. Inicie a aplicação em modo de desenvolvimento: `npm run dev`

A aplicação será iniciada e estará pronta para receber requisições em `http://localhost:9009`.

## Estrutura do Projeto

```typescript
fastify-typescript-api/
├── src/
│ ├── app/
│ │ ├── controllers/
│ │ │ └── _.controller.ts
│ │ ├── services/
│ │ │ └── _.service.ts
│ │ └── ...
│ ├── infra/
│ │ ├── plugins/
│ │ │ └── _.plugin.ts
│ │ └── ...
│ └── utils/
│ └── _.util.ts
├── ...
├── package.json
├── tsconfig.json
└──
```

- A pasta `src` contém todo o código-fonte do projeto.
- A pasta `app` é onde a lógica de negócio da aplicação reside.
  - A pasta `controllers` contém os controladores (controllers) que definem as rotas da API.
  - A pasta `services` contém os serviços que implementam a lógica de negócio da aplicação.
  - Outros arquivos e pastas relacionados ao aplicativo podem estar presentes.
- A pasta `infra` contém as configurações de infraestrutura do projeto, como plugins personalizados do Fastify.
  - A pasta `plugins` contém os plugins personalizados do Fastify.
  - Outros arquivos e pastas relacionados à infraestrutura podem estar presentes.
- A pasta `utils` contém código utilitário que pode ser usado em todo o projeto.
- Outros arquivos e pastas relacionados ao projeto podem estar presentes.

### Controllers e Handlers

- Todos os controladores (controllers) e handlers devem ser sufixados com `.controller.ts` ou `.handler.ts`. Isso facilita a identificação desses arquivos e a organização do código.

## Decorators

Os decorators fornecidos neste projeto permitem a definição de rotas e outros comportamentos no estilo do TypeScript. Aqui estão os decorators disponíveis:

### `@Controller`

Este decorator é usado para marcar uma classe como um controller. Pode receber uma string como parâmetro representando o caminho do prefixo das rotas, ou um objeto com as propriedades `path` (caminho do prefixo) e `version` (versão da API).

Exemplo de uso:

```typescript
import { Controller } from './decorators'

@Controller('/users')
class UserController {
  // ...
}
```

### `@Get`, `@Post`, `@Put`, `@Delete`, `@Patch`

Estes decorators são usados para definir as rotas dos métodos GET, POST, PUT, DELETE e PATCH, respectivamente. Podem receber uma string opcional representando o caminho da rota.

Exemplo de uso:

```typescript
import { Controller, Get, Post } from './decorators'

@Controller('/users')
class UserController {
  @Get()
  getUsers() {
    // ...
  }

  @Post('/create')
  createUser() {
    // ...
  }
}
```

### `@HttpCode`

Este decorator é usado para definir o código de status HTTP de uma rota. Deve receber um parâmetro do tipo `HttpStatus` (enumerador de códigos de status HTTP).

Exemplo de uso:

```typescript
import { Controller, Get, HttpCode, HttpStatus } from './decorators'

@Controller('/users')
class UserController {
  @Get()
  @HttpCode(HttpStatus.OK)
  getUsers() {
    // ...
  }
}
```

### `@Body`

Este decorator é usado para indicar que um parâmetro de um método de rota é obtido do corpo da requisição.

Exemplo de uso:

```typescript
import { Controller, Post, Body } from './decorators'

@Controller('/users')
class UserController {
  @Post()
  createUser(@Body() user: User) {
    // ...
  }
}
```

### `@Param`

Este decorator é usado para indicar que um parâmetro de um método de rota é obtido de um parâmetro da rota.

Exemplo de uso:

```typescript
import { Controller, Get, Param } from './decorators'

@Controller('/users')
class UserController {
  @Get('/:id')
  getUserById(@Param('id') id: string) {
    // ...
  }
}
```

### `@Query`

Este decorator é usado para indicar que um parâmetro de um método de rota é obtido da querystring da requisição.

Exemplo de uso:

```typescript
import { Controller, Get, Query } from './decorators'

@Controller('/users')
class UserController {
  @Get()
  getUsers(@Query('page') page: number, @Query('limit') limit: number) {
    // ...
  }
}
```

### `@Request`

Este decorator é usado para injetar uma instância de `FastifyRequest` como um parâmetro de um método de rota.

Exemplo de uso:

```typescript
import { Controller, Get, Request } from './decorators'
import { FastifyRequest } from 'fastify'

@Controller('/users')
class UserController {
  @Get()
  getUsers(@Request request: FastifyRequest) {
    // ...
  }
}
```

### `@Response`

Este decorator é usado para injetar uma instância de `FastifyReply` como um parâmetro de um método de rota.

Exemplo de uso:

```typescript
import { Controller, Get, Response } from './decorators'
import { FastifyReply } from 'fastify'

@Controller('/users')
class UserController {
  @Get()
  getUsers(@Response response: FastifyReply) {
    // ...
  }
}
```

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir um pull request para melhorias ou correções de bugs.

## Licença

Este projeto está licenciado sob a licença [MIT](LICENSE).
]

```

```
