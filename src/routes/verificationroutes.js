import express from "express";
import { verifySignature } from "../controllers/verificationcontroller.js";

const router = express.Router();

// Verify a signature for a document
router.post("/verify", verifySignature);

export default router;
