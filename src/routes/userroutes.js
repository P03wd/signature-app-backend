// backend/routes/userroutes.js
import express from "express";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

/**
 * @route   GET /api/users/profile
 * @desc    Get logged-in user's profile
 * @access  Private (requires JWT)
 */
router.get("/profile", authMiddleware, (req, res) => {
  try {
    res.json({
      message: "User profile fetched successfully",
      user: req.user,
    });
  } catch (err) {
    console.error("PROFILE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
