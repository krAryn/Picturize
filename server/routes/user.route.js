import express from "express";
import { registerUser, loginUser, isAuth, userCredits, logout } from "../controllers/user.controller.js";
import { authUser } from "../middlewares/user.auth.js";

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.get("/is-auth", authUser, isAuth)
userRouter.post("/login", loginUser)
userRouter.get("/credits", authUser, userCredits)
userRouter.get("/logout", logout)

export default userRouter;