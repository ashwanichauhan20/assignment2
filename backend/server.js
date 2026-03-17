import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import projectRoutes from "./routes/projectRoutes.js"
import skillRoutes from "./routes/skillRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import profileRoutes from "./routes/profileRoutes.js"

dotenv.config()

const app = express()

app.use(cors({
  origin: [
    "https://assignment2-frontend-0i3j.onrender.com",
    "http://localhost:5173"
  ],
  credentials: true
}))

app.use(express.json())

connectDB()

app.use("/api/auth", authRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/skills", skillRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/profile", profileRoutes)

app.get("/", (req, res) => {
  res.send("API is running...")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
