import { Router } from "express";
import { auth } from "../repositories/login.js";
const router= Router()
//http://localhost:3000/api/v1/auth?username=emirian.pinto&password=00017
router.get("/", async (req, res) => {
  const { username, password } = req.query;
  try {
    const user = await auth(username, password);
    if (user.length === 0) {
      throw new Error("Nome de Usuario ou Senha incorretos");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
 export default router