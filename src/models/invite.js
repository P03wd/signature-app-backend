import mongoose from "mongoose";

const inviteSchema = new mongoose.Schema({
  email: String,
  token: String,
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
  },
  signature: String,
  signed: { type: Boolean, default: false },
  signedAt: Date,
});

export default mongoose.model("Invite", inviteSchema);
