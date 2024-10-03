import request from "supertest";
import app from "../src/index.js"; // Certifique-se de que seu app usa export padrão (export default app)

describe("Testando as rotas da API", () => {
  it("Deve retornar status 200 na rota GET /api/users", async () => {
    const response = await request(app).get("/api/users");
    expect(response.statusCode).toBe(200);
    console.log(response.body); // Log da resposta
  });

  it("Deve retornar erro 404 para rota inexistente", async () => {
    const response = await request(app).get("/api/rota-inexistente");
    expect(response.statusCode).toBe(404);
  });

  it("Deve criar um novo usuário com POST /api/users", async () => {
    const newUser = { name: "John", email: "john@example.com" };
    const response = await request(app).post("/api/users").send(newUser);
    expect(response.statusCode).toBe(201);
    console.log(response.body); // Log do corpo da resposta
  });
});
