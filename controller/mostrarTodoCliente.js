import { mostrarClientes } from "../repositories/cliente.js";
export default async function (request, response) {
  try {
    const resultado = await mostrarClientes();
    response.status(200).send(resultado);
  } catch (error) {
    response.status(422).send({ error: error.message });
  }
}