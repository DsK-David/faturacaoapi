import { mostrarProduto } from "../repositories/produto.js";
export default async function (req,res){
    try {
        const resultado = await mostrarProduto()
        res.status(200).send(resultado)
    } catch (error) {
        
    }
}