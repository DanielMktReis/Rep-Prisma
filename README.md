# 📚 Projeto Sistema de Doação de Livros

## Nomes dos Alunos
- Daniel Reis 
- Davi Lamounier  
- Antônio Arcelino 

---

## Resumo do Projeto
O projeto é um sistema de doação e solicitação de livros, onde usuários podem cadastrar-se, realizar doações e solicitar obras disponíveis.  
Ele demonstra de forma prática como organizar dados e relacionamentos entre entidades utilizando **Prisma** com **MongoDB**.

---

## Schemas

O sistema foi modelado no arquivo **`schema.prisma`**, contendo quatro entidades principais:  

### User
- Representa um usuário do sistema.  
- Atributos principais: `email`, `password`, `name`, `createdAt`.  
- Relações:
  - Pode ter várias donations (doações realizadas).  
  - Pode ter várias requests (solicitações feitas).  

### Book
- Representa um livro cadastrado.  
- Atributos principais: `title`, `author`, `genre`, `condition`, `description`, `createdAt`.  
- Relações:
  - Pode estar vinculado a várias donations (quando doado por um usuário).  
  - Pode aparecer em várias requests (quando solicitado).  

### Donation
- Representa uma doação de livro feita por um usuário.  
- Atributos principais: `status`, `createdAt`.  
- Relações:
  - Ligado a um User (quem doou).  
  - Ligado a um Book (o livro doado).  
  - Pode ter várias requests (solicitações daquele livro).  

### Request
- Representa uma solicitação feita por um usuário para receber um livro.  
- Atributos principais: `message`, `status`, `createdAt`.  
- Relações:
  - Ligado a um User (quem solicitou).  
  - Ligado a um Book (o livro desejado).  
  - Ligado a uma Donation (qual doação está sendo solicitada).  

> 💡 **Justificativa das escolhas**:  
> O modelo foi dividido em quatro entidades para permitir flexibilidade e clareza nos relacionamentos.  
> Assim, conseguimos controlar todo o fluxo de doação → solicitação → status, mantendo histórico e integridade dos dados.


## 🎯 Tema do Projeto
O tema foi escolhido para estimular a leitura e o compartilhamento de livros, criando uma plataforma simples e acessível de doação solidária.  
A proposta conecta pessoas que querem doar livros a outras que desejam recebê-los, promovendo impacto social positivo.

---

## Comandos para Rodar o Projeto

### Clonar o repositório
```bash
git clone <url-do-repositorio>
cd <pasta-do-projeto>
npm install

# Configurar o banco de dados (crie um arquivo .env na raiz do projeto)
# Exemplo de configuração do MongoDB:
DATABASE_URL="mongodb+srv://davimurta_db_user:m3RRTzUsokb39ZeX@cluster0.qiijqlg.mongodb.net/doacoes_livros?retryWrites=true&w=majority"

# Criar as tabelas/coleções no banco
npx prisma db push

# Executar o script de demonstração
npx ts-node script.ts
