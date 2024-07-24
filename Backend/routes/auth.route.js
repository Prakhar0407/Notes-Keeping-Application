import express from "express"
import { login, logout, register } from "../controller/auth.controller.js"
import { verifyToken } from "../utils/verifyUser.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/logout", verifyToken, logout)

export default router
