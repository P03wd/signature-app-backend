import multer from "multer";
import fs from "fs";
import path from "path";
import { DOCUMENT_UPLOAD_DIR } from "../config/paths.js";

// 🔐 ALWAYS ensure directory exists
const ensureUploadDir = () => {
  if (!fs.existsSync(DOCUMENT_UPLOAD_DIR)) {
    fs.mkdirSync(DOCUMENT_UPLOAD_DIR, { recursive: true });
    console.log("📁 uploads/documents directory created");
  }
};

ensureUploadDir();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    ensureUploadDir();
    cb(null, DOCUMENT_UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      cb(new Error("Only PDF files are allowed"), false);
    } else {
      cb(null, true);
    }
  },
});

export default upload;
