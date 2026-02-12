import fs from "fs";
import path from "path";
import Doc from "../models/document.js";

export const verifySignature = async (req, res) => {
  try {
    const { docId, signerId } = req.body;

    // 1. Find the document
    const document = await Doc.findById(docId);
    if (!document) return res.status(404).json({ message: "Document not found" });

    // 2. Check if the signer has signed
    const signature = document.signatures.find(sig => sig.user.toString() === signerId);
    if (!signature) return res.status(400).json({ message: "Signature not found" });

    // 3. Verify signature (for simplicity, check if signature exists)
    // TODO: Add real cryptographic verification if needed

    res.status(200).json({ message: "Signature verified", signature });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
