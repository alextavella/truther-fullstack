# Truther Challenge

## 📌 Sobre o projeto

O **Truther Challenge** é um aplicativo mobile com um backend eficiente, desenvolvido para proporcionar uma experiência fluida e segura aos usuários. O projeto utiliza tecnologias modernas tanto no backend quanto no frontend.

Acesse o [LINK](https://lavender-fox-89a.notion.site/Desafio-t-cnico-Truther-Full-Stack-170774770cc180518a7de23e2060d956) para acessar o desafio proposto.

## 🚀 Tecnologias utilizadas

### Backend

- [Node.js](https://nodejs.org/)
- [Fastify](https://www.fastify.io/)
- [Zod](https://zod.dev/)
- [DrizzleORM](https://orm.drizzle.team/)
- [MySQL](https://www.mysql.com/)
- [Axios](https://axios-http.com/)
- [Vitest](https://vitest.dev/) (para testes)

### Mobile

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [@expo/vector-icons](https://docs.expo.dev/guides/icons/)
- [expo-router](https://expo.github.io/router/)
- [expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/)
- [Orval](https://orval.dev/)
- [Zod](https://zod.dev/)
- [Axios](https://axios-http.com/)
- [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/) (para testes)

## 📂 Estrutura do projeto

```
TrutherChallenge/
│-- packages/
│   ├── backend/  # Código do backend
│   ├── mobile/   # Código do aplicativo móvel
│-- .gitignore
│-- README.md
│-- package.json
│-- docker-compose.yml
```

## 🔧 Configuração do ambiente

Para iniciar o projeto, crie os arquivos `.env` nos diretórios `packages/backend` e `packages/mobile` com as configurações necessárias.

### Exemplo de `.env` para o backend (`packages/backend/.env`):

```env
# AUTH
AUTH_SECRET="secret"
# DATABASE
DB_DRIVER="mysql"
DB_HOST="localhost"
DB_PORT=3306
DB_NAME="truther"
DB_USER="root"
DB_PASSWORD="root"
# COINGECKO
COINGECKO_API_URL="https://api.coingecko.com/api/v3"
COINGECKO_TOKEN=""
```

### Exemplo de `.env` para o mobile (`packages/mobile/.env`):

```env
EXPO_PUBLIC_API_URL="http://localhost:3333"
```

## ▶️ Como executar o projeto

### Docker

1. Inicie o banco de dados (mysql):
   ```sh
   docker compose up -d
   ```
2. Execute as migrações:
   ```sh
   pnpm run --filter backend migrate
   ```

### Backend

1. Instale as dependências:
   ```sh
   pnpm install
   ```
2. Execute a aplicação:
   ```sh
   pnpm dev:backend
   ```
3. Acesse:
   ```sh
   http://localhost:3333/docs
   ```

### Mobile

1. Instale as dependências:
   ```sh
   pnpm install
   ```
2. Inicie o aplicativo (ios):
   ```sh
   pnpm dev:mobile
   ```

## 🛠️ Testes

Foram adicionados no diretório **/test** alguns exemplos de requests para a API.

## ✅ Integração Contínua

Foram configuradas **GitHub Actions** para validar Pull Requests automaticamente, garantindo qualidade no código. As validações incluem:

- Execução de testes do backend com Vitest
- Execução de testes do mobile com Jest e Testing Library
- Linters e verificações de estilo de código

## 📹 Demonstração

Aqui está um vídeo demonstrando o aplicativo em ação:

[![Demonstração do Truther Challenge](./docs/truther.png)](https://github.com/alextavella/truther-fullstack/blob/dev/docs/truther.mp4)

## 📜 Licença

Este projeto é distribuído sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter mais detalhes.

---

💡 _Sinta-se à vontade para contribuir ou relatar problemas na seção de issues!_ 🚀
