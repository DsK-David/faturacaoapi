import database from "../database/database.js";

export async function mostrarClientes() {
  return database.select().from("cliente");
}
export async function mostrarClientePorEntidade(entidadeID){
  return database.select().from("cliente").where("Entidade_ID",entidadeID)
}