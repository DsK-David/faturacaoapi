import { Router } from "express";
import express from "express";
import bodyParser from "body-parser";
import mostrarTodoCliente from "../controller/mostrarTodoCliente.js";
import { adicionarClientePorEntidade, deletarClientePorEntidade, mostrarClientePorEntidade } from "../repositories/cliente.js";
import { verifyApiKey } from "../middlewares/verifyApiKey.js";
import { cacheMiddleware } from "../utils/cacheMiddleware.js";
import { generateRandomHashId } from "../middlewares/generateRandomHash.js";
import { generateUniqueNumber } from "../middlewares/generateCode.js";
import { createDateFromFormat } from "../middlewares/formatData.js";
const data = new Date()

// Exemplo de uso:
const formattedDate = createDateFromFormat(data);
console.log(formattedDate);




const app = express();

app.use(bodyParser.json()); // Processa JSON
app.use(bodyParser.urlencoded({ extended: false })); // Processa dados form-urlencoded


const router = Router();
// GET http://localhost:3000/api/v1/cliente/
router.get("/", mostrarTodoCliente);
// GET http://localhost:3000/api/v1/cliente/entidade?id=A56CA66F-54DB-4953-88FE-47C8C7D653B3
router.get("/entidade",async (req,res)=>{
  const { id } =req.query 
   const clienteByEntidade = await mostrarClientePorEntidade(id)
   res.json(clienteByEntidade)
})
router.post("/test", (req, res) => {
  console.log(req.body);
  res.json({ message: "Dados recebidos", data: req.body });
});

// POST http://localhost:3000/api/v1/cliente/
router.post("/", async (req, res, next) => {
  console.log(req.body)
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
     res.json({
       success: true,
       msg: "Operação bem sucedida",
       data: [
         {
           numeroCliente: NUM_CLIENTE,
           id: ID,
         },
       ],
     });
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