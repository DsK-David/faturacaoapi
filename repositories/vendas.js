import database from "../database/database.js";

export async function mostrarTodaVendaPorEntidade(entidadeID){
return database.select().from("venda").where("Entidade_ID",entidadeID)
}