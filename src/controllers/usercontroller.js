export const getUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user logged in" });
    }

    res.status(200).json({
      message: "User profile fetched successfully",
      user: {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name || "N/A", // in case name isn't in the token
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
