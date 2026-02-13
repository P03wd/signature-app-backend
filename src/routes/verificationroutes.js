// backend/routes/verificationroutes.js
import express from "express";
import { verifySignature } from "../controllers/verificationcontroller.js";

const router = express.Router();

/**
 * @route   POST /api/verification/verify
 * @desc    Verify a signature for a document
 * @access  Public (or add authMiddleware if you want private access)
 */
router.post("/verify", verifySignature);

export default router;
