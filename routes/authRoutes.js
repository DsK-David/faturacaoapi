import { Router } from "express";
import { auth } from "../repositories/login.js";
import { respostaPadrao } from "../utils/responseDefault.js";

const router= Router()
//http://localhost:3000/api/v1/auth?username=emirian.pinto&password=00017
router.get("/", async (req, res) => {
  const { username, password } = req.query;
  try {
    const user = await auth(username, password);
    const data ={
          id: user[0].ID,
          username: user[0].USERNAME,
          codigo:user[0].CODIGO,
          entidade:user[0].Entidade_ID
        }
    if (user.length === 0) {
      throw new Error("Nome de Usuario ou Senha incorretos");
    } else {
      res.json(respostaPadrao(true, "Operação bem sucedida",data));
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
 export default router