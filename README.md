# 🌐 Faturacao-api-novo-develop-test

## ✨ Visão Geral

Esta API permite a integração de aplicações ao serviço **cvFatura** para automação na emissão de faturas. Com ela, você pode gerenciar **clientes**, **vendas** e **produtos**, além de consultar **categorias** e **entidades**. Ideal para quem busca facilidade em operações **CRUD** (Create, Read, Update, Delete).

## 🚀 Configuração

Siga os passos abaixo para configurar o projeto:

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Execute o servidor:
   ```bash
   npm run API
   ```

## 📋 Endpoints
### 🔐 Auth
#### - Faz authenticação de um usario no sistema

**GET** `/api/v1/auth?username=USERNAME&password=PASSWORD`
- **Parâmetros**:
  - `username`:Nome de Usuario
  - `password`:Senha do Usuario

**Exemplo de Retorno**:
```json
{
  "success": true,
  "msg": "Operação bem sucedida",
  "data": {
    "id": "uuid",
    "username": "nome_do_usuario",
    "codigo": "Password",
    "entidade": "uiid_da_entide"
  }
}
```

### 🧑‍💼 Clientes

#### 🔍 Listar Todos os Clientes
**GET** `/api/v1/cliente/`

**Exemplo de Retorno**:
```json
{
  "success": true,
  "msg": "Operação bem sucedida",
  "data": [
    {
      "id": "uuid",
      "nomeCliente": "Nome do Cliente",
      "numeroCliente": "Numero do Cliente",
      "codigo": "Codigo",
      "tipoCliente": "Tipo de Cliente",
      "endereco": "Endereco",
      "telefone": "Telefone",
      "email": "Email",
      "dataRegistro": "YYYY-MM-DD HH:MM:SS",
      "dataAlteracao": "YYYY-MM-DD HH:MM:SS",
      "estado": "Estado",
      "userId": "UUID do Usuario",
      "entidadeId": "UUID da Entidade"
    }
  ]
}
```
#### 🔍  Buscar CLiente por numero de NIF
**GET** `/api/v1/cliente/nif?nif=NUMERO_NIF`
- **Parâmetros**:
  - `nif`:NIF do cliete

**Exemplo de Retorno**:
```json
{
  "success": true,
  "msg": "Operação bem sucedida",
  "data": [
    {
      "ID": "000189f4-f5b1-a5c0-65b4-90b1b4b0fd5c",
      "FOTO_PERFIL": null,
      "CODIGO": "03409",
      "IND_COLETIVO": "C",
      "DESIG": "Neusa Mendes Gomes",
      "DESCR": null,
      "NIF": "121192024",
      "NUM_CLIENTE": null,
      "EMAIL": "",
      "TELEFONE": "",
      "GEOGRAFIA_ID": null,
      "COORDENADAS": null,
      "ENDERECO": null,
      "DT_REGISTO": "2022-11-10T12:28:42.000Z",
      "DT_ALTERACAO": "2022-11-10T12:28:42.000Z",
      "ESTADO": "A",
      "PESSOA": null,
      "PESSOA_CONTACTO": null,
      "IS_CLIETE_VALIDADO": null,
      "APLICAR_IMPOSTOS": "SIM",
      "MOTIVO_NAO_APLICAR_IMPOSTO": "5",
      "pr_enquadramento_ID": null,
      "glb_user_ID": "9BF4FA24-3C50-40BD-848C-4E8C22FB92A0",
      "Entidade_ID": "A56CA66F-54DB-4953-88FE-47C8C7D653B3"
    }
  ]
}
```

#### 🔍 Buscar Cliente por Entidade
**GET** `/api/v1/cliente/entidade?id="<uuid_entidade>"`

- **Parâmetros**:
  - `id`: UUID da entidade

**Exemplo de Retorno**:
```json
{
  "success": true,
  "msg": "Operação bem sucedida",
  "data": [
    {
      "id": "uuid",
      "nomeCliente": "Nome do Cliente",
      "numeroCliente": "Numero do Cliente",
      "codigo": "Codigo",
      "tipoCliente": "Tipo de Cliente",
      "endereco": "Endereco",
      "telefone": "Telefone",
      "email": "Email",
      "dataRegistro": "YYYY-MM-DD HH:MM:SS",
      "dataAlteracao": "YYYY-MM-DD HH:MM:SS",
      "estado": "Estado",
      "userId": "UUID do Usuario",
      "entidadeId": "UUID da Entidade"
    }
  ]
}
```

#### ➕ Adicionar Cliente
**POST** `/api/v1/cliente/`

**Corpo da Requisição**:
```json
{
  "IND_COLETIVO": "C",
  "CODIGO": "Codigo",
  "DESIG": "Nome",
  "DESCR": "Descricao",
  "NIF": "123456789",
  "NUM_CLIENTE": "Numero",
  "EMAIL": "email@example.com",
  "TELEFONE": "912345678",
  "ENDERECO": "Rua X, Nº Y",
  "DT_REGISTO": "YYYY-MM-DD HH:MM:SS",
  "DT_ALTERACAO": "YYYY-MM-DD HH:MM:SS",
  "ESTADO": "Estado",
  "glb_user_ID": "UUID do Usuario",
  "Entidade_ID": "UUID da Entidade"
}
```

**Exemplo de Retorno**:
```json
{
  "success": true,
  "msg": "Operação bem sucedida",
  "data": {
    "numeroCliente": "Numero",
    "id": "UUID do Cliente"
  }
}
```

#### 🔄 Atualizar Cliente
**PUT** `/api/v1/cliente?id="<UIID_da_entidade>"&entidade="<UIID_da_Entidade>"`

**Parâmetros da Query**:
- `id`: UUID do cliente
- `entidade`: UUID da entidade

**Corpo da Requisição** (dados a serem atualizados):
```json
{
  "IND_COLETIVO": "C",
  "DESIG": "Nome Atualizado",
  "DESCR": "Descricao Atualizada",
  "NIF": "987654321",
  "EMAIL": "novoemail@example.com",
  "TELEFONE": "987654321",
  "ENDERECO": "Rua Y, Nº Z",
  "ESTADO": "Ativo"
}
```

**Exemplo de Retorno**:
```json
{
  "success": true,
  "msg": "Cliente atualizado com sucesso",
  "data":[ {
    "id": "UUID do Cliente",
    "entidadeId": "UUID da Entidade"
  }
]
}
```

#### 🗑️ Deletar Cliente
**DELETE** `/api/v1/cliente?clienteid="<uuid_cliente>"&entidadeid="<uuid_entidade>"`

- **Parâmetros**:
  - `id_cliente`: UUID do cliente
  - `id_entidade`: UUID da entidade

**Exemplo de Retorno**:
```json
{
  "success": true,
  "msg": "Cliente deletado com sucesso",
  "data": null
}
```

---

### 📦 Produtos

#### 🔍 Listar Produtos por Entidade
**GET** `/api/v1/produto/entidade/id=<uuid_entidade>`

- **Parâmetros**:
  - `entidadeID`: UUID da entidade

**Exemplo de Retorno**:
```json
{
  "success": true,
  "msg": "Operação bem sucedida",
  "data": [
    {
      "id": "uuid",
      "nome": "Nome do Produto",
      "descricao": "Descricao",
      "valorUnitario": "Valor Unitario",
      "categoria": "Categoria",
      "entidadeId": "UUID da Entidade"
    }
  ]
}
```

#### 🔍 Buscar Produto por Barcode
**GET** `/api/v1/produto/barcode?code="<123456>"`

- **Parâmetros**:
  - `code`: Código de barras do produto

**Exemplo de Retorno**:
```json
{
  "success": true,
  "msg": "Operação bem sucedida",
  "data": [
    {
      "id": "uuid",
      "nome": "Nome do Produto",
      "descricao": "Descricao",
      "valorUnitario": "Valor Unitario",
      "categoria": "Categoria",
      "entidadeId": "UUID da Entidade"
    }
  ]
}
```

---

### 🛒 Vendas

#### ➕ Criar Nova Venda
**POST** `/api/v1/venda/`

**Corpo da Requisição**:
```json
{
  "Entidade_ID": "UUID da Entidade",
  "UTILIZADOR": "UUID do Usuario",
  "Itens_Comprados": [
    {
      "descricao": "Nome do Produto",
      "quantidade": 1,
      "preco": 10.99
    }
  ],
  "Valor_Total": 10.99,
  "Data_Venda": "YYYY-MM-DDTHH:MM:SS"
}
```

#### 🔍 Listar Vendas
**GET** `/api/v1/venda/`

**Exemplo de Retorno**:
```json
{
  "success": true,
  "msg": "Operação bem sucedida",
  "data": [
    {
      "id": "UUID da Venda",
      "valorTotal": 10.99,
      "itens": [
        {
          "produtoId": "UUID do Produto",
          "quantidade": 1,
          "preco": 10.99
        }
      ],
      "dataVenda": "YYYY-MM-DDTHH:MM:SS",
      "utilizadorId": "UUID do Usuario",
      "entidadeId": "UUID da Entidade"
    }
  ]
}
```

---

### 📌 Observações Finais

Este projeto utiliza **Knex.js** para interação com o banco de dados **MySQL**. As tabelas principais são:

- `cliente`
- `venda`
- `produto`
- `categoria`
- `entidade`

As rotas estão organizadas em:

- `/routes/clienteRoutes.js`
- `/routes/produtoRoutes.js`
- `/routes/vendaRoutes.js`

O template de fatura em PDF está localizado em:  
📄 `src/views/invoice-template.ejs`

---