import Audit from "../models/audit.js";

const auditLogger = (action) => {
  return async (req, res, next) => {
    try {
      const documentId = req.body.documentId || req.params.documentId;
      if (!documentId) {
        console.warn("Audit skipped: No documentId provided");
        return next();
      }

      await Audit.create({
        documentId,
        userId: req.user.id,
        action,
        ip: req.ip,
      });

      next();
    } catch (err) {
      console.error("Audit logging error:", err);
      next();
    }
  };
};

export default auditLogger;
