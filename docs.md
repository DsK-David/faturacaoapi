
#### Documentação do API

# Listar todos os clientes:
`http://localhost:3000/api/v1/cliente/`


# Listar todos os clientes de uma entidade específica:
Parâmetro - entidade_ID
`http://localhost:3000/api/v1/cliente/:entidadeID`


# Listar todos os produtos:
`http://localhost:3000/api/v1/produto/`

# Listar um produto específico através da entidade:
Parâmetro - entidade_ID
`http://localhosr:3000/api/v1/produto/:entidadeID`


# Listar um produto pelo seu código de barras:
Parâmetro - Codigo_barra
`http://localhost:3000/api/v1/produto/barcode/:barcode`


# Listar um produto pelo seu nome:
Parâmetro - produto_mome
`http://localhost:3000/api/v1/produto/nome/:produto_nome`

# Autenticar um usuário com base no nome de usuário e senha:
Parâmetro - username, password
`http://localhost:3000/api/v1/auth/:username/:password`


# Buscar informações sobre uma entidade específica:
Parâmetro - entidade_ID
`http://localhost:3000/api/v1/entidade/:id`


# Listar todas as categorias:
`http://localhost:3000/api/v1/categoria`


# Listar as castegorias de uma entidade especifíca:
Parâmetro - entidade_ID
`http://localhost:3000/api/v1/categoria/:id`


# Listar todas as vendas associadas a uma entidade específica:
Parâmetro - entidade_ID
`http://localhost:3000/api/v1/vendas/:id`






