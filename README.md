# Backend API - Gerenciamento de Produtos e Categorias

Este é um backend desenvolvido em Node.js usando o framework Express. Ele fornece uma API para gerenciar **produtos** e **categorias**, além de **autenticação de usuários** com JWT. Utiliza o banco de dados MongoDB para armazenar as informações.

## Requisitos

- **Node.js** (recomendado a versão LTS)
- **MongoDB** (pode ser o MongoDB local ou MongoDB Atlas)

## Passos para rodar a aplicação
ㅤ

### 1. Clonar o repositório

Primeiro, clone o repositório do projeto para a sua máquina local:


`git clone https://github.com/VitorGirotto/api_produtos.git`

`cd api_produtos`

ㅤ

### 2. Instalar as dependências

Instale as dependências do projeto com o comando:

`npm install express mongoose bcryptjs jsonwebtoken dotenv`

Após pode estar dando o comando:

`npm install`

Essas dependências são necessárias para o funcionamento da API:


express: Framework para criar o servidor da API.

mongoose: Biblioteca para interagir com o MongoDB.

bcryptjs: Para criptografar as senhas dos usuários.

jsonwebtoken: Para gerar e verificar tokens JWT (autenticação).

dotenv: Para carregar variáveis de ambiente a partir do arquivo .env.

ㅤ

### 3. Instalar o Nodemon (opcional)
Para reiniciar o servidor automaticamente durante o desenvolvimento, você pode instalar o Nodemon:

`npm install --save-dev nodemon`

O Nodemon irá monitorar as alterações no código e reiniciar o servidor quando necessário.

ㅤ

### 4. Configurar o arquivo .env
Dentro do arquivo .env, adicione as variáveis de ambiente:

DB_USER: Nome de usuário para acessar o banco de dados MongoDB.

DB_PASS: Senha do MongoDB.

MONGO_HOST: Host do MongoDB (geralmente, para MongoDB Atlas, será algo como cluster0.mongodb.net).

MONGO_DATABASE: Nome do banco de dados.

SECRET: Chave secreta usada para gerar tokens JWT.

ㅤ

### 5. Rodar o servidor
Para rodar o servidor, use um dos seguintes comandos:

Modo de produção: Caso você queira rodar o servidor normalmente, use o comando:

`npm start`

Modo de desenvolvimento: Caso você esteja desenvolvendo e queira que o servidor reinicie automaticamente ao salvar alterações, use o Nodemon:

`npm run dev`

O servidor vai rodar na porta 3000 por padrão, conforme configurado no arquivo app.js.

ㅤ

### 6. Testar a aplicação
Você pode testar os endpoints da API utilizando uma ferramenta como Postman ou Insomnia.

Alguns exemplos de endpoints que você pode testar:

GET: http://localhost:3000/categories — Retorna a lista de todas as categorias.

GET: http://localhost:3000/products — Retorna a lista de todos os produtos.

POST: http://localhost:3000/categories — Cria uma nova categoria.

POST: http://localhost:3000/products — Cria um novo produto.

POST: http://localhost:3000/auth/login — Faz login do usuário (retorna um token JWT).

npm start: Inicia o servidor em modo de produção.

npm run dev: Inicia o servidor em modo de desenvolvimento com o Nodemon (reinício automático).

npm install: Instala todas as dependências do projeto.

ㅤ

**Dependências**

Este projeto utiliza as seguintes dependências:

express: Framework para construção de APIs.

mongoose: Biblioteca para interação com o MongoDB.

bcryptjs: Para hash de senhas (usado na autenticação).

jsonwebtoken: Para gerar e verificar tokens JWT.

dotenv: Para carregar as variáveis de ambiente de forma segura.
