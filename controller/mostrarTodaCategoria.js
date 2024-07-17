import { mostrarTodaCategoria } from "../repositories/categorias.js";
export default async function (req,res){
    try {
        const categoria = await mostrarTodaCategoria()
        res.status(200).send(categoria)
    } catch (error) {
        response.status(422).send({ error: error.message });
    }
}