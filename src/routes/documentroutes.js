// backend/routes/documentroutes.js
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
import Document from "../models/document.js";

const router = express.Router();

/**
 * @route   POST /api/documents/upload
 * @desc    Upload a document (PDF)
 * @access  Authenticated users
 */
router.post("/upload", authMiddleware, upload.single("document"), uploadDocument);

/**
 * @route   GET /api/documents/my
 * @desc    Get documents owned by user or assigned to user
 * @access  Authenticated users
 */
router.get("/my", authMiddleware, getMyDocuments);

/**
 * @route   GET /api/documents/download/:id
 * @desc    Download a document (owner only)
 * @access  Authenticated users
 */
router.get("/download/:id", authMiddleware, downloadDocument);

/**
 * @route   POST /api/documents/invite/:id
 * @desc    Invite a user to sign a document
 * @access  Authenticated users
 */
router.post("/invite/:id", authMiddleware, inviteSigner);

/**
 * @route   POST /api/documents/sign/:id
 * @desc    Sign a document
 * @access  Authenticated users
 */
router.post("/sign/:id", authMiddleware, signDocument);

/**
 * @route   GET /api/documents/
 * @desc    Optional: Fetch all documents related to the user
 * @access  Authenticated users
 */
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
    console.error("DOCUMENT ROUTES ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
