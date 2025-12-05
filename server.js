// server.js - Backend for Live Selfie + Live Location

const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Folder to store uploads
const UPLOAD = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOAD)) fs.mkdirSync(UPLOAD);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve HTML files

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD),
  filename: (req, file, cb) => cb(null, selfie-${Date.now()}.jpg)
});
const upload = multer({ storage });

// Upload Route
app.post("/upload", upload.single("selfie"), (req, res) => {
  const file = req.file;

  const metadata = {
    filename: file.filename,
    lat: req.body.lat,
    lng: req.body.lng,
    accuracy: req.body.accuracy,
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync(
    path.join(UPLOAD, ${file.filename}.json),
    JSON.stringify(metadata, null, 2)
  );

  res.send("✔️ Selfie + Location Saved Successfully");
});

// Start Server
app.listen(PORT, () => {
  console.log(Server running on http://localhost:${PORT});
});
