import { mostrarProduto } from "../repositories/produto.js";
import { respostaPadrao } from "../utils/responseDefault.js";
export default async function (req,res){
    try {
        const resultado = await mostrarProduto()
        res
          .status(200)
          .json(respostaPadrao(true, "Operação bem sucedida", resultado));
    } catch (error) {
        res
          .status(500)
          .json(respostaPadrao(false, "Operação mal sucedida", error));
    }
}