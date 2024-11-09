// routes/index.js
import { Router } from "express";
import clienteRoutes from "./clienteRoutes.js";
import produtoRoutes from "./produtoRoutes.js";
import vendasRoutes from "./vendasRoutes.js";
import authRoutes from "./authRoutes.js";
import entidadeRoutes from "./entidadeRoutes.js";
import categoriaRoutes from "./categoriaRoutes.js"
import faturaRoutes from "./faturaRoutes.js"
import { errorMiddleware } from "../middlewares/errorMiddleware.js";

errorMiddleware;
const router = Router();
router.use("/cliente", clienteRoutes); // Rota para returnar toda as informações relacionados aos clientes
router.use("/produto", produtoRoutes);
router.use("/venda", vendasRoutes);
router.use("/categoria", categoriaRoutes);
router.use("/auth", authRoutes);
router.use("/entidade", entidadeRoutes);
router.use("/fatura",faturaRoutes)

export default router;
