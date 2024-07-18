import knex from "knex";


export default knex({
  client: "mysql2",
  connection: {
    host: "localhost",
    port: 3306,
    database: "faturacao",
    user: "root",
    password: "", // Agora é uma string
  },
  pool: { min: 0, max: 10 },
});
