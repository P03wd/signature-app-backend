import Audit from "../models/audit.js";

/* CREATE LOG (Internal use only) */
export const logAudit = async (data) => {
  try {
    if (!data) return;

    await Audit.create({
      action: data.action || "UNKNOWN",
      userId: data.userId || null,
      documentId: data.documentId || null,
      details: data.details || "",
    });
  } catch (err) {
    console.error("Audit log error:", err.message);
  }
};


/* GET AUDITS FOR DOCUMENT */
export const getAudits = async (req, res) => {
  try {
    const { docId } = req.params;

    if (!docId) {
      return res.status(400).json({
        message: "Document ID required",
      });
    }

    const logs = await Audit.find({ documentId: docId })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch audit logs",
      error: err.message,
    });
  }
};