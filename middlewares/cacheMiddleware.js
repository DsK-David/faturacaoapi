// middlewares/cacheMiddleware.js
import Redis from "../utils/redis.js";

export function configureRedis(ttl = 60) {
  return async (req, res, next) => {
    const key = req.originalUrl;

    try {
      const cachedResponse = await Redis.get(key);

      if (cachedResponse) {
        res.json(JSON.parse(cachedResponse));
        return;
      }

      res.locals.cacheKey = key;
      res.locals.cacheTTL = ttl;

      next();
    } catch (error) {
      console.error("Error fetching from cache:", error);
      next();
    }
  };
}

export function setCache(res, data) {
  const { cacheKey, cacheTTL } = res.locals;

  if (!cacheKey || !data) return;

  try {
    Redis.set(cacheKey, JSON.stringify(data), "EX", cacheTTL);
  } catch (error) {
    console.error("Error setting cache:", error);
  }
}

export default Redis; // Exporte o cliente Redis como padrão
