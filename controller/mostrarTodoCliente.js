import { mostrarClientes } from "../repositories/cliente.js";
import { respostaPadrao } from "../utils/responseDefault.js";
export default async function (request, response) {
  try {
    const resultado = await mostrarClientes();
    response
      .status(200)
      .json(respostaPadrao(true,"Operação bem sucedida",resultado));
  } catch (error) {
    response
      .status(422)
      .send(respostaPadrao(false, "Operação mal sucedida", error));
  }
}
//  return respostaPadrao(true, "Operação bem sucedida", clienteByEntidade);