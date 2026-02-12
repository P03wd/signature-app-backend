// backend/src/controllers/signaturecontroller.js
import Audit from "../models/audit.js";

// Sign a document
export const signDocument = async (req, res) => {
  try {
    const documentId = req.params.documentId;
    const userId = req.user.id;

    // Inside your signature saving logic
await Audit.create({
  user: req.user._id,
  action: "SIGNED_DOC",
  document: doc._id
});
    // TODO: Add your logic to save the signature in DB
    // For example: Signature.create({ documentId, userId, signedAt: new Date() })

    res.json({ message: `User ${userId} signed document ${documentId}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error signing document" });
  }
};

// Get all signatures for a document
export const getSignatures = async (req, res) => {
  try {
    const documentId = req.params.documentId;

    // TODO: Add your logic to fetch signatures from DB
    // For example: const signatures = await Signature.find({ documentId })

    res.json({ message: `Fetched signatures for document ${documentId}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching signatures" });
  }
};
