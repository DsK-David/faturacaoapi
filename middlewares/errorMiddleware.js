// middlewares/errorMiddleware.js
import logger from "../utils/logger.js";
export const errorMiddleware = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).json({ error: err.message });
};
