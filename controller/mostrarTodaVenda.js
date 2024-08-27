import { mostrarTodaCategoria } from "../repositories/categorias.js";
import { mostrarTodaAsVendas } from "../repositories/vendas.js";
export default async function (req,res){
    try {
        const vendas = await mostrarTodaAsVendas()
        res.status(200).send(vendas)
    } catch (error) {
        response.status(422).send({ error: error.message });
    }
}