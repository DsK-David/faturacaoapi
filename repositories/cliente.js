import database from "../database/database.js";

export async function mostrarClientes() {
  return database.select().from("cliente");
}
export async function mostrarClientePorEntidade(entidadeID){
  return database.select().from("cliente").where("Entidade_ID",entidadeID)
}
export async function adicionarClientePorEntidade(ID,FOTO_PERFIL,CODIGO,DESIG,DESCR,NIF,EMAIL,TELEFONE,Entidade_ID){
  return database.insert({FOTO_PERFIL,CODIGO,DESIG,DESCR,NIF,EMAIL,TELEFONE,Entidade_ID}).into("cliente")
}
export async function deletarClientePorEntidade(clienteID,entidadeID){
return database.delete().from("cliente_teste").where("ID",clienteID).andWhere("Entidade_ID",entidadeID)
}