// backend/routes/signatureroutes.js
import express from "express";
import { signDocument, getSignatures } from "../controllers/signaturecontroller.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/signatures/sign/:documentId
 * @desc    Sign a document (logs audit)
 * @access  Authenticated users
 */
router.post("/sign/:documentId", authMiddleware, signDocument);

/**
 * @route   GET /api/signatures/list/:documentId
 * @desc    Get all signatures for a document
 * @access  Authenticated users
 */
router.get("/list/:documentId", authMiddleware, getSignatures);

export default router;
