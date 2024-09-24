export async function enviarDadosAoWebHook(payload) {
  try {
    const p = JSON.stringify(payload);
    const url =
      "https://webhook.site/e36f0e46-2970-42fe-ba22-7f3349432fba?p=" +
      encodeURIComponent(p);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erro ao enviar dados para o webhook");
    }
  } catch (error) {
    console.error("Erro ao enviar notificação", error);
  }
}
