import jwt from "jsonwebtoken"

export const authUser = (req, res, next) => {
    try {
        const {token} = req.cookies
        if (!token) {
            return res.json({success: false, message: "Token not Found!"})
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET)

        req.headers.user_id = payload.id
        next()
    } catch (error) {
        console.log("User Authorization Failed \nError: ", error.message)
        return res.json({success: false, message: error.message})
    }
}