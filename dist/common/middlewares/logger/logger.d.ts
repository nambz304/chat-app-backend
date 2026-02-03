import winston from "winston";
import type { Request, Response, NextFunction } from "express";
declare const logger: winston.Logger;
export declare const requestLogger: (req: Request, _res: Response, next: NextFunction) => void;
export default logger;
//# sourceMappingURL=logger.d.ts.map