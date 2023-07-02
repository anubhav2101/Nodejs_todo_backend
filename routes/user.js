import express from "express"
import {register , login, getMyProfile, logout} from "../controllers/user.js"
import { isAuthcaited } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register" , register)
router.post("/login" , login)

router.get("/my-profile" , isAuthcaited , getMyProfile)
router.get('/logout' , logout)

export default router ;


