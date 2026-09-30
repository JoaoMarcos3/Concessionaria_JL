# Concessionaria API

API REST para cadastrar marcas, veiculos, clientes e vendas de uma concessionaria.

## Tecnologias

- Node.js
- TypeScript
- Express
- Supabase (PostgreSQL)
- @supabase/supabase-js
- tsx
- Git

## Relacionamentos

- Um Cliente pode ter varias Vendas, e cada Venda pertence a um Cliente.
- Um Veiculo pode aparecer em Vendas, e cada Venda se refere a um Veiculo.

As chaves estrangeiras sao `marca_id`, `veiculo_id` e `cliente_id`. A API retorna `409` quando uma exclusao e bloqueada por registros relacionados.

## Estrutura

```text
src/
  config/       cliente Supabase
  controller/   regras de request e response
  models/       consultas ao banco
  Routes/       rotas da API
  utils/        funcoes de validacao
database/
  schema.sql    script de criacao das tabelas
```

## Instalacao

```bash
git clone https://github.com/JoaoMarcos3/Concessionaria_JL.git
cd Concessionaria_JL
npm install
cp .env.example .env
```

Crie as tabelas executando `database/schema.sql` no SQL Editor do Supabase. Configure no `.env`:

| Variavel | Descricao |
|---|---|
| `SUPABASE_URL` | URL do projeto Supabase |
| `SUPABASE_SECRET_KEY` | Chave secreta do projeto Supabase |
| `PORT` | Porta do servidor (opcional, padrao 3000) |

```bash
npm run dev
```

## Codigos de resposta

| Codigo | Quando acontece |
|---|---|
| 200 | Consulta, atualizacao ou exclusao feita com sucesso |
| 201 | Registro criado com sucesso |
| 400 | Dados invalidos ou relacionamento inexistente |
| 404 | Registro ou rota nao encontrado |
| 409 | Exclusao bloqueada por registros relacionados |
| 500 | Erro interno do servidor |

Todas as respostas de erro usam o formato:

```json
{ "message": "Marca nao encontrada." }
```

## Exemplos de requisicoes

**POST /marcas**

```json
{ "nome": "Toyota", "pais": "Japao", "ativo": true }
```

**PUT /veiculos/:id**

```json
{
  "marca_id": "id-da-marca-aqui",
  "modelo": "Corolla XEi",
  "ano": 2025,
  "preco": 139900,
  "km": 15000,
  "combustivel": "Flex",
  "cor": "Prata",
  "disponivel": false,
  "ativo": true
}
```

**PUT /clientes/:id**

```json
{ "nome": "Maria da Silva", "email": "maria@email.com", "telefone": "(11) 98888-0000", "cpf": "123.456.789-00", "ativo": true }
```

**PUT /vendas/:id**

```json
{ "vendedor": "Joao Marcos", "preco_venda": 138000, "forma_pagamento": "financiamento", "status": "concluida" }
```

Na venda, `veiculo_id` e `cliente_id` nao podem ser alterados. O status aceita `pendente`, `concluida` ou `cancelada`.

## Filtros de veiculos

```text
GET /veiculos?busca=corolla
GET /veiculos?disponivel=true&ordenar=preco_asc
GET /veiculos?marca_id=id-da-marca-aqui
```
