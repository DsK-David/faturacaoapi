import winston from "winston";
import { adicionarLog } from "../repositories/log.js";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),

    winston.format.printf(({ timestamp, level, message }) => {
      const formato = `${timestamp} [${level}]: ${message}`;
       return formato;
    })
    
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "api.log" }),
  ],
});

export default logger;
