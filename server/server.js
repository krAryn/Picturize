import express from "express"
import cors from "cors"
import 'dotenv/config'
import { dbConnect } from "./config/db.config.js"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.route.js"
import imageRouter from "./routes/image.route.js"

const PORT = process.env.PORT || 4000
const app = express()

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use("/api/user", userRouter)
app.use("/api/image", imageRouter)

await dbConnect()

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log("API is running!")
})