import database from "../database/database.js";

export async function mostrarTodaVendaPorEntidade(entidadeID){
return database.select().from("venda").where("Entidade_ID",entidadeID)
}
export async function mostrarTodaAsVendas() {
  return database.select().from("vendas_teste");
}
// Adiciona uma nova venda para uma entidade específica
// Função para adicionar venda por entidade
// Função para adicionar venda por entidade
export async function adicionarVenda(
  entidadeID,
  usuarioID,
  itensComprados,
  valorTotal,
  dataVenda
) {
  // Inserir os dados na tabela 'vendas_teste'
  const [Venda_ID] = await database("vendas_teste")
    .insert({
      Entidade_ID: entidadeID,
      UTILIZADOR: usuarioID,
      Itens_Comprados: JSON.stringify(itensComprados),
      Valor_Total: valorTotal,
      Data_Venda: dataVenda,
    })
    .returning("id"); // Supondo que 'id' seja a chave primária da tabela

  // Recuperar os dados da venda inserida
  const venda = await database("vendas_teste").where({ Venda_ID }).first();

  // Retornar os dados da venda
  return venda;
}


