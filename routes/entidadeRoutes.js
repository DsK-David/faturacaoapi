import { Router } from "express";
import { deletarEntidade, ListarEntidadePeloId } from "../repositories/entidade.js";
import { respostaPadrao } from "../utils/responseDefault.js";
const router = Router();


// GET http://localhost:3000/api/v1/entidade?id=A56CA66F-54DB-4953-88FE-47C8C7D653B3
router.get("/", async (req, res) => {
  const { id }= req.query
  try {
    const entidade = await ListarEntidadePeloId(id)
     if (entidade === undefined) {
       res.json(respostaPadrao(false, "Entidade não encontrado",entidade));
     }
     res.json(respostaPadrao(true, "Operação bem sucedida", entidade));
  } catch (error) {
    
  }
  
});

// DELETE /api/v1/entidade?clienteID=123&entidadeID=456
router.delete("/", async (req, res, next) => {
  try {
    const {id} = req.query; // Pegando os valores de query string
    const entidade = await deletarEntidade(id);
    res.json(respostaPadrao(true, "Entidade deletada com sucesso", entidade));
  } catch (error) {
    next(error);
  }
});
export default router;
