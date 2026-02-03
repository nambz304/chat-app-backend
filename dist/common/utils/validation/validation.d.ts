import { z } from "zod";
import type { Request, Response, NextFunction } from "express";
export declare const validate: <T>(schema: z.ZodType<T>) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export { z };
//# sourceMappingURL=validation.d.ts.map