# 🚀 Autoflex Frontend

Interface web para gerenciamento de:

- 📦 Produtos
- 🧱 Matérias-primas
- 🔗 Associação Produto x Matéria-prima
- 📊 Visualização do Plano de Produção

Este projeto consome a **Autoflex API** desenvolvida em NestJS.

---

# 🏗️ Tecnologias Utilizadas

- **React**
- **Vite**
- **TypeScript**
- **TailwindCSS**
- **Redux Toolkit**
- **RTK Query**
- **React Hook Form**
- **Yup**
- **Cypress (Testes E2E)**
- **Fetch via RTK Query**

---

# 📦 Pré-requisitos

- Node.js (v18+ recomendado)
- NPM ou Yarn
- Autoflex API rodando
- Banco de dados configurado

---

# ⚙️ Instalação

## 1️⃣ Instalar dependências

```bash
npm install
```

---

## 2️⃣ Rodar aplicação

Modo desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível em:

```
http://localhost:5173
```

Build para produção:

```bash
npm run build
```

Preview da build:

```bash
npm run preview
```

---

# 🧪 Testes End-to-End (E2E)

O projeto utiliza **Cypress** para testes automatizados de interface.

## 📁 Estrutura

```
cypress/
  e2e/
  support/
  fixtures/
```

---

## ▶️ Rodar Cypress em modo interativo

```bash
npm run cy:open
```

ou

```bash
npx cypress open
```

---

## ▶️ Rodar Cypress em modo headless

```bash
npm run cy:run
```

ou

```bash
npx cypress run
```

---

## 📌 Requisitos para rodar testes

Antes de executar os testes:

1. A aplicação deve estar rodando (`npm run dev`)
2. A Autoflex API deve estar ativa
3. O endpoint de reset de banco para testes deve estar disponível (ex: `/test/reset`)

---

## ✅ O que está sendo testado

- Criação de produto

---

# 🧠 Gerenciamento de Estado

O projeto utiliza:

## Redux Toolkit

Para configuração da store global.

## RTK Query

Para:

- Cache automático
- Invalidação de dados
- Requisições automáticas
- Controle de loading e erro

---

# 🧾 Formulários

Utiliza:

- **React Hook Form**
- **Yup** para validação

---

# 🎨 Estilização

O projeto utiliza **TailwindCSS**.

Principais vantagens:

- Estilo utilitário
- Sem CSS global pesado
- Alta produtividade
- Fácil manutenção

---

# 📊 Funcionalidades Implementadas

✅ CRUD de Produtos
✅ CRUD de Matérias-primas
✅ Associação Produto x Matéria-prima
✅ Plano de Produção
✅ Validação de formulários
✅ Tratamento de erros amigáveis
✅ Testes End-to-End com Cypress (Apenas criação de produto)

---

# 🧩 Funcionalidades Futuras

- Paginação
- Autenticação
- Adição de mais mensagens com feedback
- Integração com CI para rodar testes automaticamente

---

# 👨‍💻 Autor

Desenvolvido por **Nielson Vágno**
