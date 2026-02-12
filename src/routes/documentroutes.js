import express from "express";
import {
  uploadDocument,
  getMyDocuments,
  downloadDocument,
  inviteSigner,
  signDocument
} from "../controllers/documentcontroller.js";
import upload from "../middleware/uploadmiddleware.js";
import authMiddleware from "../middleware/authmiddleware.js";

import Document from "../models/document.js"; // for /documents route

const router = express.Router();

// Upload a document
router.post("/upload", authMiddleware, upload.single("document"), uploadDocument);

// Fetch documents for logged-in user (owned or allowed to sign)
router.get("/my", authMiddleware, getMyDocuments);

// Download a document
router.get("/download/:id", authMiddleware, downloadDocument);

// Invite a signer
router.post("/invite/:id", authMiddleware, inviteSigner);

// Sign a document
router.post("/sign/:id", authMiddleware, signDocument);

// Optional: fetch all documents (owned or allowed)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const documents = await Document.find({
      $or: [
        { owner: req.user.id },
        { allowedSigners: req.user.id }
      ]
    })
      .populate("owner", "name email")
      .populate("allowedSigners", "name email")
      .populate("signatures.user", "name email");

    res.json(documents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
