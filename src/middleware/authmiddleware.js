import jwt from "jsonwebtoken";
import User from "../models/user.js";

/**
 * AUTH MIDDLEWARE
 * Allows ANY logged-in user to access routes
 */
const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    // token missing
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access denied. No token provided",
      });
    }

    const token = header.split(" ")[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user in DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // attach full user object
    req.user = user;

    next();
  } catch (err) {
    console.error("AUTH ERROR:", err.message);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Session expired. Login again." });
    }

    res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;