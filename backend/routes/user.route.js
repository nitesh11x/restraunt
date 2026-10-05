import express from "express";
import { getAllUsers, loginUser, registerUser } from "../controllers/user.controller.js";
import { isAdminAuth, } from "../middlewares/auth.middleware.js";
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/all', isAdminAuth, getAllUsers)

export default router