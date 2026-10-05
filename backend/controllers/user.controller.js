import { User } from "../models/User.schema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {

    const { name, email, password, phoneNo } = req.body
    if (!name || !email || !password || !phoneNo)
        return res.status(400).json({
            success: false, message: "all fields are required"
        })

    try {
        const isExist = await User.findOne({ email })
        if (isExist)
            return res.status(400).json({ message: "user is already registerd", success: false })

        const hasPass = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hasPass, phoneNo })
        return res.status(201).json({ success: true, message: "user registerd successfully", user })

    } catch (error) {
        res.status(400).json({ message: error, sucess: false })
    }

}

export const loginUser = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "all fields are required" })
    }

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({ message: "user not registerd please check email", success: false })
    }
    const isMatch = await bcrypt.compare(password, user.password)


    if (!isMatch) return res.status(400).json({ success: "false", message: "invalid credentials" })

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })

    res.cookie("userToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60000,
    })

    return res.status(201).json({ success: true, message: "user login success", token })


}
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        if (!users) return res.status(404).json({ success: false, message: "user not found" })
        return res.status(200).json({ message: "all users fetch successfully ", success: true, users })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error, success: false })
    }
}
