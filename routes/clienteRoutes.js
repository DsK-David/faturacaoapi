import { Router } from "express";
import express from "express";
import bodyParser from "body-parser";
import mostrarTodoCliente from "../controller/mostrarTodoCliente.js";
import { adicionarClientePorEntidade, deletarClientePorEntidade, mostrarClientePorEntidade } from "../repositories/cliente.js";
import { verifyApiKey } from "../utils/verifyApiKey.js";
import { cacheMiddleware } from "../middlewares/cacheMiddleware.js";
import { generateRandomHashId } from "../utils/generateRandomHash.js";
import { generateUniqueNumber } from "../utils/generateCode.js";
import { createDateFromFormat } from "../utils/formatData.js";
import { respostaPadrao } from "../utils/responseDefault.js";
const data = new Date()
const app = express();
const router = Router();
// GET http://localhost:3000/api/v1/cliente/
router.get("/", mostrarTodoCliente);
// GET http://localhost:3000/api/v1/cliente/entidade?id=A56CA66F-54DB-4953-88FE-47C8C7D653B3
router.get("/entidade",async (req,res)=>{
  const { id } =req.query 
   const clienteByEntidade = await mostrarClientePorEntidade(id)
   res.json(respostaPadrao(true, "Operação bem sucedida",clienteByEntidade));
})
// router.update("/",async (req,res)=>{
//   const {ID,Entidade_I}
// })
// POST http://localhost:3000/api/v1/cliente/
router.post("/", async (req, res, next) => {
  const ID = generateRandomHashId()
  const NUM_CLIENTE = Math.floor(Math.random() * 10) + 1;
  const CODIGO = generateUniqueNumber()
  const DT_REGISTO = createDateFromFormat(data);
  const DT_ALTERACAO = createDateFromFormat(data);
  try {
    const { IND_COLETIVO, DESIG, DESCR, NIF, EMAIL, TELEFONE,ENDERECO,ESTADO,glb_user_ID, Entidade_ID } = req.body;
    const cliente = await adicionarClientePorEntidade(
      ID,
      CODIGO,
      IND_COLETIVO,
      DESIG,
      DESCR,
      NIF,
      NUM_CLIENTE,
      EMAIL,
      TELEFONE,
      ENDERECO,
      DT_REGISTO,
      DT_ALTERACAO,
      ESTADO,
      glb_user_ID,
      Entidade_ID
    );
     res.json(respostaPadrao(true, "Operação bem sucedida",cliente));
  } catch (error) {
    next(error); // Middleware global de erros
  }
});
// DELETE /api/v1/cliente?clienteid=123&entidadeid=456
router.delete("/", async (req, res, next) => {
  try {
    const { clienteid, entidadeid } = req.query; // Pegando os valores de query string
    const cliente = await deletarClientePorEntidade(clienteid, entidadeid);
    res.json(respostaPadrao(true,"Operação bem sucedida",cliente));
  } catch (error) {
    next(error);
  }
});
export default router;