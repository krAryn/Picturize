import express from "express";
import { authUser } from "../middlewares/user.auth.js";
import { generateImage } from "../controllers/image.controller.js";

const imageRouter = express.Router()

imageRouter.post("/generate", authUser, generateImage)

export default imageRouter