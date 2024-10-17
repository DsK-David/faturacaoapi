import { adicionarClientePorEntidade } from "../repositories/cliente.js";

export default async function (req,res){
    try {
        const { DESIG, EMAIL, TELEFONE, Entidade_ID } = req.body;
        const cliente = await adicionarClientePorEntidade(DESIG,EMAIL,TELEFONE,Entidade_ID)
        res
          .status(201)
          .json(respostaPadrao(true, "Operação bem sucedida", resultado));
    } catch (error) {
        res
          .status(500)
          .json(respostaPadrao(false, "Operação mal sucedida", error));
    }
}