import mongoose from "mongoose";

// Define the schema for audit logs
const auditSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  document: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
    required: true,
  },
  action: {
    type: String,
    required: true, // e.g., 'SIGNED_DOC', 'VERIFIED_DOC'
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Prevent OverwriteModelError on nodemon reload
const Audit = mongoose.models.Audit || mongoose.model("Audit", auditSchema);

export default Audit;
