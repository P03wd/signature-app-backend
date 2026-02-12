import path from "path";
import { fileURLToPath } from "url";

// Required for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// backend root folder
export const ROOT_DIR = path.join(__dirname, "..", "..");

// uploads/documents
export const DOCUMENT_UPLOAD_DIR = path.join(
  ROOT_DIR,
  "uploads",
  "documents"
);
