import express from "express";
import dotenv from "dotenv";
import { toDataURL } from "qrcode";
import { createServer } from "http";
import path from "path";
import ejs from "ejs";
import pdf from "html-pdf";
import fs from "fs";
import { fileURLToPath } from "url";
import cache from "memory-cache"; // Biblioteca de cache
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
import adicionarClientePorEntidade from "../controller/adicionarClientePorEntidade.js";
import { verifyApiKey, enviarDadosAoWebHook, gerarFaturaPDF } from "../utils/helpers.js"; // Helpers separados

dotenv.config();

const app = express();
const server = createServer(app);
app.set("view engine", "ejs");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.use(express.json());

console.log(process.env.APIKEY);

// Logs de Auditoria
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Cache middleware
function cacheMiddleware(duration) {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url;
    let cachedBody = cache.get(key);
    if (cachedBody) {
      res.send(cachedBody);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        cache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
}

// Rota raiz que retorna uma mensagem simples "Hello World!"
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Endpoint para retornar todos os clientes com paginação e filtros
app.get("/api/v1/clientes", verifyApiKey, async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  
  try {
    const clientes = await mostrarTodoCliente(limit, offset); // Ajuste necessário no controlador para suportar paginação
    res.send(clientes);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.delete("/api/v1/entidades/:entidadeID/clientes/:clienteID", verifyApiKey, async (req, res) => {
  const { clienteID, entidadeID } = req.params;
  try {
    const cliente = await deletarClientePorEntidade(clienteID, entidadeID);
    res.send({ message: `Cliente com id ${clienteID} foi deletado com sucesso` });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post("/api/v1/clientes", verifyApiKey, async (req, res) => {
  const { DESIG, EMAIL, TELEFONE, Entidade_ID } = req.body;
  try {
    const cliente = await adicionarClientePorEntidade(DESIG, EMAIL, TELEFONE, Entidade_ID);
    res.send(cliente);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint para buscar todos os clientes de uma entidade com cache
app.get("/api/v1/entidades/:entidadeID/clientes", verifyApiKey, cacheMiddleware(30), async (req, res) => {
  const { entidadeID } = req.params;
  try {
    const cliente = await mostrarClientePorEntidade(entidadeID);
    res.send(cliente);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint para listar todas as vendas de uma entidade com paginação
app.get("/api/v1/entidades/:entidadeID/vendas", verifyApiKey, async (req, res) => {
  const { entidadeID } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const vendas = await mostrarTodaVendaPorEntidade(entidadeID, limit, offset);
    res.send(vendas);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint para retornar todos os produtos com paginação e cache
app.get("/api/v1/produtos", verifyApiKey, cacheMiddleware(30), async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  
  try {
    const produtos = await mostrarTodoProduto(limit, offset);
    res.send(produtos);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint para buscar um produto específico pelo ID da entidade
app.get("/api/v1/entidades/:entidadeID/produtos", verifyApiKey, cacheMiddleware(30), async (req, res) => {
  const { entidadeID } = req.params;
  try {
    const produto = await mostrarProdutoPorEntidade(entidadeID);
    res.send(produto);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint para buscar um produto pelo seu código de barras
app.get("/api/v1/produtos/barcode/:barcode", verifyApiKey, cacheMiddleware(30), async (req, res) => {
  const { barcode } = req.params;
  try {
    const produto = await mostrarProdutoPorBarCode(barcode);

    if (!produto) {
      return res.status(404).send({ message: "Produto não encontrado" });
    }

    res.send(produto);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint para buscar um produto pelo nome
app.get("/api/v1/produtos/nome/:produto_nome", verifyApiKey, cacheMiddleware(30), async (req, res) => {
  const { produto_nome } = req.params;
  const { entidadeID } = req.query;
  try {
    const produto = await mostrarProdutoPeloNome(produto_nome, entidadeID);
    if (!produto) {
      res.status(404).send({ message: "Produto não encontrado" });
    }
    res.send(produto);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint para buscar produtos por categoria
app.get("/api/v1/produtos/categoria/:categoriaID", verifyApiKey, cacheMiddleware(30), async (req, res) => {
  const { categoriaID } = req.params;
  try {
    const produtos = await mostrarProdutoPorCategoria(categoriaID);
    if (!produtos) {
      res.status(404).send({ message: "Produtos não encontrados" });
    }
    res.send(produtos);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint para autenticar um usuário com base no nome de usuário e senha
app.get("/api/v1/auth", verifyApiKey, async (req, res) => {
  const { username, password } = req.query;
  try {
    const user = await auth(username, password);
    if (user.length === 0) {
      throw new Error("Nome de Usuário ou Senha incorretos");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint para buscar informações sobre uma entidade específica pelo ID
app.get("/api/v1/entidades/:id", verifyApiKey, cacheMiddleware(30), async (req, res) => {
  const { id } = req.params;
  try {
    const user = await entidade(id);
    if (!user) {
      res.status(404).send({ message: "Entidade não encontrada" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint para buscar todas as vendas com paginação
app.get("/api/v1/vendas", verifyApiKey, async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const vendas = await mostrarTodaVenda(limit, offset);
    res.send(vendas);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint para adicionar uma nova venda
app.post("/api/v1/vendas", verifyApiKey, async (req, res) => {
  const { descricao, valor, data, entidadeID } = req.body;
  try {
    const venda = await adicionarVenda(descricao, valor, data, entidadeID);
    res.send(venda);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint para gerar QR Code e fatura em PDF
app.post("/api/v1/vendas/:id/fatura", verifyApiKey, async (req, res) => {
  const { id } = req.params;
  const { cliente, produtos } = req.body;
  try {
    const qrCodeUrl = await toDataURL(`https://example.com/vendas/${id}`);
    const faturaPath = await gerarFaturaPDF(id, cliente, produtos, qrCodeUrl);
    res.download(faturaPath);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
