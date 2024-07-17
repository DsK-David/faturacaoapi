import express from "express";
import { mostrarClientePorEntidade, mostrarClientes } from "../repositories/cliente.js";
import mostrarTodoCliente from "../controller/mostrarTodoCliente.js";
import mostrarTodoProduto from "../controller/mostrarTodoProduto.js";
import { entidade } from "../repositories/entidade.js";
import { auth } from "../repositories/login.js";
import { mostrarProdutoPeloNome, mostrarProdutoPorBarCode, mostrarProdutoPorEntidade } from "../repositories/produto.js";
import mostrarTodaCategoria from "../controller/mostrarTodaCategoria.js";
import { mostrarCategoriaPorEntidade } from "../repositories/categorias.js";
import { mostrarTodaVendaPorEntidade } from "../repositories/vendas.js";
const app = express();
// Middleware para parsear JSON
app.use(express.json());
// Rotas
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/api/v1/cliente",mostrarTodoCliente)
app.get("/api/v1/cliente/:entidadeID", async (req, res) => {
  const { entidadeID } = req.params;
  try {
    const cliente = await mostrarClientePorEntidade(entidadeID);
    
    res.send(cliente);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
app.get("/api/v1/produto", mostrarTodoProduto);
app.get("/api/v1/produto/:entidadeID", async (req, res) => {
  const { entidadeID } = req.params;
  try {
    const produto = await mostrarProdutoPorEntidade(entidadeID);
    // if (produto === undefined) {
    //   res.send({ message: "Usuario não encontrado" });
    // }
    res.send(produto);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
app.get("/api/v1/produto/barcode/:barcode", async (req, res) => {
  const { barcode } = req.params;
  try {
    const produto = await mostrarProdutoPorBarCode(barcode);
    if (produto === undefined) {
      res.send({ message: "Usuario não encontrado" });
    }
    res.send(produto);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
app.get("/api/v1/produto/nome/:produto_nome", async (req, res) => {
  const { produto_nome } = req.params;
  try {
    const produto = await mostrarProdutoPeloNome(produto_nome);
    if (produto === undefined) {
      res.send({ message: "Usuario não encontrado" });
    }
    res.send(produto);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
app.get("/api/v1/auth/:username/:password", async (req, res) => {
  const { username,password } = req.params;
  try {
    const user = await auth(username,password);
    // if (user === undefined) {
    //   res.send({ message: "Usuario não encontrado" });
    // }
    res.send(user)
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
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
app.get("/api/v1/categoria",mostrarTodaCategoria)
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





// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
