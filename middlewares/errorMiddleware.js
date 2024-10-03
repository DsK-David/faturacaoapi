// middlewares/errorMiddleware.js
export const errorMiddleware = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).json({ error: err.message });
};
