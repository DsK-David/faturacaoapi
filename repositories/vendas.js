import database from "../database/database.js";

export async function mostrarVendasporEntidade(entidadeId) {
  try {
    // Busca todas as faturas de venda para a entidade especificada
    const faturaVendaResult = await database
      .select()
      .from("fatura_venda")
      .where("Entidade_ID", entidadeId);

    // Cria um array para armazenar as informações de cada venda
    const vendasData = [];

    // Itera sobre as faturas de venda e busca os produtos relacionados
    for (const faturaVenda of faturaVendaResult) {
      const { ID: FATURA_VENDA_ID, DT_REGISTO, VALOR_FATURA } = faturaVenda;

      // Busca os produtos relacionados à fatura de venda
      const relVendaProdutoResult = await database
        .select()
        .from("rel_venda_produto")
        .where("fatura_venda_id", FATURA_VENDA_ID);

      // Busca os detalhes de cada produto
      const produtosData = [];
      let totalQuantidadeVendida = 0;
      for (const relVendaProduto of relVendaProdutoResult) {
        const { Produto_ID, QUANTIDADE } = relVendaProduto;
        const produtoResult = await database
          .select()
          .from("PRODUTO")
          .where("ID", Produto_ID);
        produtosData.push({ ...produtoResult[0], QUANTIDADE });
        totalQuantidadeVendida += QUANTIDADE;
      }

      // Adiciona as informações da venda ao array de vendas
      vendasData.push({
        DT_REGISTO,
        produtos_vendidos: produtosData,
        quantidade_vendidos: parseInt(totalQuantidadeVendida),
        VALOR_FATURA,
      });
    }

    return vendasData;
  } catch (error) {
    console.error("Erro ao buscar as vendas:", error);
    throw error;
  }
}
export async function mostrarTodaAsVendas() {
  return database.select().from("vendas_teste");
}
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

