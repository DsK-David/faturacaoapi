// Importação do módulo Express para criar o servidor web
import express from "express";
import dotenv from "dotenv"
dotenv.config()
import { v4 as uuidv4 } from "uuid";
import { createServer } from "http";
// Importação de funções para interagir com o banco de dados
import {
  mostrarClientePorEntidade,
  mostrarClientes,
} from "../repositories/cliente.js";
import mostrarTodoCliente from "../controller/mostrarTodoCliente.js";
import mostrarTodoProduto from "../controller/mostrarTodoProduto.js";
import { entidade } from "../repositories/entidade.js";
import { auth } from "../repositories/login.js";
import {
  mostrarProdutoPeloNome,
  mostrarProdutoPorBarCode,
  mostrarProdutoPorCategoria,
  mostrarProdutoPorEntidade,
} from "../repositories/produto.js";
import mostrarTodaCategoria from "../controller/mostrarTodaCategoria.js";
import { mostrarCategoriaPorEntidade } from "../repositories/categorias.js";
import { mostrarTodaVendaPorEntidade } from "../repositories/vendas.js";

// Criação da instância do aplicativo Express
const app = express();
const server = createServer(app);
function generateApiKey(){
  return uuidv4()
}
function verifyApiKey(req,res,next){
  const apikey = req.headers["authorization"]
  const validApiKey=process.env.APIKEY

  if(!apikey || apikey !== validApiKey){
    return res.status(401).json({message:"a chave da api esta faltando"})
  }
  next()
}


// Configuração do middleware para analisar corpos de requisições HTTP com formato JSON
app.use(express.json());



// Rota raiz que retorna uma mensagem simples "Hello World!"
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Endpoint para retornar todos os clientes
app.get("/api/v1/cliente",verifyApiKey, mostrarTodoCliente);

// Endpoint para buscar todos os clientes de uma entidade 
app.get("/api/v1/cliente/:entidadeID", async (req, res) => {
  const { entidadeID } = req.params;
  try {
    const cliente = await mostrarClientePorEntidade(entidadeID);
    res.send(cliente);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint para retornar todos os produtos
app.get("/api/v1/produto",verifyApiKey, mostrarTodoProduto);

// Endpoint para buscar um produto específico pelo ID da entidade
app.get("/api/v1/produto/:entidadeID", async (req, res) => {
  const { entidadeID } = req.params;
  try {
    const produto = await mostrarProdutoPorEntidade(entidadeID);
    res.send(produto);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint para buscar um produto pelo seu código de barras
app.get("/api/v1/produto/barcode/:barcode", async (req, res) => {
  const { barcode } = req.params;
  try {
    const produto = await mostrarProdutoPorBarCode(barcode);

   
    if (produto === undefined) {
      return res.status(404).send({ message: "Produto não encontrado" });
    }

    res.send(produto);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


// Endpoint para buscar um produto pelo nome
app.get("/api/v1/produto/nome/:produto_nome/:entidadeID", async (req, res) => {
  const { produto_nome,entidadeID } = req.params;
  try {
    const produto = await mostrarProdutoPeloNome(produto_nome,entidadeID);
    if (produto === undefined) {
      res.send({ message: "Usuario não encontrado" });
    }
    res.send(produto);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
app.get("/api/v1/produto/categoria/:categoriaID", async (req, res) => {
  const { categoriaID } = req.params;
  try {
    const produto = await mostrarProdutoPorCategoria(categoriaID);
    if (produto === undefined) {
      res.send({ message: "Usuario não encontrado" });
    }
    res.send(produto);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint para autenticar um usuário com base no nome de usuário e senha
app.get("/api/v1/auth/:username/:password", async (req, res) => {
  const { username, password } = req.params;
  try {
    const user = await auth(username, password);
    if(user.length=== 0){
    throw new Error("Nome de Usuario ou Senha incorretos") 
    }
    else{
      res.send(user);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint para buscar informações sobre uma entidade específica pelo ID
app.get("/api/v1/entidade/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await entidade(id);
    if (user === undefined) {
      res.send({ message: "Usuario não encontrado" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint para retornar todas as categorias
app.get("/api/v1/categoria", mostrarTodaCategoria);

// Endpoint para buscar uma categoria específica pelo ID
app.get("/api/v1/categoria/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const categroia = await mostrarCategoriaPorEntidade(id);
    if (categroia === undefined) {
      res.send({ message: "Usuario não encontrado" });
    }
    res.send(categroia);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint para buscar todas as vendas associadas a uma entidade específica pelo ID
app.get("/api/v1/vendas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const vendas = await mostrarTodaVendaPorEntidade(id);
    if (vendas === undefined) {
      res.send({ message: "Usuario não encontrado" });
    }
    res.send(vendas);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Porta na qual o servidor será iniciado
const PORT =  3000;

// Início do servidor na porta especificada
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
