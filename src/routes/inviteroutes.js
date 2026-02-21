// backend/src/routes/inviteroutes.js
import express from "express";
import authMiddleware from "../middleware/authmiddleware.js"; // ensures logged-in users
import auditLogger from "../middleware/auditlogger.js";

import {
  sendInvite,
  getDocByToken,
  signByToken //so match controller
} from "../controllers/invitecontroller.js";

const router = express.Router();

/* =====================================================
   SEND INVITE
   Any logged-in user can invite anyone to sign
===================================================== */
router.post(
  "/:docId",
  authMiddleware,
  auditLogger("INVITE_USER"),
  sendInvite
);

/* =====================================================
   GET DOCUMENT BY TOKEN (public)
   Anyone with token can view
===================================================== */
router.get("/public/:token", getDocByToken);

/* =====================================================
   SIGN DOCUMENT BY TOKEN (public)
   Anyone with token can sign
===================================================== */
router.post(
  "/sign/:token",
  auditLogger("SIGN_DOCUMENT"),
  signByToken
);

export default router;