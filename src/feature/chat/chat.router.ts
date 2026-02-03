import { Router } from "express";
import { getHistory } from "./chat.controller.js";

const chatRouter = Router();

chatRouter.get("/history", getHistory);

export default chatRouter;
