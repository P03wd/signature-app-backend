import mongoose from "mongoose";

/* =====================================================
   AUDIT LOG SCHEMA
===================================================== */

const auditSchema = new mongoose.Schema({
  /* USER WHO PERFORMED ACTION */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null // allow public actions
  },

  /* DOCUMENT RELATED TO ACTION */
  document: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
    required: true
  },

  /* ACTION TYPE */
  action: {
    type: String,
    required: true
    // examples:
    // UPLOAD_DOCUMENT
    // DELETE_DOCUMENT
    // SIGN_DOCUMENT
    // INVITE_USER
    // DOWNLOAD_DOCUMENT
    // VERIFY_SIGNATURE
  },

  /* REQUEST INFO */
  ip: String,
  method: String,
  route: String,
  userAgent: String,

  /* EXTRA DATA */
  metadata: {
    type: Object,
    default: {}
  },

  /* TIMESTAMP */
  timestamp: {
    type: Date,
    default: Date.now
  }
});


/* =====================================================
   INDEXES (FASTER SEARCH)
===================================================== */

auditSchema.index({ document: 1 });
auditSchema.index({ user: 1 });
auditSchema.index({ action: 1 });
auditSchema.index({ timestamp: -1 });


/* =====================================================
   PREVENT MODEL OVERWRITE ERROR
===================================================== */

const Audit =
  mongoose.models.Audit ||
  mongoose.model("Audit", auditSchema);

export default Audit;
