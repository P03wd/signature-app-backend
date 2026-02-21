import Document from "../models/document.js";
import fs from "fs";

/* ================= UPLOAD ================= */
export const uploadDocument = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No file uploaded" });

    const doc = await Document.create({
      originalName: req.file.originalname,
      filePath: req.file.path,
      owner: req.user._id,
      status: "pending",
      allowedSigners: [],
    });

    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};


/* ================= GET ALL DOCS ================= */
export const getDocuments = async (req, res) => {
  try {
    const docs = await Document.find()
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};


/* ================= DELETE ================= */
export const deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Doc not found" });

    // allow ALL users
    if (fs.existsSync(doc.filePath)) {
      fs.unlinkSync(doc.filePath);
    }

    await doc.deleteOne();

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};


/* ================= DOWNLOAD ================= */
export const downloadDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Doc not found" });

    res.download(doc.filePath, doc.originalName);
  } catch (err) {
    res.status(500).json({ message: "Download failed" });
  }
};


/* ================= SIGN ================= */
export const signDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Doc not found" });

    doc.status = "signed";
    doc.signedAt = new Date();
    doc.signedBy = req.user.email;

    await doc.save();

    res.json({ message: "Signed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Sign failed" });
  }
};


/* ================= INVITE ================= */
export const inviteSigner = async (req, res) => {
  try {
    const { email } = req.body;
    const { id } = req.params;

    const doc = await Document.findById(id);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    doc.allowedSigners.push(email);
    await doc.save();

    res.json({ message: "User invited successfully" });
  } catch (err) {
    res.status(500).json({ message: "Invite failed" });
  }
};