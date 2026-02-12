// backend/routes/signatureroutes.js
import express from "express";
import { signDocument, getSignatures } from "../controllers/signaturecontroller.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

// Example routes
router.post("/sign/:documentId", authMiddleware, signDocument);
router.get("/list/:documentId", authMiddleware, getSignatures);

export default router; // <-- default export!
