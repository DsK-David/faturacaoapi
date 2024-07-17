import database from "../database/database.js";

export async function mostrarProduto() {
  return database.select().from("produto");
}
export async function mostrarProdutoPorEntidade(entidadeID) {
  return database.select().from("produto").where("Entidade_ID",entidadeID);
}
export async function mostrarProdutoPorBarCode(barcode){
  return database.select().from("produto").where("Codigo_barra",barcode)
}
export async function mostrarProdutoPeloNome(nome_produto){
  return database.select().from("produto").where("DESIG",nome_produto)
}