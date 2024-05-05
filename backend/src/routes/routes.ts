import { Router } from "express";
import { chatController } from "../controller/chatController";
export const chatRouter = Router();

// chatRouter.post("/singup", chatController.singUp);
chatRouter.post("/rooms/messages", chatController.messages);
