import database from "../database/database.js";

export async function entidade(id) {
  return database
    .select()
    .from("entidade")
    .where("ID", id)
}
export async function deletarEntidade(id){
  return database.delete().from("entidade").where("ID",id)
}
