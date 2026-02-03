import { Router } from "express";
import { searchUsers } from "./user.controller.js";

const userRouter = Router();

userRouter.get("/search", (req, res, next) => {
	console.info("[user.search] route hit", { query: req.query });
	return searchUsers(req, res);
});

export default userRouter;
