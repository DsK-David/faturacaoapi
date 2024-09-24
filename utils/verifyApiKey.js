export function verifyApiKey(req, res, next) {
  const apikey = req.headers["authorization"];
  const validApiKey = process.env.APIKEY;

  if (!apikey || apikey !== validApiKey) {
    return res.status(401).json({ message: "a chave da api esta faltando" });
  }
  next();
}
