import Document from "../models/document.js";
import Audit from "../models/audit.js";

/**
 * SIGN DOCUMENT
 */
export const signDocument = async (req, res) => {
  try {
    const documentId = req.params.documentId;
    const userId = req.user.id;

    // Find the document
    const doc = await Document.findById(documentId);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    // Check if user is allowed to sign
    const isInvited = doc.allowedSigners.some(
      id => id.toString() === userId
    );
    if (!isInvited)
      return res.status(403).json({ message: "User not invited to sign this document" });

    // Check if already signed
    const alreadySigned = doc.signatures.some(
      sig => sig.user.toString() === userId
    );
    if (alreadySigned)
      return res.status(400).json({ message: "User already signed this document" });

    // Add signature
    doc.signatures.push({ user: userId, signedAt: new Date() });

    // Update status
    doc.status =
      doc.signatures.length === doc.allowedSigners.length
        ? "signed"
        : "partially_signed";

    await doc.save();

    // Log audit
    await Audit.create({
      user: userId,
      action: "SIGNED_DOC",
      document: doc._id,
    });

    // Populate for frontend
    const populatedDoc = await Document.findById(doc._id)
      .populate("owner", "name email")
      .populate("allowedSigners", "name email")
      .populate("signatures.user", "name email");

    res.status(200).json({
      message: `Document "${doc.originalName}" signed successfully`,
      document: populatedDoc,
    });
  } catch (err) {
    console.error("SIGNATURE ERROR:", err);
    res.status(500).json({ message: "Error signing document" });
  }
};

/**
 * GET ALL SIGNATURES FOR A DOCUMENT
 */
export const getSignatures = async (req, res) => {
  try {
    const documentId = req.params.documentId;

    const doc = await Document.findById(documentId)
      .populate("signatures.user", "name email");
    if (!doc) return res.status(404).json({ message: "Document not found" });

    res.status(200).json({
      documentId: doc._id,
      signatures: doc.signatures,
    });
  } catch (err) {
    console.error("GET SIGNATURES ERROR:", err);
    res.status(500).json({ message: "Error fetching signatures" });
  }
};
