import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


// Path: /api/user/register
export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body
        if (!name || !email || !password) {
            return res.json({success: false, message: "Missing Details!"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.findOne({email})

        if (user) {
            return res.json({success: false, message: "User Already exist, Please Login"})
        }

        const userData = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({id: userData._id}, process.env.JWT_SECRET, {
            expiresIn: "7h"
        })

        res.cookie("token", token)

        return res.json({
            success: true,
            user: {
                name: userData.name,
                email: userData.email,
                creditBalance: userData.creditBalance
            }
        })

    } catch (error) {
        console.log("Couldn't Complete user Registration \nError: ", error.message)
        return res.json({success: false, message: error.message})
    }
}

// Path: /api/user/login
export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body

        if (!email || !password) {
            return res.json({success: false, message: "Missing Details!"})
        }

        const user = await User.findOne({email})

        if (!user) {
            return res.json({success: false, message: "User Not Found!"})
        }

        console.log("Password: ", password, "\nHash: ", user.password)

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid Credentials!"
            })
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "7h"
        })

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 60 * 60 * 1000
        })

        return res.json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                creditBalance: user.creditBalance
            }
        })
    } catch (error) {
        console.log("Couldn't Complete user Login \nError: ", error.message)
        return res.json({success: false, message: error.message})
    }
}

// Path: /api/user/is-auth
export const isAuth = async (req, res) => {
    try {
        const {user_id} = req.headers

        const user = await User.findById(user_id).select("-password")

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        return res.json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                creditBalance: user.creditBalance
            }
        })
    } catch (error) {
        console.log("Couldn't Complete user Authorization \nError: ", error.message)
        return res.json({success: false, message: error.message})
    }
}

// Path: /api/user/credits
export const userCredits = async (req, res) => {
    try {
        const {user_id} = req.headers
        console.log("User ID: ", user_id)

        const user = await User.findById(user_id)

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        return res.json({
            success: true,
            credits: user.creditBalance,
            user: {name: user.name}
        })

    } catch (error) {
        console.log("Couldn't fetch user credits \nError: ", error.message)
        return res.json({success: false, message: error.message})
    }
}

// Path: /api/user/logout 
export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            maxAge: 7 * 60 * 60 * 1000
        })

        return res.json({success: true, message: "Logged Out"})
    } catch (error) {
        console.log("Can't Log out \nError: ", error.message)
        return res.json({success: false, message: error.message})
    }
}