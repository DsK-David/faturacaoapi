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
// const clienteID = 1; // ID do cliente que será atualizado
// const entidadeID = 2; // ID da entidade do cliente
// const dadosAtualizados = {
//   DESIG: "Novo Nome do Cliente", // Atualizar o nome
//   EMAIL: "novoemail@cliente.com", // Atualizar o e-mail
//   TELEFONE: "987654321", // Atualizar o telefone
//   DT_ALTERACAO: new Date(), // Atualizar a data de alteração
// };

// try {
//   const resultado = await atualizarClientePorEntidade(
//     clienteID,
//     entidadeID,
//     dadosAtualizados
//   );
//   console.log("Cliente atualizado com sucesso:", resultado);
// } catch (erro) {
//   console.error("Erro ao atualizar cliente:", erro);
// }
