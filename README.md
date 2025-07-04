# Projeto Cliente - Redes de Computadores

Este projeto é o cliente web desenvolvido para a disciplina de Redes de Computadores, com o objetivo de demonstrar a comunicação HTTP entre um cliente e um servidor. Ele simula um sistema de chat, onde a interação com o backend é realizada através de requisições HTTP.

## Estrutura do Projeto

A estrutura do projeto segue uma organização modular, com componentes, serviços, hooks e adaptadores bem definidos para facilitar a manutenção e o entendimento do fluxo de dados.

## Comunicação HTTP e Integração com o Servidor

O coração da comunicação HTTP neste projeto reside no arquivo `src/adapters/httpClient.ts`. Este módulo é responsável por configurar e gerenciar as requisições HTTP para o servidor backend.

### `src/adapters/httpClient.ts`

Este arquivo utiliza a biblioteca `axios` para realizar as requisições HTTP. Abaixo estão os pontos mais importantes:

-   **Instância do Axios**: Uma instância privada do Axios (`privateBackendInstance`) é criada com uma `baseURL` definida para o servidor de produção:
    ```typescript
    const baseURL: string = "https://server-redes-production.up.railway.app";
    this.privateBackendInstance = axios.create({
      baseURL,
    });
    ```
    Esta URL aponta para o servidor backend da aplicação, que é o foco da integração de redes.

-   **Interceptors (Interceptadores)**:
    -   **Requisição (`request.use`)**: Antes de cada requisição ser enviada, um interceptador verifica se existe um `accessToken` na `useSessionStore`. Se houver, ele é adicionado ao cabeçalho `Authorization` como um token `Bearer`. Isso é fundamental para a autenticação e autorização das requisições, garantindo que apenas usuários autenticados possam acessar certos recursos do servidor.
        ```typescript
        const token = useSessionStore.getState().accessToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        ```
    -   **Resposta (`response.use`)**: Um interceptador de resposta é configurado para tratar erros globalmente. Especificamente, se uma resposta de erro tiver o status `401` (Não Autorizado), a sessão do usuário é resetada (`useSessionStore.getState().reset()`). Isso garante que o cliente reaja apropriadamente a problemas de autenticação, direcionando o usuário para a tela de login ou limpando dados sensíveis.
        ```typescript
        if (error.response && error.response.status === 401) {
          useSessionStore.getState().reset()
          // window.location.href = "/";
        }
        ```

-   **Método `requestPrivateBackend`**: Este método encapsula a lógica de fazer requisições HTTP usando a instância configurada do Axios. Ele lida com a execução da requisição e o tratamento básico de erros, retornando os dados da resposta ou lançando um erro em caso de falha.

### Integração com o Servidor

Os serviços (`src/services/*.ts`) utilizam o `httpClient` para interagir com as APIs do servidor. Por exemplo, `conversationService.ts` ou `userService.ts` farão chamadas para o backend para buscar, criar ou atualizar dados, utilizando a infraestrutura de comunicação definida em `httpClient.ts`.

Essa arquitetura garante que toda a comunicação com o servidor seja centralizada e padronizada, facilitando a depuração e a aplicação de políticas de segurança e autenticação de forma consistente em toda a aplicação cliente. A utilização de interceptadores é um exemplo prático de como o controle sobre o fluxo de requisições e respostas HTTP pode ser implementado em uma aplicação real, um conceito importante em redes de computadores.