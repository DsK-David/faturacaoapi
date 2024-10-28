import database from "../database/database.js";

export async function mostrarClientes() {
  return database.select().from("cliente");
}
export async function mostrarClientePorEntidade(entidadeID, limit, offset) {
  // Seleciona os clientes com base no ID da entidade e aplica limite e offset
  const clientes = await database
    .select()
    .from("cliente")
    .where("Entidade_ID", entidadeID)
    .limit(limit)
    .offset(offset);

  // Conta o total de clientes para cálculo de páginas
  const totalResult = await database
    .count("ID as count")
    .from("cliente")
    .where("Entidade_ID", entidadeID)
    .first();

  return {
    clientes,
    total: totalResult.count,
  };
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
export async function atualizarClientePorEntidade(
  clienteID,
  entidadeID,
  dadosAtualizados
) {
  return database("cliente")
    .where("ID", clienteID)
    .andWhere("Entidade_ID", entidadeID)
    .update(dadosAtualizados)
    .returning("*");
}


export async function mostrarClientePorNif(nif){
  return database.select().from("cliente").where("NIF",nif);
}
