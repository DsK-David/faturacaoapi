// middlewares/loggerMiddleware.js
import logger from "../utils/logger.js";
export const loggerMiddleware = (io) => (req, res, next) => {
  const logMessage = `${req.method} ${req.url}`;
  logger.info(logMessage);
  io.emit("log", logMessage);
  next();
};

