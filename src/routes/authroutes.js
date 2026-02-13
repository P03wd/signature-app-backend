// backend/routes/authroutes.js
import express from "express";
import { registerUser, loginUser } from "../controllers/authcontroller.js";

const router = express.Router();

// POST /api/auth/register → Register a new user
router.post("/register", registerUser);

// POST /api/auth/login → Login user
router.post("/login", loginUser);

export default router;
