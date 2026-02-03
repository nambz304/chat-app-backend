import winston from "winston";
import type { Request, Response, NextFunction } from "express";


const logger = winston.createLogger({
  level: "info",
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
});

export const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  logger.info("[http] request", { method: req.method, url: req.originalUrl, ip: req.ip });
  next();
};

export default logger;