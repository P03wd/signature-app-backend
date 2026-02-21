// backend/src/routes/signatureroutes.js
import express from "express";
import { signDocument, getSignatures } from "../controllers/signaturecontroller.js";
import authMiddleware from "../middleware/authmiddleware.js";
import auditLogger from "../middleware/auditlogger.js";

const router = express.Router();

/* =====================================================
   SIGN DOCUMENT
   Any logged-in user can sign any document
===================================================== */
router.post(
  "/sign/:documentId",
  authMiddleware,
  auditLogger("SIGN_DOCUMENT"),
  signDocument
);

/* =====================================================
   GET ALL SIGNATURES
   Any logged-in user can view signatures
===================================================== */
router.get(
  "/list/:documentId",
  authMiddleware,
  auditLogger("VIEW_SIGNATURES"),
  getSignatures
);

export default router;