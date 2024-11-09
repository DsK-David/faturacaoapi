import { Router } from "express";
import { respostaPadrao } from "../utils/responseDefault.js";
import { mostrarCategoriaPorEntidade } from "../repositories/categorias.js";
import mostrarTodaCategoria from "../controller/mostrarTodaCategoria.js";
const router = Router();
router.get("/",mostrarTodaCategoria)
// GET http://localhost:3000/api/v1/categoria/entidade?id=4fe29fba-81c9-fef6-635c-32bb714f0efb
router.get("/entidade", async (req, res) => {
  const { id } = req.query;
  try {
    const categoria = await mostrarCategoriaPorEntidade(id);
    if (categoria === undefined) {
      res.json(
        respostaPadrao(
          false,
          "cantegorias não encontrados"
        )
      );
    }
    res.json(respostaPadrao(true, "Operação bem sucedida", categoria));
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
export default router;
