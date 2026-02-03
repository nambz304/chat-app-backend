import { ILike } from "typeorm";
import AppDataSource from "../../config/db.js";
import { User } from "./user.entity.js";
import logger from "../../common/middlewares/logger/logger.js";
export const searchUsers = async (req, res) => {
    try {
        const email = String(req.query.email || "").trim();
        logger.info("[user.search] start", { email });
        if (!email) {
            logger.warn("[user.search] missing email query");
            return res.status(400).json({ message: "Missing email query" });
        }
        const userRepo = AppDataSource.getRepository(User);
        const users = await userRepo.find({
            where: { email: ILike(`%${email}%`) },
            order: { createdAt: "DESC" },
            take: 10,
        });
        logger.info("[user.search] result", { count: users.length });
        const safeUsers = users.map((u) => ({
            id: u.id,
            email: u.email,
            username: u.username,
            status: u.status,
            createdAt: u.createdAt,
        }));
        return res.json({ data: safeUsers });
    }
    catch (error) {
        logger.error("[user.search] error", { error });
        return res.status(500).json({ message: "Search failed", error });
    }
};
//# sourceMappingURL=user.controller.js.map