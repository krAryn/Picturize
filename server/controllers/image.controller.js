import axios from "axios"
import User from "../models/user.model.js"

// Path: /api/image/generate
export const generateImage = async (req, res) => {
    try {
        const {user_id} = req.headers
        const {prompt} = req.body
        
        const user = await User.findById(user_id)

        if (!user || !prompt) {
            return res.json({success: false, message: "Missing Details"})
        }

        if (user.creditBalance === 0) {
            return res.json({success: false, message: "No Credit Balance", creditBalance: user.creditBalance})
        }

        const formData = new FormData()
        formData.append("prompt", prompt)

        const {data} = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: {
                "x-api-key": process.env.CLIPDROP_API_KEY
            },
            responseType: 'arraybuffer'
        })

        const base64image = Buffer.from(data, 'binary').toString("base64")
        const resultImage = `data:image/png;base64,${base64image}`

        await User.findByIdAndUpdate(user._id, {creditBalance: user.creditBalance - 1})

        return res.json({success: true, creditBalance: user.creditBalance - 1, resultImage})

    } catch (error) {
        console.log("Couldn't Generate Image \nError: ", error.message)
        return res.json({success: false, message: error.message})
    }
}