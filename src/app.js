import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Import routes
import authRoutes from "./routes/authroutes.js";
import userRoutes from "./routes/userroutes.js";
import documentRoutes from "./routes/documentroutes.js";
import signatureRoutes from "./routes/signatureroutes.js";
import auditRoutes from "./routes/auditroutes.js";
import verificationRoutes from "./routes/verificationroutes.js";

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected ✅"))
.catch(err => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/signatures", signatureRoutes);
app.use("/api/audit", auditRoutes);
app.use("/api/verification", verificationRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Document Signature Backend is running 🚀");
});

export default app;
