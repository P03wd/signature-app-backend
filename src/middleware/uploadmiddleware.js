import multer from "multer";
import path from "path";
import fs from "fs";

/* =====================================================
   CREATE UPLOAD FOLDER (CROSS PLATFORM SAFE)
===================================================== */

const uploadDir = path.join(process.cwd(), "uploads", "documents");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


/* =====================================================
   STORAGE CONFIG
===================================================== */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  }
});


/* =====================================================
   FILE FILTER (PDF ONLY)
===================================================== */

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};


/* =====================================================
   LIMITS (PROTECTION)
===================================================== */

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

export default upload;
