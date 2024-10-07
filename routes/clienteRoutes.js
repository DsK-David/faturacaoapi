import { Router } from "express";
import crypto from "crypto"
import mostrarTodoCliente from "../controller/mostrarTodoCliente.js";
import { adicionarClientePorEntidade, deletarClientePorEntidade, mostrarClientePorEntidade } from "../repositories/cliente.js";
import { verifyApiKey } from "../middlewares/verifyApiKey.js";
import { cacheMiddleware } from "../utils/cacheMiddleware.js";
import { generateRandomHashId } from "../middlewares/generateRandomHash.js";

console.log(generateRandomHashId())
const router = Router();
// GET http://localhost:3000/api/v1/cliente/
router.get("/", mostrarTodoCliente);
// GET http://localhost:3000/api/v1/cliente/entidade?id=A56CA66F-54DB-4953-88FE-47C8C7D653B3
router.get("/entidade",async (req,res)=>{
  const { id } =req.query 
   const clienteByEntidade = await mostrarClientePorEntidade(id)
   res.json(clienteByEntidade)
})
// POST http://localhost:3000/api/v1/cliente/
router.post("/", async (req, res, next) => {
  try {
    const { DESIG, EMAIL, TELEFONE, Entidade_ID } = req.body;
    const cliente = await adicionarClientePorEntidade(
      DESIG,
      EMAIL,
      TELEFONE,
      Entidade_ID
    );
    res.send("Cliente adicionado com sucesso");
  } catch (error) {
    next(error); // Middleware global de erros
  }
});
// DELETE /api/v1/cliente?clienteid=123&entidadeid=456
router.delete("/", async (req, res, next) => {
  try {
    const { clienteid, entidadeid } = req.query; // Pegando os valores de query string
    const cliente = await deletarClientePorEntidade(clienteid, entidadeid);
    res.send({
      message: `Cliente com id ${clienteid} foi deletado com sucesso`,
    });
  } catch (error) {
    next(error);
  }
});
export default router;