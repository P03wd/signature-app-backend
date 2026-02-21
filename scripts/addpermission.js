import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.js";
import Document from "../models/document.js";

dotenv.config();

const run = async () => {
  try {
    // Connect DB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected");

    // Find test user
    const user = await User.findOne({ email: "test@gmail.com" });

    if (!user) {
      console.log("❌ User not found");
      process.exit(0);
    }

    // Add permission
    const result = await Document.updateMany(
      {},
      { $addToSet: { allowedUsers: user._id } }
    );

    console.log(`✅ Permission added to ${result.modifiedCount} documents`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

run();