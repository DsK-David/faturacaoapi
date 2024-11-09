import { Router } from "express";
import mostrarCondicaoPagamento from "../controller/mostrarCondicaoPagamento.js";
import mostrarTipoFatura from "../controller/mostrarTipoFatura.js";
import { emitirFatura,  } from "../repositories/fatura.js";
import { respostaPadrao } from "../utils/responseDefault.js";
import { v4 as uuidv4 } from "uuid";
import { generateRandomHashId } from "../utils/generateRandomHash.js";
import { generateUniqueNumber } from "../utils/generateCode.js";
import mostrarMetodoPagamento from "../controller/mostrarMetodoPagamento.js";

const router = Router();
// GET http://localhost:3000/api/v1/fatura/pagamento
router.get("/condicao/pagamento", mostrarCondicaoPagamento);
router.get("/metodo/pagamento",mostrarMetodoPagamento)

// GET http://localhost:3000/api/v1/fatura/pagamento
router.get("/tipo", mostrarTipoFatura);
// router.post("/", async (req, res,next) => {
//   try {
//      const {
//        pr_serie_id,
//        utilizador,
//        entidade_id,
//        tipoFaturaID,
//        condicoes_pagamento,
//        cliente_codigo,
//        produtos,
//        requisicao,
//        desconto_financeiro,
//        nota,
       
//      } = req.body;
//      const CODIGO = generateUniqueNumber();
//      const estado = "A";
//      const uuid = "CV" + uuidv4();
//      const fatura = await emitirFatura(
//        CODIGO,
//        pr_serie_id,
//        estado,
//        utilizador,
//        entidade_id,
//        tipoFaturaID,
//        condicoes_pagamento,
//        cliente_codigo,
//        produtos,
//        requisicao,
//        desconto_financeiro,
//        nota,
//        uuid
//      );
//      const respost = [
//        {
//          codigo: CODIGO,
//          id: generateRandomHashId(),
//          uuid: uuid,
//        },
//      ];
//      res.json(respostaPadrao(true, "Operação bem sucedida", respost));
//   } catch (error) {
//     next(error);
//   }
 
// });
router.post("/", async (req, res, next) => {
  try {
    const {
      utilizador,
      entidade_id,
      tipoFaturaID,
      condicoes_pagamento,
      cliente_codigo,
      produtos,
      requisicao,
      desconto_financeiro,
      nota,
    } = req.body;
    const CODIGO = generateUniqueNumber();
    const estado = "A";
    const uuid = "CV" + uuidv4();
    const respost = [
      {
        codigo: CODIGO,
        id: generateRandomHashId(),
        uuid: uuid,
        data:req.body
      },
    ];
    res.json(respostaPadrao(true, "Operação bem sucedida", respost));
    console.log(req.body)
  } catch (error) {
    next(error);
  }
});
export default router;
