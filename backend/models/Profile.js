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
  contactEmail: { type: String },
  phone: { type: String, default: "+91 7670888165" },
  address: { type: String, default: "Hyderabad, India" },
  logoText: { type: String, default: "Portfolio" },
  footerText: { type: String, default: "Made with React, Vite, and Material UI" },
  // Section Titles
  skillsTitle: { type: String, default: "Skills & Technologies" },
  skillsSubtitle1: { type: String, default: "Technical Proficiency" },
  skillsSubtitle2: { type: String, default: "Technologies I Work With" },
  projectsTitle: { type: String, default: "Recent Projects" },
  contactMainTitle: { type: String, default: "Get In Touch" },
  contactSectionTitle: { type: String, default: "Contact Information" },
  contactFormTitle: { type: String, default: "Send me a Message" },
}, { timestamps: true });

export default mongoose.model("Profile", profileSchema);
