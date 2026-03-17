// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";

// import connectDB from "./config/db.js";
// import projectRoutes from "./routes/projectRoutes.js";
// import skillRoutes from "./routes/skillRoutes.js";
// import messageRoutes from "./routes/messageRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import profileRoutes from "./routes/profileRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";

// dotenv.config();

// const app = express();

// // Fix __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ✅ Ensure uploads folder exists
// const uploadDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadDir)) {
// fs.mkdirSync(uploadDir, { recursive: true });
// }

// // ✅ CORS configuration (production + local)
// const allowedOrigins = [
// "http://localhost:5173",
// "https://assignment2-frontend-0i3j.onrender.com"
// ];

// app.use(cors({
// origin: function (origin, callback) {
// if (!origin || allowedOrigins.includes(origin)) {
// callback(null, true);
// } else {
// callback(new Error("CORS not allowed"));
// }
// },
// credentials: true
// }));

// app.use(express.json());

// // ✅ Static folder for uploaded files
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // ✅ Database connection
// connectDB();

// // ✅ Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/projects", projectRoutes);
// app.use("/api/skills", skillRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/profile", profileRoutes);
// app.use("/api/upload", uploadRoutes);

// // ✅ Test route
// app.get("/", (req, res) => {
// res.send("API is running...");
// });

// // ✅ PORT for Render
// const PORT = process.env.



import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
fs.mkdirSync(uploadDir, { recursive: true });
}

// CORS configuration (local + production)
const allowedOrigins = [
"http://localhost:5173",
"https://assignment2-frontend-0i3j.onrender.com"
];

app.use(cors({
origin: function (origin, callback) {
if (!origin || allowedOrigins.includes(origin)) {
callback(null, true);
} else {
callback(new Error("CORS not allowed"));
}
},
credentials: true
}));

app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/upload", uploadRoutes);

// Test route
app.get("/", (req, res) => {
res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});

