import { Request, Response } from "express";
import AppDataSource from "../../config/db.js";
import { Message } from "./message.entity.js";
import logger from "../../common/middlewares/logger/logger.js";

export const getHistory = async (req: Request, res: Response) => {
  try {
    const userId = String(req.query.userId || "").trim();
    const peerId = String(req.query.peerId || "").trim();

    logger.info("[chat.history] start", { userId, peerId });

    if (!userId || !peerId) {
      logger.warn("[chat.history] missing userId or peerId");
      return res.status(400).json({ message: "Missing userId or peerId" });
    }

    const messageRepo = AppDataSource.getRepository(Message);
    const messages = await messageRepo
      .createQueryBuilder("m")
      .leftJoinAndSelect("m.sender", "sender")
      .leftJoinAndSelect("m.receiver", "receiver")
      .where("m.senderId = :userId AND m.receiverId = :peerId", { userId, peerId })
      .orWhere("m.senderId = :peerId AND m.receiverId = :userId", { userId, peerId })
      .orderBy("m.createdAt", "ASC")
      .getMany();

    logger.info("[chat.history] result", { count: messages.length });

    const payload = messages.map((m) => ({
      id: m.id,
      fromUserId: m.sender?.id,
      toUserId: m.receiver?.id,
      content: m.content,
      type: m.type,
      createdAt: m.createdAt,
    }));

    return res.json({ data: payload });
  } catch (error) {
    logger.error("[chat.history] error", { error });
    return res.status(500).json({ message: "History failed", error });
  }
};
