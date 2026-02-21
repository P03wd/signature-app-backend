// backend/src/routes/auditroutes.js
import express from "express";
import { getAudits } from "../controllers/auditcontroller.js";
import authMiddleware from "../middleware/authmiddleware.js"; // ensures user is logged in

const router = express.Router();

/* =====================================================
   GET AUDIT LOGS FOR A DOCUMENT
   Accessible by any logged-in user
===================================================== */
router.get("/:docId", authMiddleware, getAudits);

export default router;