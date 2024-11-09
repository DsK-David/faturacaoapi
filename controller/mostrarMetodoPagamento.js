import { mostrarMetodoPagamento } from "../repositories/fatura.js";
import { respostaPadrao } from "../utils/responseDefault.js";
export default async function (req,res){
    try {
        const resultado = await mostrarMetodoPagamento()
        res.json(respostaPadrao(true, "Operação bem sucedida",resultado));
    } catch (error) {
        res.json(respostaPadrao(false, "Operação mal sucedida", error));
    }
}