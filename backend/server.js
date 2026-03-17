// <<<<<<< HEAD
// import express from "express"
// import cors from "cors"
// import dotenv from "dotenv"
// import connectDB from "./config/db.js"
// import projectRoutes from "./routes/projectRoutes.js"
// import skillRoutes from "./routes/skillRoutes.js"
// import messageRoutes from "./routes/messageRoutes.js"
// import authRoutes from "./routes/authRoutes.js"
// import profileRoutes from "./routes/profileRoutes.js"
// =======
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import projectRoutes from "./routes/projectRoutes.js";
// import skillRoutes from "./routes/skillRoutes.js";
// import messageRoutes from "./routes/messageRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// >>>>>>> 9dd6ec2ad46080dfa6712feecd05f6ad7d085429

// dotenv.config();

// const app = express();

// // CORS configuration
// app.use(cors({
//   origin: "*",
//   methods: ["GET","POST","PUT","DELETE"],
//   allowedHeaders: ["Content-Type","Authorization"]
// }))
// app.use(express.json());

// // Database connection
// connectDB();

// <<<<<<< HEAD
// connectDB()

// app.use("/api/auth", authRoutes)
// app.use("/api/projects", projectRoutes)
// app.use("/api/skills", skillRoutes)
// app.use("/api/messages", messageRoutes)
// app.use("/api/profile", profileRoutes)
// =======
// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/projects", projectRoutes);
// app.use("/api/skills", skillRoutes);
// app.use("/api/messages", messageRoutes);
// >>>>>>> 9dd6ec2ad46080dfa6712feecd05f6ad7d085429

// // Test route
// app.get("/", (req, res) => {
// res.send("API is running...");
// });

// // PORT for Render
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
// console.log(`Server running on port ${PORT}`);
// });


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config();

const app = express();

// CORS configuration (production + local)
const allowedOrigins = [
"http://localhost:5173",
"https://assignment2-frontend-0i3j.onrender.com"
];

app.use(cors({
origin: function(origin, callback){
if(!origin || allowedOrigins.includes(origin)){
callback(null, true);
} else {
callback(new Error("CORS not allowed"));
}
},
credentials: true
}));

app.use(express.json());

// Database connection (only once)
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/profile", profileRoutes);

// Test route
app.get("/", (req, res) => {
res.send("API is running...");
});

// PORT for Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});

