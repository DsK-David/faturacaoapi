import database from "../database/database.js";

export async function mostrarProduto() {
  return database.select().from("produto");
}
export async function mostrarProdutoPorEntidade(entidadeID) {
  return database.select().from("produto").where("Entidade_ID",entidadeID);
}
export async function mostrarProdutoPorBarCode(barcode,entidadeID){
  return database.select().from("produto").where("Codigo_barra",barcode).where("Entidade_ID",entidadeID)
}
export async function mostrarProdutoPeloNome(nome_produto,entidadeID){
  return database.select().from("produto").where("DESIG",nome_produto).where("Entidade_ID",entidadeID)
}
export async function mostrarProdutoPorCategoria(categoriaID){
  return database.select().from("produto").where("pr_categoria_ID",categoriaID)
//   SELECT *
// FROM produto where pr_categoria_ID = '01bc92ce-4298-fc34-a5f0-34637d005124';
}