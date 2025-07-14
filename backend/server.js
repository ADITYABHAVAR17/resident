import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path"; // Import path module
import { fileURLToPath } from "url"; // Needed for ES module compatibility

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend dist folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../", "dist")));

// Serve index.html for any non-API route (for client-side routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
