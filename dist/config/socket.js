import { Server } from "socket.io";
import { User } from "../feature/user/user.entity.js";
import { Message } from "../feature/chat/message.entity.js";
import logger from "../common/middlewares/logger/logger.js";
export const initSocket = (server, dataSource) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
            methods: ["GET", "POST"],
        },
    });
    io.on("connection", (socket) => {
        logger.info("[socket] connected", { socketId: socket.id });
        socket.on("register", (userId) => {
            logger.info("[socket.register] received", { socketId: socket.id, userId });
            if (userId) {
                socket.join(userId);
                logger.info("[socket.register] joined room", { socketId: socket.id, userId });
            }
        });
        socket.on("dm", async (payload) => {
            try {
                const { fromUserId, toUserId, text } = payload;
                logger.info("[socket.dm] received", { fromUserId, toUserId, hasText: !!text });
                if (!fromUserId || !toUserId || !text) {
                    logger.warn("[socket.dm] invalid payload", { fromUserId, toUserId });
                    return;
                }
                const userRepo = dataSource.getRepository(User);
                const messageRepo = dataSource.getRepository(Message);
                const sender = await userRepo.findOne({ where: { id: fromUserId } });
                const receiver = await userRepo.findOne({ where: { id: toUserId } });
                if (!sender || !receiver) {
                    logger.warn("[socket.dm] sender/receiver not found", { fromUserId, toUserId });
                    return;
                }
                const message = messageRepo.create({
                    sender,
                    receiver,
                    content: text,
                    type: "text",
                    room: null,
                });
                const saved = await messageRepo.save(message);
                const outbound = {
                    id: saved.id,
                    fromUserId,
                    toUserId,
                    content: saved.content,
                    type: saved.type,
                    createdAt: saved.createdAt,
                };
                io.to(toUserId).emit("dm", outbound);
                io.to(fromUserId).emit("dm", outbound);
                logger.info("[socket.dm] emitted", { id: saved.id, fromUserId, toUserId });
            }
            catch (error) {
                logger.error("[socket.dm] error", { error });
            }
        });
    });
    return io;
};
//# sourceMappingURL=socket.js.map