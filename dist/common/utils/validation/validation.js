import { z, ZodError } from "zod";
import logger from '../../middlewares/logger/logger.js';
export const validate = (schema) => (req, res, next) => {
    logger.info('---validate');
    try {
        // Ép kiểu 'any' tạm thời cho input để Zod xử lý gom nhóm body, query, params
        const parsed = schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        // Cập nhật lại các giá trị đã qua xử lý (trim, transform, v.v.)
        if (parsed.body)
            req.body = parsed.body;
        if (parsed.query)
            req.query = parsed.query;
        if (parsed.params)
            req.params = parsed.params;
        next();
    }
    catch (err) {
        if (err instanceof ZodError) {
            return res.status(400).json({
                message: "Validation error",
                errors: err.issues.map((i) => ({
                    path: i.path.join("."),
                    message: i.message,
                })),
            });
        }
        next(err);
    }
};
export { z };
//# sourceMappingURL=validation.js.map