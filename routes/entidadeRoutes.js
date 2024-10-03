import { Router } from "express";
import { deletarEntidade, ListarEntidadePeloId } from "../repositories/entidade.js";
const router = Router();


// GET http://localhost:3000/api/v1/entidade?id=A56CA66F-54DB-4953-88FE-47C8C7D653B3
router.get("/", async (req, res) => {
  const { id }= req.query
  try {
    const entidade = await ListarEntidadePeloId(id)
     if (entidade === undefined) {
       res.send({ message: "entidade não encontrado" });
     }
     res.send(entidade);
  } catch (error) {
    
  }
  
});
// POST /api/v1/cliente
// router.post("/", async (req, res, next) => {
//   try {
//     const { DESIG, EMAIL, TELEFONE, Entidade_ID } = req.body;
//     const cliente = await adicionarClientePorEntidade(
//       DESIG,
//       EMAIL,
//       TELEFONE,
//       Entidade_ID
//     );
//     res.send("Cliente adicionado com sucesso");
//   } catch (error) {
//     next(error); // Middleware global de erros
//   }
// });
// DELETE /api/v1/entidade?clienteID=123&entidadeID=456
router.delete("/", async (req, res, next) => {
  try {
    const {id} = req.query; // Pegando os valores de query string
    const entidade = await deletarEntidade(id);
    res.send({
      message: `entidade com id ${clienteID} foi deletado com sucesso`,
    });
  } catch (error) {
    next(error);
  }
});
export default router;
