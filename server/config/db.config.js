import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI + "/PicturizeDB")
        console.log("PicturizeDB connected successfully")
    } catch (error) {
        console.log("Couldn't connect to DB \nError: ", error.message)
    }
}