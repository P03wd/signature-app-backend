import mongoose from "mongoose";

/* =====================================================
   SIGNATURE SCHEMA
   Tracks each signature on a document by any user
===================================================== */
const signatureSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    signatureData: {
      type: String, // store signature image data or string representation
      required: true,
    },

    x: {
      type: Number,
      required: true,
    },

    y: {
      type: Number,
      required: true,
    },

    pageNumber: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["signed"], // simplifies permission flow
      default: "signed",
    },

    signedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

/* =====================================================
   PREVENT DUPLICATE SIGNATURE BY SAME USER ON SAME DOC
===================================================== */
signatureSchema.index(
  { documentId: 1, userId: 1 },
  { unique: true }
);

/* =====================================================
   EXPORT MODEL (SAFE)
===================================================== */
const Signature =
  mongoose.models.Signature || mongoose.model("Signature", signatureSchema);

export default Signature;