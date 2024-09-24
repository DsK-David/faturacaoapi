import express from "express";
import dotenv from "dotenv"
import { toDataURL } from "qrcode";
dotenv.config()
import { createServer } from "http";
import {
  deletarClientePorEntidade,
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
import { adicionarVenda, mostrarTodaVendaPorEntidade } from "../repositories/vendas.js";
import mostrarTodaVenda from "../controller/mostrarTodaVenda.js";
import path from "path";

import { verifyApiKey } from "../utils/verifyApiKey.js";
import { gerarFaturaPDF } from "../utils/gerarFaturaPDF.js";
import { Server } from "socket.io";
import logger from "../utils/logger.js";
import { fileURLToPath } from "url";
import { adicionarClientePorEntidade } from "../repositories/cliente.js";
import { enviarDadosAoWebHook } from "../utils/enviarDadosAoWebHook.js";
import { cacheMiddleware } from "../utils/cacheMiddleware.js";


const app = express();
const server = createServer(app);
app.set("view engine", "ejs");
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("Client connected");
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
  const logMessage = `${req.method} ${req.url}`;
  logger.info(logMessage);
  io.emit("log", logMessage); // Emitindo log para os clientes conectados
  next();
})

// Configuração do middleware para analisar corpos de requisições HTTP com formato JSON
app.use(express.json());
console.log(process.env.APIKEY)

app.get("/", (req, res) => {
  res.sendFile(__dirname+"/index.html");
});
app.get("/logs", (req, res) => {
  res.sendFile(__dirname + "/logs.html");
});

// Endpoint para retornar todos os clientes
app.get("/api/v1/cliente",verifyApiKey,cacheMiddleware(60), mostrarTodoCliente);

app.post("/api/v1/cliente/", async (req, res) => {
  const { DESIG, EMAIL, TELEFONE, Entidade_ID } = req.body;
  try {
    const cliente = await adicionarClientePorEntidade(
      DESIG,
      EMAIL,
      TELEFONE,
      Entidade_ID
    );
    res.send("cliente adicionado com sucesso");
  }catch (error) {
    res.send({ error: error.message });
  }
});
app.delete("/api/v1/cliente/:clienteID/:entidadeID",async (req,res)=>{
  const { clienteID,entidadeID } = req.params;
  try {
    const cliente = await deletarClientePorEntidade(clienteID, entidadeID);
    res.send({ message:`Cliente com id ${clienteID} foi deletado com sucesso`})
  } catch (error) {
    res.status(500).send({error: error.message})
  }
})
app.get("/api/v1/cliente/:entidadeID",cacheMiddleware(60), async (req, res) => {
  const { entidadeID } = req.params;
  try {
    const cliente = await mostrarClientePorEntidade(entidadeID);
    res.send(cliente);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint para retornar todos os produtos
app.get("/api/v1/produto",cacheMiddleware(60),verifyApiKey, mostrarTodoProduto);

// Endpoint para buscar um produto específico pelo ID da entidade
app.get("/api/v1/produto/:entidadeID",cacheMiddleware(60),async (req, res) => {
  const { entidadeID } = req.params;
  try {
    const produto = await mostrarProdutoPorEntidade(entidadeID);
    res.send(produto);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint para buscar um produto pelo seu código de barras
app.get("/api/v1/produto/barcode/:barcode",verifyApiKey, async (req, res) => {
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
app.get("/api/v1/produto/nome/:produto_nome/:entidadeID",verifyApiKey, async (req, res) => {
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
app.get("/api/v1/produto/categoria/:categoriaID",verifyApiKey, async (req, res) => {
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
app.get("/api/v1/auth/:username/:password",verifyApiKey, async (req, res) => {
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
app.get("/api/v1/entidade/:id",verifyApiKey, async (req, res) => {
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
app.get("/api/v1/categoria", verifyApiKey,mostrarTodaCategoria);

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
app.get("/api/v1/vendas", cacheMiddleware(60), mostrarTodaVenda);
// Endpoint para buscar todas as vendas associadas a uma entidade específica pelo ID
app.get("/api/v1/vendas/:id",verifyApiKey, async (req, res) => {
  const { id } = req.params;
  try {
    const vendas = await mostrarTodaVendaPorEntidade(id);
    if (vendas === undefined) {
      res.send({ message: "vendas não encontrado" });
    }
    res.send(vendas);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
app.post("/api/v1/venda/", async (req, res) => {
  try {
    const { Entidade_ID, UTILIZADOR, Itens_Comprados, Valor_Total } = req.body;

    if (!Entidade_ID || !UTILIZADOR || !Itens_Comprados || !Valor_Total) {
      return res.status(400).json({ error: "Dados da venda incompletos" });
    }

    const venda = await adicionarVenda(Entidade_ID, UTILIZADOR, Itens_Comprados, Valor_Total);
    await gerarFaturaPDF(venda,res);
          enviarDadosAoWebHook(venda)
  } catch (error) {
    console.error("Erro ao registrar venda:", error);
    res.status(500).json({ error: "Erro ao registrar venda" });
  }
});

// Porta na qual o servidor será iniciado
const PORT =  3000;

// Início do servidor na porta especificada
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
