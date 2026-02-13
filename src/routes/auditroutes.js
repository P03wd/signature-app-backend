// backend/routes/auditroutes.js
import express from "express";
import Audit from "../models/audit.js"; // default export
import authMiddleware from "../middleware/authmiddleware.js";
import auditLogger from "../middleware/auditlogger.js";

const router = express.Router();

// Home route for audits
router.get("/", (req, res) => {
  res.send("Audit route");
});

// Get audit logs for a document
router.get("/:documentId", authMiddleware, async (req, res) => {
  try {
    // Match schema fields: 'document' and 'user'
    const logs = await Audit.find({ document: req.params.documentId })
      .populate("user", "name email");
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching audit logs" });
  }
});

// Log a signing action
router.post("/log-sign", authMiddleware, auditLogger("signed"), (req, res) => {
  res.json({ message: "Audit logged" });
});

export default router;
