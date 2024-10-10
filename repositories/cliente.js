import database from "../database/database.js";

export async function mostrarClientes() {
  return database.select().from("cliente");
}
export async function mostrarClientePorEntidade(entidadeID){
  return database.select().from("cliente").where("Entidade_ID",entidadeID)
}
export async function adicionarClientePorEntidade(
  ID,
  CODIGO,
  IND_COLETIVO,
  DESIG,
  DESCR,
  NIF,
  NUM_CLIENTE,
  EMAIL,
  TELEFONE,
  ENDERECO,
  DT_REGISTO,
  DT_ALTERACAO,
  ESTADO,
  glb_user_ID,
  Entidade_ID
) {
  return database
    .insert({
      ID,
      CODIGO,
      IND_COLETIVO,
      DESIG,
      DESCR,
      NIF,
      NUM_CLIENTE,
      EMAIL,
      TELEFONE,
      ENDERECO,
      DT_REGISTO,
      DT_ALTERACAO,
      ESTADO,
      glb_user_ID,
      Entidade_ID,
    })
    .into("cliente");
}
export async function deletarClientePorEntidade(clienteID,entidadeID){
return database
  .delete()
  .from("cliente")
  .where("ID", clienteID)
  .andWhere("Entidade_ID", entidadeID);
}