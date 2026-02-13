// backend/src/models/signature.js
import mongoose from "mongoose";

const signatureSchema = new mongoose.Schema({
  documentId: { type: mongoose.Schema.Types.ObjectId, ref: "Document", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  x: { type: Number },
  y: { type: Number },
  page: { type: Number },
  status: { type: String, enum: ["pending", "signed", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

// Prevent OverwriteModelError on nodemon reload
const Signature = mongoose.models.Signature || mongoose.model("Signature", signatureSchema);

export default Signature;
