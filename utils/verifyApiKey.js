// middlewares/verifyApiKey.js
export const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers["api-key"];
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: "Chave de API inválida" });
  }
  next();
};
