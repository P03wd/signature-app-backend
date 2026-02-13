import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import Document from "../models/document.js";
import User from "../models/user.js";


/**
 * GET ALL DOCUMENTS (ADMIN / TESTING)
 */
export const getDocuments = async (req, res) => {
  try {
    const docs = await Document.find()
      .populate("owner", "name email")
      .populate("allowedSigners", "name email")
      .populate("signatures.user", "name email");

    res.status(200).json(docs);
  } catch (error) {
    console.error("GET DOCUMENTS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


/**
 * GET MY DOCUMENTS
 * Shows documents:
 * 1) uploaded by user
 * 2) user invited to sign
 */

   export const getMyDocuments = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const docs = await Document.find({
      $or: [
        { owner: req.user.id },
        { allowedSigners: req.user.id }
      ]
    })
      .populate("owner", "name email")
      .populate("allowedSigners", "name email")
      .populate("signatures.user", "name email");

    res.status(200).json(docs);

  } catch (error) {
    console.error("GET MY DOCUMENTS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};



/**
 * UPLOAD DOCUMENT
 */
export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const doc = await Document.create({
      owner: req.user.id,
      originalName: req.file.originalname,
      storedName: req.file.originalname,
      filePath: req.file.path,
      allowedSigners: [],
      signatures: [],
      status: "pending",
    });

    res.status(201).json({
      message: "File uploaded successfully",
      document: doc,
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


/**
 * DOWNLOAD DOCUMENT
 * Only owner allowed
 */
export const downloadDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);

    if (!doc)
      return res.status(404).json({ message: "Document not found" });

    if (doc.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Only owner can download" });

    const absolutePath = path.join(process.cwd(), doc.filePath);

    if (!fs.existsSync(absolutePath))
      return res.status(404).json({ message: "File missing on server" });

    res.download(absolutePath, doc.originalName);

  } catch (error) {
    console.error("DOWNLOAD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


/**
 * INVITE SIGNER
 */
export const inviteSigner = async (req, res) => {
  try {
    const { email } = req.body;

    const doc = await Document.findById(req.params.id);
    if (!doc)
      return res.status(404).json({ message: "Document not found" });

    if (doc.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Only owner can invite" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const alreadyInvited = doc.allowedSigners.includes(user._id);
    if (alreadyInvited)
      return res.status(400).json({ message: "User already invited" });

    doc.allowedSigners.push(user._id);
    await doc.save();

    res.json({
      message: "Signer invited successfully",
      document: doc,
    });

  } catch (error) {
    console.error("INVITE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


/**
 * SIGN DOCUMENT
 */
export const signDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);

    if (!doc)
      return res.status(404).json({ message: "Document not found" });

    const isInvited = doc.allowedSigners.some(
      id => id.toString() === req.user.id
    );

    if (!isInvited)
      return res.status(403).json({ message: "Not invited to sign" });

    const alreadySigned = doc.signatures.some(
      sig => sig.user.toString() === req.user.id
    );

    if (alreadySigned)
      return res.status(400).json({ message: "Already signed" });

    doc.signatures.push({ user: req.user.id });

    doc.status =
      doc.signatures.length === doc.allowedSigners.length
        ? "signed"
        : "partially_signed";

    await doc.save();

    const populatedDoc = await Document.findById(doc._id)
      .populate("owner", "name email")
      .populate("allowedSigners", "name email")
      .populate("signatures.user", "name email");

    res.json({
      message: "Document signed successfully",
      document: populatedDoc,
    });

  } catch (error) {
    console.error("SIGN ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
