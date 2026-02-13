import Doc from "../models/document.js";
import mongoose from "mongoose";

export const verifySignature = async (req, res) => {
  try {
    const { docId, signerId } = req.body;

    // Validate input
    if (!docId || !signerId) {
      return res.status(400).json({ message: "docId and signerId are required" });
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(docId) || !mongoose.Types.ObjectId.isValid(signerId)) {
      return res.status(400).json({ message: "Invalid document or signer ID" });
    }

    // Find document
    const document = await Doc.findById(docId);
    if (!document) return res.status(404).json({ message: "Document not found" });

    // Find signature
    const signature = document.signatures.find(sig => sig.user.toString() === signerId);
    if (!signature) return res.status(400).json({ message: "Signature not found" });

    // Verification logic (placeholder)
    res.status(200).json({ message: "Signature verified", signature: { user: signature.user, signedAt: signature.signedAt } });

  } catch (error) {
    console.error("VERIFY SIGNATURE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
