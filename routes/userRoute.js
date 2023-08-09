import express from "express";
const router = express.Router();

import { registerUser, loginUser, userProfile, updateProfile, updateProfilePicture } from "../controllers/UserController.js";
import { authGuard } from "../middleware/index.js";
import { uploadPicture } from "../middleware/uploadPictureMiddleware.js";
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', authGuard, userProfile)
router.put('/update', authGuard, updateProfile)
router.put('/update/profile/picture', authGuard, updateProfilePicture)


export default router;