import database from "../database/database.js";

export async function entidade(id) {
  return database
    .select()
    .from("entidade")
    .where("ID", id)
}
