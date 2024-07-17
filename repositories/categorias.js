import database from "../database/database.js";

export async function mostrarTodaCategoria(){
    return database.select().from("pr_categoria")
}
export async function mostrarCategoriaPorEntidade(entidadeID) {
  return database.select().from("pr_categoria").where("Entidade_ID",entidadeID);
}