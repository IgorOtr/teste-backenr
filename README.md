# API de Autenticação - Modelo MVC

## Tecnologias utilizadas
- TypeScript
- Express
- Sequelize
- MySQL
- JWT
- Multer

## Endpoints

### POST /register
- Criação de novo usuário

### POST /login
- Autenticação de usuário

### GET /profile/:id
- Retorna os dados de um usuário autenticado

### PUT /update
- Atualiza os dados do usuário

### DELETE /delete
- Remove um usuário do sistema

## Estrutura dos Dados do Usuário
- nome
- email
- senha (criptografada)
- foto de perfil (upload)
- data de nascimento

## Instruções
1. Instale as dependências: `npm install`
2. Configure o banco de dados no arquivo `.env`
3. Rode a aplicação com: `npm run dev`
