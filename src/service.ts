import "reflect-metadata";
import express from "express";
import { createServer } from "http";
import  AppDataSource  from "./config/db.js";
import authRouter from "./feature/auth/auth.router.js";
import userRouter from "./feature/user/user.router.js";
import chatRouter from "./feature/chat/chat.router.js";
import dotenv from 'dotenv';
import logger from './common/middlewares/logger/logger.js';
import cors from 'cors';
import { initSocket } from "./config/socket.js";

dotenv.config();

const app = express();
const server = createServer(app);
const HTTP_PORT = Number(process.env.HTTP_PORT || 8080);



//middle ware
app.use(express.json());
app.use(cors());

// routes
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/chat", chatRouter);
app.get("/health", (_req, res) => {
  res.json({ ok: true });
});


//run server
const start = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    initSocket(server, AppDataSource);
    server.listen(HTTP_PORT, () => {
      logger.info(`Server running on port ${HTTP_PORT}`);
    });
  } catch (err) {
    logger.error(`DB init failed: ${err}`);
    console.log(err);
    process.exit(1);
  }
};

start();