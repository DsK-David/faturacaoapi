
# Faturacao-api-novo-develop-test

## Visão Geral

Essa api possibilita clientes interligarem suas aplicações com o serviço de cvFatura, para
emissão automática de faturas. A API permite realizar operações CRUD (Create, Read, Update, Delete) em clientes, vendas e produtos, além de consultar categorias e entidades.

<!-- ## Funcionalidades Principais

- Gerenciamento de clientes
- Gestão de vendas
- Manutenção de produtos
- Consulta de categorias
- Autenticação básica via API Key -->



## Configuração

Para configurar o projeto:

1. Instale as dependências:
   ```
   npm install
   ```

<!-- 2. Configure variáveis de ambiente no arquivo `.env`:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=dsd_david
   DB_PASSWORD=2513
   DB_NAME=faturacao
   ``` -->

2. Execute o servidor:
   ```
   npm testApi
   ```

## Endpoints

### Clientes

#### Listar Todos os Clientes
GET `/api/v1/cliente/`

Retorno:
```json
[
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
```

#### Buscar Cliente por Entidade
GET ` /api/v1/cliente/entidade?id="<uuid_entidade>"`

Parâmetros:
- `entidadeID`: UUID da entidade

Retorno:
```json
[
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
```

#### Adicionar Cliente
POST `/api/v1/cliente/`

Corpo da Requisição:
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

Retorno:
```json
{
  "success": true,
  "msg": "Cliente adicionado com sucesso",
  "data": {
    "numeroCliente": "Numero",
    "id": "UUID do Cliente"
  }
}
```

#### Deletar Cliente
DELETE `/api/v1/cliente?clienteid="<uuid_cliente>"&entidadeid="<uuid_entidade>"`

Parâmetros:
- `id_cliente`: UUID do cliente
- `id_entidade`: UUID da entidade

Retorno:
```json
{
  "message": "Cliente deletado com sucesso"
}
```

### Produtos

#### Listar Produtos por Entidade
GET `/api/v1/produto/entidade/id=<uuid_entidade>`

Parâmetros:
- `entidadeID`: UUID da entidade

Retorno:
```json
[
  {
    "id": "uuid",
    "nome": "Nome do Produto",
    "descricao": "Descricao",
    "valorUnitario": "Valor Unitario",
    "categoria": "Categoria",
    "entidadeId": "UUID da Entidade"
  }
]
```

#### Buscar Produto por Barcode
GET `/api/v1/produto/barcode?code="<123456>"`

Parâmetros:
- `code`: Código de barras do produto

Retorno:
```json
{
  "id": "uuid",
  "nome": "Nome do Produto",
  "descricao": "Descricao",
  "valorUnitario": "Valor Unitario",
  "categoria": "Categoria",
  "entidadeId": "UUID da Entidade"
}
```

<!-- #### Buscar Produtos por Nome e Entidade
GET `/api/v1/produto/nome/<nome>?entidadeID=<uuid_entidade>`

Parâmetros:
- `nome`: Partial do nome do produto
- `entidadeID`: UUID da entidade

Retorno:
```json
[
  {
    "id": "uuid",
    "nome": "Nome do Produto",
    "descricao": "Descricao",
    "valorUnitario": "Valor Unitario",
    "categoria": "Categoria",
    "entidadeId": "UUID da Entidade"
  }
]
``` -->

<!-- ### Vendas

#### Criar Nova Venda
POST `/api/v1/venda/`

Corpo da Requisição:
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

Retorno:
```json
{
  "success": true,
  "msg": "Venda criada com sucesso",
  "data": {
    "id": "UUID da Venda",
    "valorTotal": 10.99,
    "itens": [
      {
        "produtoId": "UUID do Produto",
        "quantidade": 1,
        "preco": 10.99
      }
    ]
  }
}
``` -->

#### Listar Vendas
GET `/api/v1/venda/`

Retorno:
```json
[
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
```

#### Buscar Vendas por Entidade
GET `/api/v1/venda/entidade?id=<uuid_entidade>`

Parâmetros:
- `entidadeID`: UUID da entidade

Retorno:
```json
[
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
```

<!-- ### Autenticação

A autenticação básica é realizada através de uma chave API. Adicione a chave API ao cabeçalho da requisição:

```
Authorization: Bearer sua_chave_api
``` -->

<!-- ## Formato de Dados

Todos os endpoints retornam JSON. Os campos retornados podem variar dependendo do endpoint, mas geralmente incluem:

- `id`: UUID único identificador
- `nome`: Nome do objeto (cliente, produto, venda)
- `descricao`: Descrição detalhada
- `valor`: Preço unitário ou total
- `data`: Data e hora do registro ou atualização
- `estado`: Status do objeto (ativo, inativo, etc.)
- `userId`: UUID do usuário associado
- `entidadeId`: UUID da entidade relacionada -->


## Observações Finais

<!-- Este projeto utiliza Knex.js para interação com o banco de dados MySQL. As tabelas principais são:

- `cliente`
- `venda`
- `produto`
- `categoria`
- `entidade` -->

As rotas são definidas em `/routes/clienteRoutes.js`, `/routes/produtoRoutes.js` e `/routes/vendaRoutes.js`. O template de fatura está localizado em `src/views/invoice-template.ejs`.

<!-- Para obter mais informações sobre como usar cada endpoint específicamente, consulte a documentação completa da API. -->