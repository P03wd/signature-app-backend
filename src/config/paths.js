import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Required for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Backend root folder
export const ROOT_DIR = path.join(__dirname, "..", "..");

// Upload folder
export const DOCUMENT_UPLOAD_DIR = path.join(
  ROOT_DIR,
  "uploads",
  "documents"
);

// Ensure upload folder exists
if (!fs.existsSync(DOCUMENT_UPLOAD_DIR)) {
  fs.mkdirSync(DOCUMENT_UPLOAD_DIR, { recursive: true });
}