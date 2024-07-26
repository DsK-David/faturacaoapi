import knex from "knex";
import dotenv from "dotenv"
dotenv.config()

export default knex({
  client: "mysql2",
  connection: {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: "", // Agora é uma string
  },
  pool: { min: 0, max: 10 },
});
