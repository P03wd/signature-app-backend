import Invite from "../models/invite.js";
import Document from "../models/document.js";
import crypto from "crypto";

/* SEND INVITE */
export const sendInvite = async (req, res) => {
  try {
    const { email } = req.body;
    const { docId } = req.params;

    const doc = await Document.findById(docId);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    const token = crypto.randomBytes(32).toString("hex");

    await Invite.create({
      documentId: docId,
      email,
      token,
    });

    res.json({
      message: "Invite created",
      link: `${process.env.FRONTEND_URL}/sign/${token}`,
    });

  } catch (err) {
    res.status(500).json({ message: "Invite failed" });
  }
};


/* GET DOC BY TOKEN */
export const getDocByToken = async (req, res) => {
  try {
    const invite = await Invite.findOne({ token: req.params.token })
      .populate("documentId");

    if (!invite)
      return res.status(404).json({ message: "Invalid link" });

    res.json(invite.documentId);

  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};
/* ================= SIGN DOCUMENT BY TOKEN ================= */
export const signByToken = async (req, res) => {
  try {
    const { token } = req.params;
    const { signature } = req.body; // image/png from frontend

    const invite = await Invite.findOne({ token });
    if (!invite) return res.status(404).json({ message: "Invalid or expired token" });

    const doc = await Document.findById(invite.documentId);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    // Save signature to document (for simplicity, just storing as data URL)
    doc.signedFilePath = signature; // optional: you can generate PDF with signature
    doc.status = "Signed";

    await doc.save();

    res.json({ message: "Document signed successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signing failed" });
  }
};