import type { Request, Response, NextFunction } from "express";
export declare const authGoogle: (_req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
export declare const authGoogleCallback: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const authMe: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=auth.controller.d.ts.map