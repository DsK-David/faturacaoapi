export function respostaPadrao(sucesso, mensagem, dados) {
  return {
    success: sucesso,
    msg: mensagem,
    data: dados || [null],
  };
}
