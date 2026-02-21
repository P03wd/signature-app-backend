import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ROUTES
import authRoutes from "./routes/authroutes.js";
import userRoutes from "./routes/userroutes.js";
import documentRoutes from "./routes/documentroutes.js";
import signatureRoutes from "./routes/signatureroutes.js";
import auditRoutes from "./routes/auditroutes.js";
import verificationRoutes from "./routes/verificationroutes.js";
import inviteRoutes from "./routes/inviteroutes.js";

dotenv.config();

const app = express();

/* ================= PATH FIX ================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= CREATE UPLOAD FOLDERS ================= */
const UPLOADS_DIR = path.join(__dirname, "..", "uploads");
const DOCUMENTS_DIR = path.join(UPLOADS_DIR, "documents");

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
if (!fs.existsSync(DOCUMENTS_DIR)) fs.mkdirSync(DOCUMENTS_DIR, { recursive: true });

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

/* ================= STATIC FILES ================= */
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/signatures", signatureRoutes);
app.use("/api/audit", auditRoutes);
app.use("/api/verification", verificationRoutes);
app.use("/api/invite", inviteRoutes);

/* ================= TEST ================= */
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

/* ================= DB CONNECT ================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");

    app.listen(process.env.PORT || 5000, () =>
      console.log("Server running 🚀")
    );
  })
  .catch((err) => console.error(err));