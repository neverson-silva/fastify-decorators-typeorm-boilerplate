# Stage 1: Transpilar o código TypeScript
FROM node:16-alpine AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de configuração e dependências
COPY package.json yarn.lock tsconfig.json ./

# Instala as dependências
RUN yarn install 

# Copia o código-fonte da aplicação
COPY . .

# Compila o código TypeScript usando SWC
RUN yarn build


# Stage 2: Criar o container de produção
FROM node:16-alpine

# Instala o utilitário curl
RUN apk add --no-cache curl

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o diretório 'dist' gerado no estágio anterior
COPY --from=builder /app/dist ./dist

# Copia os arquivos de configuração e dependências
COPY package.json yarn.lock ./

# Instala as dependências
RUN yarn install --frozen-lockfile --production

# Expõe a porta em que a aplicação será executada
EXPOSE 9090

# Define o comando de inicialização da aplicação
CMD ["yarn", "start"]
