import database from "../database/database.js";
import { v4 as uuidv4 } from "uuid";

export async function mostrarCondicaoPagamento() {
  return database.select().from("pr_limit_fatura");
}

export async function mostrarTipoFatura() {
  return database.select().from("pr_fatura_tipo").where("TIPO","Venda");
}
export async function mostrarMetodoPagamento(){
  return database.select().from("pr_metodo_pagamento");
}

export async function emitirFatura(
  codigo,
  pr_serie_ID,
  estado,
  UTILIZADOR,
  entidadeID,
  tipoFatura,
  condicaoPagamento,
  clienteID,
  produtos,
  requisicao,
  desconto_financeiro,
  nota,
  uuid
) {
  const vendaId = uuidv4();
  const faturaId = uuidv4();
  const dataAtual = new Date();

  // 1. Inserção na tabela "venda"
  await database.insert({
    ID: vendaId,
    CODIGO: codigo,
    pr_serie_ID: pr_serie_ID,
    CLIENTE: clienteID,
    DT_REGISTO: dataAtual,
    DT_ALTERACAO: dataAtual,
    ESTADO: estado,
    UTILIZADOR: UTILIZADOR,
    Entidade_ID: entidadeID,
  })
  .into("venda");

  // 2. Inserção na tabela "fatura_venda"
  await database("fatura_venda").insert({
    ID: faturaId,
    CODIGO: Math.floor(Math.random() * 100000),
    // CODIGO_REFERENCIA: codigo,
    TIPO_FATURA: tipoFatura,
    VENDA: vendaId,
    DT_FATURACAO: dataAtual,
    LIMIT_FATURACAO:condicaoPagamento,
    DT_REGISTO: dataAtual,
    DT_ALTERACAO: dataAtual,
    ESTADO: estado,
    PAGO: "0",
    DESCONTO_FINANCEIRO: desconto_financeiro,
    NOTA: nota,
    requisicao: requisicao,
    Entidade_ID: entidadeID,
    TERM_CONDICOES: condicaoPagamento,
    UUID:uuid
  });

  // 3. Inserção na tabela "rel_venda_produto" para cada produto
  for (const produto of produtos) {
    await database("rel_venda_produto").insert({
      ID: uuidv4(),
      Venda_ID: vendaId,
      Produto_ID: produto.produto_id,
      FATURA_VENDA_ID: faturaId,
      QUANTIDADE: produto.qttd,
      PRECO_VENDA: produto.preco_unid,
      VALOR_IVA:produto.preco_unid * produto.qttd,
      VALOR_SEM_IVA: produto.preco_unid * produto.qttd,
      VALOR_COM_IVA: produto.preco_unid * produto.qttd * 1.15, // Exemplo com IVA de 15%
      DESCONTO_COMERCIAL: produto.desc_comercial,
      DESCONTO_FINANCEIRO: desconto_financeiro,
      CODIGO: "produto_codigo", // Adapte conforme necessário
      ESTADO: estado,
    });
  }

  return { sucesso: true, vendaId, faturaId };
}

// Exemplo de chamada da função emitirFatura
// const dadosFatura = {
//   tipoFaturaId: "0c0f832b-39c9-9ccd-d92f-130329efd74c",
//   condicoes_pagamento: "24AECED7-0C8E-4AB9-8A04-D00AA91DA3E2",
//   cliente_codigo: "E5EBCB70-A298-4415-A307-D0C59A29291B",
//   produtos: [
//     {
//       produto_id: "abc",
//       qttd: 10,
//       preco_unid: 1000,
//       desc_comercial: 0,
//     },
//   ],
//   requisicao: "fatura para liquidacao da divida",
//   desconto_financeiro: 10,
//   nota: "mesa cadeira para escritorio",
// };

// // Chamando a função e enviando os dados
// emitirFatura(
//   "FR2022A-1",
//   "2022A",
//   "A",
//   "user_id",
//   "entidade_id",
//   dadosFatura.tipoFaturaId,
//   dadosFatura.condicoes_pagamento,
//   dadosFatura.cliente_codigo,
//   dadosFatura.produtos,
//   dadosFatura.requisicao,
//   dadosFatura.desconto_financeiro,
//   dadosFatura.nota
// ).then((response) => console.log(response));
