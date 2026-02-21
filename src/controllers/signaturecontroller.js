import Document from "../models/document.js";

/* SIGN */
export const signDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.documentId);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    const { signatureData, pageNumber, x, y } = req.body;

    doc.signatures.push({
      user: req.user._id,
      signatureData,
      pageNumber,
      x,
      y,
      signedAt: new Date(),
    });

    doc.status = "signed";
    await doc.save();

    res.json({ message: "Signed successfully", document: doc });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


/* GET SIGNATURES */
export const getSignatures = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.documentId)
      .populate("signatures.user", "name email");

    if (!doc) return res.status(404).json({ message: "Document not found" });

    res.json(doc.signatures);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};