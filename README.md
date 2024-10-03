# Faturacao-api-novo-develop-test

Essa api possibilita clientes interligarem suas aplicações com o serviço de cvFatura, para
emissão automática de faturas

## Funcionalidades

- **Gerenciamento de Clientes:** Criar, listar e deletar clientes.
- **Gerenciamento de Produtos:** Listar produtos por nome, código de barras, categoria ou entidade.
- **Gerenciamento de Categorias:** Listar e buscar categorias de produtos.
- **Autenticação de Usuário:** Autenticar usuários com base em nome de usuário e senha.
- **Registro de Vendas:** Registrar vendas e gerar faturas automáticas em PDF.
- **Logs em Tempo Real:** Visualização de logs de requisições em tempo real via WebSocket.
- **Cache:** Implementação de cache para otimizar a resposta dos dados.

## Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **EJS para templates**
- **Socket.io** para logs em tempo real
- **QRCode** para geração de QR codes
- **HTML-PDF** para geração de faturas em PDF
- **Memory Cache** para caching
- **dotenv** para configuração de variáveis de ambiente
- **Knex.js** para interações com banco de dados

## Endpoints

### Cliente

- `GET /api/v1/cliente` - Retorna todos os clientes.
- `POST /api/v1/cliente/` - Adiciona um cliente.
  - Exemplo de body:
    ```json
    {
      "DESIG": "Nome do Cliente",
      "EMAIL": "email@exemplo.com",
      "TELEFONE": "123456789",
      "Entidade_ID": 1
    }
    ```
- `DELETE /api/v1/cliente?clienteid={clienteID}&entidadeid={entidadeID}` - Deleta um cliente por ID de Cliente e ID da Entidade.
- `GET /api/v1/cliente/entidade?id={entidadeeID}` - Retorna os clientes de uma entidade.

### Produto

- `GET /api/v1/produto` - Retorna todos os produtos.
- `GET /api/v1/produto/entidade?id={entidadeID}` - Retorna todo os produtos de uma entidade.
- `GET /api/v1/produto/barcode?code={codigoBarra}` - Busca um produto pelo código de barras.
<!-- - `GET /api/v1/produto/nome/:produto_nome/:entidadeID` - Busca um produto pelo nome. -->
- `GET /api/v1/produto/categoria?id=6328790f-7060-1307-6853-ac3ba10f0064` - Retorna todo os produtos de uma categoria.

<!-- ### Categoria

- `GET /api/v1/categoria` - Retorna todas as categorias.
- `GET /api/v1/categoria/:id` - Retorna uma categoria por ID. -->

### Vendas

- `GET /api/v1/vendas` - Retorna todas as vendas.
- `GET /api/v1/venda/entidade?id={entidadeID}` - Retorna as vendas de uma entidade.
- `POST /api/v1/venda` - Registra uma venda e gera a fatura em PDF.
  - Exemplo de body:
    ```json
    {
      "Entidade_ID": 1,
      "UTILIZADOR": "Nome do Vendedor",
      "Itens_Comprados": "Produto A, Produto B",
      "Valor_Total": 100.00
    }
    ```

### Autenticação

- `GET /api/v1/auth/:username/:password` - Autentica um usuário por nome de usuário e senha.

<!-- ### Entidades

- `GET /api/v1/entidade/:id` - Retorna informações de uma entidade pelo ID. -->

## Logs em Tempo Real

Você pode visualizar os logs das requisições em tempo real acessando a rota `/logs`.

## Instalação

1. Clone o repositório:
    ```bash
    git clone https://gitlab.com/techplace/faturacao-api-novo.git
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

<!-- 3. Configure as variáveis de ambiente no arquivo `.env`:
    ```bash
    APIKEY=your-api-key
    ``` -->

3. Inicie o servidor:
    ```bash
    npm run testApi
    ```

## Dependências

- Express
- dotenv
- Knex
- Socket.io
- QRCode
- HTML-PDF
- Memory Cache

## Uso de WebSocket

A API utiliza WebSocket para emitir logs em tempo real. Conecte-se à rota `/logs` para acompanhar as requisições enquanto o servidor está em execução.

## Autor

- **David Silva** - Desenvolvedor Estagiario
