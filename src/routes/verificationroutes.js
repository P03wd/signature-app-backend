// backend/src/routes/verificationroutes.js
import express from "express";
import { verifySignature } from "../controllers/verificationcontroller.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

/* =====================================================
   VERIFY SIGNATURE
   Optional: Auth-protected if you want logged-in users only
===================================================== */
router.post("/verify", /* authMiddleware, */ verifySignature);

export default router;