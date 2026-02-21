import Document from "../models/document.js";

export const verifySignature = async (req, res) => {
  try {
    const { documentId, signatureData } = req.body;

    const doc = await Document.findById(documentId)
      .populate("signatures.user", "name email");

    if (!doc) return res.status(404).json({ message: "Document not found" });

    const signature = doc.signatures.find(
      s => s.signatureData === signatureData
    );

    if (!signature)
      return res.status(404).json({ message: "Signature invalid" });

    res.json({
      message: "Signature verified",
      signature,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};