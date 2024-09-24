import { adicionarClientePorEntidade } from "../repositories/cliente.js";

export default async function (req,res){
    try {
        const { DESIG, EMAIL, TELEFONE, Entidade_ID } = req.body;
        const cliente = await adicionarClientePorEntidade(DESIG,EMAIL,TELEFONE,Entidade_ID)
        res.status(201).send(cliente)
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}