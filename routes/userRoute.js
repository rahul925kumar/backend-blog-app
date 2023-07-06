import express from "express";
const router = express.Router();

import { registerUser } from "../controllers/UserController.js";

router.post('/register', registerUser)

export default router;