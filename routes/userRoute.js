import express from "express";
const router = express.Router();

import { registerUser, loginUser, userProfile, updateProfile } from "../controllers/UserController.js";

import { authGuard } from "../middleware/index.js";
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', authGuard, userProfile)
router.put('/update', authGuard, updateProfile)


export default router;