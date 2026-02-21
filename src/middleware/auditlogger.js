import Audit from "../models/audit.js";

/**
 * AUDIT LOGGER MIDDLEWARE
 * Logs user actions like upload, delete, sign, etc.
 */
const auditLogger = (action) => {
  return async (req, res, next) => {
    try {
      const documentId =
        req.body.documentId ||
        req.params.documentId ||
        req.params.id ||
        null;

      // allow logging even if user not logged in (public routes)
      const userId = req.user?.id || null;

      // create audit log
      await Audit.create({
        action,
        document: documentId,
        user: userId,
        ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
        method: req.method,
        route: req.originalUrl,
        userAgent: req.headers["user-agent"] || "unknown",
      });

    } catch (err) {
      console.error("Audit log failed:", err.message);
      // never block request if logging fails
    }

    next();
  };
};

export default auditLogger;
