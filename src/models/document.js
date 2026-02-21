import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    originalName: { type: String, required: true },
    filePath: { type: String, required: true },
    signedFilePath: String,

    // owner still tracked for info but does not block actions
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      default: "pending",
    },

    // remove restriction: any user can sign
    allowedSigners: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    signedBy: [
      {
        type: String, // store emails of users who signed
      },
    ],

    signedAt: Date,
  },
  { timestamps: true }
);

const Document =
  mongoose.models.Document || mongoose.model("Document", documentSchema);

export default Document;