# Test Pick - Framework de Automação de Testes

Test Pick é um aplicativo web para selecionar e compartilhar preferências sobre frameworks de automação de testes. Os usuários podem escolher seu framework favorito, fornecer uma descrição do motivo de sua escolha, e enviar essas informações para um backend que as armazena de forma organizada.

## Tecnologias Utilizadas

- **Next.js** - Framework React para criação de aplicações full-stack.
- **Prisma** - ORM (Object Relational Mapping) para interagir com o banco de dados.
- **Zod** - Schema validation para garantir a integridade dos dados.
- **React Hook Form** - Biblioteca para gerenciamento de formulários.
- **Vercel** - Plataforma de deploy e hosting.
- **Neon DB** Banco de dados relacional em nuvem utilizado para armazenamento de dados.

## Funcionalidades

- Escolher o framework de automação de testes preferido.
- Enviar uma descrição explicando a escolha do framework.
- Submeter o formulário para processamento.
- A resposta é exibida após o envio, com uma animação de carregamento no botão de envio.

## Como Rodar Localmente

### Pré-requisitos

1. **Node.js** e **npm** instalados. Caso ainda não tenha, [baixe e instale o Node.js](https://nodejs.org/).
2. **Prisma** configurado corretamente.

### Passos para Execução

1. Clone o repositório:

   ```bash
   git clone https://github.com/usuario/test-pick.git
   ```

2. Acesse o diretório do projeto:

   ```bash
   cd test-pick
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Configure o arquivo `.env` com as variáveis de ambiente necessárias, como a URL do banco de dados:

   ```bash
   DATABASE_URL="sua-url-do-banco-de-dados"
   ```

5. Execute as migrações do Prisma (caso esteja usando o Prisma):

   ```bash
   npx prisma migrate deploy
   ```

6. Gere o cliente do Prisma:

   ```bash
   npx prisma generate
   ```

7. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

A aplicação estará acessível em `http://localhost:3000`.

## Como Contribuir

Contribuições são bem-vindas! Para colaborar neste projeto, siga os passos abaixo:

1. **Faça um Fork do repositório.**
2. **Crie uma nova branch** para suas alterações:
   ```bash
   git checkout -b nome-da-sua-branch
   ```
3. **Faça suas alterações** e adicione as mudanças:
   ```bash
   git add .
   git commit -m "Descrição das alterações"
   ```
4. **Envie suas alterações**:
   ```bash
   git push origin nome-da-sua-branch
   ```
5. **Abra um Pull Request** explicando as alterações feitas.

## Meu Portfólio

Se você está interessado em conhecer mais sobre meu trabalho e projetos anteriores, confira meu portfólio online: [Portfolio de Cristiano](https://portfolio-qa-cristiano.vercel.app/)

## Licença

Distribuído sob a licença MIT. Veja mais detalhes no arquivo [LICENSE](LICENSE).
