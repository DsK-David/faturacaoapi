import database from "../database/database.js";

export async function mostrarCompraPorEntidade(entidadeID) {
  return database.select().from("compra").where("Entidade_ID",entidadeID);
}
