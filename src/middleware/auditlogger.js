// backend/middleware/auditlogger.js
import Audit from "../models/audit.js"; // use ES module import

const auditLogger = (action) => {
  return async (req, res, next) => {
    try {
      await Audit.create({
        documentId: req.body.documentId || req.params.documentId,
        userId: req.user.id, // from JWT auth middleware
        action,
        ip: req.ip,
      });
      next(); // continue to next middleware
    } catch (err) {
      console.error("Audit logging error:", err);
      next(); // don’t block main action
    }
  };
};

export default auditLogger; // use ES module export
