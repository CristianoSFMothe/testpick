# Test Pick

Test Pick é uma aplicação construída com **Next.js** que permite aos usuários selecionar e explicar sua preferência por frameworks de automação de testes. A aplicação coleta informações como nome, email, telefone (opcional), descrição e o framework preferido. Essas informações são enviadas para um servidor para posterior processamento.

## Funcionalidades

- Seleção de framework preferido para automação de testes.
- Campo para descrição explicando a escolha do framework.
- Formulário de coleta de dados com validação usando Zod.
- Envio do formulário com feedback visual de carregamento e sucesso/erro.
- Comunicação com backend utilizando Prisma e uma base de dados.

## Tecnologias Utilizadas

- **Next.js**: Framework para React utilizado para criar a aplicação.
- **Prisma**: ORM utilizado para comunicação com o banco de dados.
- **React Hook Form**: Biblioteca para manipulação de formulários com validação.
- **Zod**: Biblioteca para validação de dados no frontend.
- **Lucide-React**: Ícones SVG leves para interfaces de usuário.
- **Vercel**: Plataforma para deployment contínuo.

## Requisitos

- Node.js v16 ou superior.
- Banco de dados configurado (SQLite ou Neon DB recomendado).

## Como Rodar Localmente

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/test-pick.git
cd test-pick
```
