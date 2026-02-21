// backend/src/routes/documentroutes.js
import express from "express";
import authMiddleware from "../middleware/authmiddleware.js"; // updated auth
import uploadMiddleware from "../middleware/uploadmiddleware.js"; // for PDFs
import auditLogger from "../middleware/auditlogger.js";

import {
  uploadDocument,
  getDocuments,
  deleteDocument,
  signDocument,
  inviteSigner
} from "../controllers/documentcontroller.js";

const router = express.Router();

/* =====================================================
   UPLOAD DOCUMENT
   Any logged-in user can upload
===================================================== */
router.post(
  "/upload",
  authMiddleware,
  uploadMiddleware.single("document"),
  auditLogger("UPLOAD_DOCUMENT"),
  uploadDocument
);

/* =====================================================
   GET ALL DOCUMENTS
   Any logged-in user can fetch all documents
===================================================== */
router.get("/", authMiddleware, getDocuments);

/* =====================================================
   DELETE DOCUMENT
   Any logged-in user can delete any document
===================================================== */
router.delete(
  "/:id",
  authMiddleware,
  auditLogger("DELETE_DOCUMENT"),
  deleteDocument
);

/* =====================================================
   SIGN DOCUMENT
   Any logged-in user can sign any document
===================================================== */
router.post(
  "/:id/sign",
  authMiddleware,
  auditLogger("SIGN_DOCUMENT"),
  signDocument
);

/* =====================================================
   INVITE SIGNER
   Any logged-in user can invite any other user
===================================================== */
router.post(
  "/:id/invite",
  authMiddleware,
  auditLogger("INVITE_USER"),
  inviteSigner
);

export default router;