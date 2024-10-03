// arquivo principal de rotas para clientes


import { Router } from "express";
import { mostrarTodaAsVendas, mostrarTodaVendaPorEntidade } from "../repositories/vendas.js";
import { gerarFaturaPDF } from "../utils/gerarFaturaPDF.js";
import { enviarDadosAoWebHook } from "../utils/enviarDadosAoWebHook.js";

const router = Router();
// GET http://localhost:3000/api/v1/venda/
router.get("/", mostrarTodaAsVendas)

// GEThttp://localhost:3000/api/v1/venda/entidade?id=A56CA66F-54DB-4953-88FE-47C8C7D653B3
router.get("/entidade", async (req, res) => {
  const { id } = req.query; //query que toma o ID e envia para a função
  const vendasByEntidade = await mostrarTodaVendaPorEntidade(id); // componente função que retorna os dados
  res.json(vendasByEntidade);// dados retornados em formato JSON
});
// POST http://localhost:3000/api/v1/venda/
router.post("/", async (req, res, next) => {
  try {
    const { Entidade_ID, UTILIZADOR, Itens_Comprados, Valor_Total } = req.body;

    if (!Entidade_ID || !UTILIZADOR || !Itens_Comprados || !Valor_Total) {
      return res.status(400).json({ error: "Dados da venda incompletos" });
    }

    const venda = await adicionarVenda(
      Entidade_ID,
      UTILIZADOR,
      Itens_Comprados,
      Valor_Total
    );
    await gerarFaturaPDF(venda, res);
    enviarDadosAoWebHook(venda);
  } catch (error) {
    console.error("Erro ao registrar venda:", error);
    res.status(500).json({ error: "Erro ao registrar venda" });
  }
});
// // DELETE /api/v1/cliente?clienteid=123&entidadeid=456
// router.delete("/", async (req, res, next) => {
//   try {
//     const { clienteid, entidadeid } = req.query; // Pegando os valores de query string
//     const cliente = await deletarClientePorEntidade(clienteid, entidadeid);
//     res.send({
//       message: `Cliente com id ${clienteID} foi deletado com sucesso`,
//     });
//   } catch (error) {
//     next(error);
//   }
// });
export default router;
