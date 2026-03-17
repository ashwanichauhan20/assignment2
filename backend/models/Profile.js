import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: { type: String, default: "Md Abbas Ali" },
  title: { type: String, default: "MERN Stack Developer" },
  heroSubtitle: { type: String, default: "Passionate about building modern web applications with MongoDB, Express.js, React, and Node.js." },
  aboutTitle: { type: String, default: "About Me" },
  aboutDescription: { type: String, default: "I'm a passionate MERN stack developer..." },
  profileImage: { type: String },
  resumeUrl: { type: String },
  githubUrl: { type: String },
  linkedinUrl: { type: String },
  contactEmail: { type: String }
}, { timestamps: true });

export default mongoose.model("Profile", profileSchema);
