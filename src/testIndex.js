// server.js
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { createServer } from "http";
import bodyParser from "body-parser"
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import routes from "../routes/index.js";
import { loggerMiddleware } from "../middlewares/loggerMiddleware.js";
import { cacheMiddleware } from "../utils/cacheMiddleware.js";
import { errorMiddleware } from "../middlewares/errorMiddleware.js";

// Carregar configurações do ambiente
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(bodyParser.json()); // Processa JSON
app.use(bodyParser.urlencoded({ extended: false }));
// Configuração do WebSocket para logs
io.on("connection", (socket) => {
  console.log("Client connected");
});

// Definir o caminho correto para o diretório
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares globais
// app.use(express.json());
// app.use(loggerMiddleware(io)); // Log de requisições
// app.use(cacheMiddleware(60)); // Cache Middleware

// Rotas
app.use("/api/v1", routes);

// Middleware de erro
app.use(errorMiddleware);

// Servir páginas estáticas
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});
app.get("/logs", (req, res) => {
  res.sendFile(path.join(__dirname, "/logs.html"));
});

// Iniciar servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
