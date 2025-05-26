import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Stripe from "stripe"

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

// Path: /api/user/init-pay
export const initiatePayment = async (req, res) => {
    try {
        const {user_id} = req.headers
        const {planName, desc, amount, credits} = req.body

        const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

        const line_items = [
            {
                price_data: {
                    currency: "inr",
                    unit_amount: amount * 100,
                    product_data: {
                        name: planName,
                        description: desc
                    }
                },
                quantity: 1
            }
        ]

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/result?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/buy-credit`,
            metadata: {
                user_id,
                planName,
                credits
            }
        })

        return res.json({success: true, url: session.url, id: session.id})

    } catch (error) {
        console.log("Payment Initiations Failed \nError: ", error.message)
        return res.json({success: false, message: error.message})
    }
}

// Path: /api/user/verify-pay
export const verifyPayment = async (req, res) => {
    try {
        const {session_id, user_id} = req.headers

        const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
        
        const session = await stripe.checkout.sessions.retrieve(session_id)

        if (session.payment_status === "paid") {
            // paid
            const user = await User.findById(user_id)
            await User.findByIdAndUpdate(user_id, {creditBalance: user.creditBalance + Number(session.metadata.credits)})
            return res.json({success: true, message: "Payment Successful"})
        } else {
            // unpaid
            return res.json({success: false, message: "Payment Failed! Please Retry."})
        }
    } catch (error) {
        console.log("Payment Verification Failed \nError: ", error.message)
        return res.json({success: false, message: error.message})
    }
}