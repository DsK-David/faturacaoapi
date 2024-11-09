// arquivo principal de rotas para clientes
import { Router } from "express";
import { adicionarVenda, mostrarTodaAsVendas, mostrarVendasporEntidade } from "../repositories/vendas.js";
import { gerarFaturaPDF } from "../utils/gerarFaturaPDF.js";
import { enviarDadosAoWebHook } from "../utils/enviarDadosAoWebHook.js";
import { respostaPadrao } from "../utils/responseDefault.js";
import mostrarCondicaoPagamento from "../controller/mostrarCondicaoPagamento.js";

const router = Router();
// GET http://localhost:3000/api/v1/venda/
router.get("/", mostrarTodaAsVendas)

// GET http://localhost:3000/api/v1/venda/entidade?id=A56CA66F-54DB-4953-88FE-47C8C7D653B3
router.get("/entidade",async (req, res) => {
  const { id } = req.query; //query que toma o ID e envia para a função
  const vendasByEntidade = await mostrarVendasporEntidade(id); // componente função que retorna os dados
  res.json(respostaPadrao(true, "Operação bem sucedida",vendasByEntidade));
  // res.json(vendasByEntidade);// dados retornados em formato JSON
});
// POST http://localhost:3000/api/v1/venda/
router.post("/", async (req, res, next) => {
  try {
    const { Entidade_ID, UTILIZADOR, Itens_Comprados, Valor_Total } = req.body;

    if (!Entidade_ID || !UTILIZADOR || !Itens_Comprados || !Valor_Total) {
      return res
        .status(400)
        .json(respostaPadrao(flase, "Operação não sucedida dados incompletos"));
    }

    const venda = await adicionarVenda(
      Entidade_ID,
      UTILIZADOR,
      Itens_Comprados,
      Valor_Total
    );
    await gerarFaturaPDF(venda, res);
    // enviarDadosAoWebHook(venda);
  } catch (error) {
    console.error("Erro ao registrar venda:", error);
    res.status(500).json({
      sucess:false,
      msg:"Operação não sucedida",
      error:error
    });
  }
});

export default router;
