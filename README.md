# Projeto Cliente - Redes de Computadores

Este projeto é o **cliente web** para uma aplicação de chat em tempo real, desenvolvida para a disciplina de Redes de Computadores da Universidade Federal Fluminense. Ele se conecta a uma API backend para fornecer funcionalidades de chat, demonstrando a comunicação HTTP entre cliente e servidor.

## Funcionalidades

- **Autenticação de Usuários**: Faça login e registre-se de forma segura.
- **Gerenciamento de Conversas**: Crie e selecione canais de conversa.
- **Mensagens em Tempo Real**: Envie e visualize mensagens instantaneamente.
- **Gerenciamento de Sessão**: O estado da sessão do usuário é gerenciado de forma eficiente.
- **Integração com API**: Comunicação robusta com o backend para todas as operações.

## Tecnologias Utilizadas

O projeto foi construído com uma stack moderna e performática:

- **[React](https://react.dev/)**: Biblioteca para construção de interfaces de usuário.
- **[Vite](https://vitejs.dev/)**: Ferramenta de build e desenvolvimento frontend.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset de JavaScript com tipagem estática.

## Como executar localmente

Para executar o projeto localmente, siga os seguintes passos:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/Luiznunvoa/client-redes
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

O cliente estará disponível em `http://localhost:5173` (porta padrão do Vite).

## Back-end Implementado para este Cliente

- [Server-Redes](https://github.com/Luiznunvoa/server-redes)

## Comunicação HTTP e Integração com o Servidor

O coração da comunicação HTTP neste projeto reside no arquivo `src/adapters/httpClient.ts`. Este módulo, utilizando `axios`, gerencia todas as requisições para o servidor backend.

-   **Instância do Axios**: Uma instância do Axios é configurada com a `baseURL` do servidor de produção: `https://server-redes-production.up.railway.app`(péssima prática).

-   **Interceptors**:
    -   **Requisição**: Antes de cada requisição, um interceptor anexa o `accessToken` (se disponível) ao cabeçalho `Authorization`, garantindo que o usuário esteja autenticado.
    -   **Resposta**: Um interceptor de resposta trata erros de autenticação (`status 401`), resetando a sessão do usuário para proteger os dados e garantir a consistência do estado.

Essa arquitetura centraliza a comunicação com o servidor, facilitando a manutenção e a aplicação de políticas de segurança de forma consistente.
