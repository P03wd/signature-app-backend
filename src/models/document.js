import mongoose from "mongoose";

// Signature sub-schema
const signatureSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    signedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

// Document schema
const documentSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    storedName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    allowedSigners: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String,
      enum: ["pending", "partially_signed", "signed"],
      default: "pending",
    },
    signatures: [signatureSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Document", documentSchema);
