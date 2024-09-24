import dotenv from "dotenv";
import knex from "knex";
dotenv.config()

export default knex({
  client: "mysql2",
  connection: {
    host: "localhost",
    port: 3306,
    database: "faturacao",
    user: "DsK-David",
    password: "2513", // Agora é uma string
  },
  pool: { min: 0, max: 10 },
});
// export default knex({
//   client: "mysql2",
//   connection: {
//     host: process.env.HOST,
//     port: process.env.PORT,
//     database: process.env.DATABASE,
//     user: process.env.USER,
//     password: process.env.PASSWORD, // Agora é uma string
//   },
//   pool: { min: 0, max: 10 },
// });