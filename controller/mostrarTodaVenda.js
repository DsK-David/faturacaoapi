import { mostrarTodaCategoria } from "../repositories/categorias.js";
import { mostrarTodaAsVendas } from "../repositories/vendas.js";
export default async function (req,res){
    try {
        const resultado = await mostrarTodaAsVendas()
        res
          .status(200)
          .json(respostaPadrao(true, "Operação bem sucedida", resultado));
    } catch (error) {
        response
          .status(422)
          .json(respostaPadrao(false, "Operação mal sucedida", error));
    }
}