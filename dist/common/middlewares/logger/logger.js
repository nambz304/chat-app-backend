import winston from "winston";
const logger = winston.createLogger({
    level: "info",
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
});
export const requestLogger = (req, _res, next) => {
    logger.info("[http] request", { method: req.method, url: req.originalUrl, ip: req.ip });
    next();
};
export default logger;
//# sourceMappingURL=logger.js.map