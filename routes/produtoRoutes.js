import { Router } from "express";
import mostrarTodoProduto from "../controller/mostrarTodoProduto.js";
import { mostrarProdutoPorBarCode, mostrarProdutoPorCategoria, mostrarProdutoPorEntidade } from "../repositories/produto.js";
import { cacheMiddleware } from "../middlewares/cacheMiddleware.js";
import { respostaPadrao } from "../utils/responseDefault.js";


const router = Router()
// GET http://localhost:3000/api/v1/produto
router.get("/",mostrarTodoProduto)
// GET http://localhost:3000/api/v1/produto/entidade?id=7d8bf0c0-33a6-1246-7c94-1c96245dfc3a
router.get("/entidade",
  cacheMiddleware(60),
  async (req, res) => {
    const { id } = req.query;
    try {
      const produto = await mostrarProdutoPorEntidade(id);
      res.json(respostaPadrao(true, "Operação bem sucedida",produto));
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);
// GET http://localhost:3000/api/v1/produto/barcode?code=12002
router.get("/barcode", async (req, res) => {
  const { code } = req.query;
  try {
    const produto = await mostrarProdutoPorBarCode(code);

    if (produto === undefined) {
      return res.status(404).json(respostaPadrao(true,"Produto não encontrado",produto));
    }
    res.json(respostaPadrao(true, "Operação bem sucedida",produto));
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
// GET http://localhost:3000/api/v1/produto/categoria?id=6328790f-7060-1307-6853-ac3ba10f0064
router.get("/categoria",
  async (req, res) => {
    const { id } = req.query;
    try {
      const produto = await mostrarProdutoPorCategoria(id);
      if (produto === undefined) {
        res.json(respostaPadrao(false,"produtos dessa cantegoria não encontrados",produto));
      }
      res.json(respostaPadrao(true, "Operação bem sucedida",produto));
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);
export default router;