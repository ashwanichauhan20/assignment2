import React, { useState, useEffect } from "react";
import {
  Container, Typography, Box, Paper, TextField, Button,
  Table, TableBody, TableCell, TableHead, TableRow, IconButton,
  Chip, Alert, Tabs, Tab, Dialog, DialogTitle, DialogContent,
  DialogActions, Divider
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";

import { API_URL as API } from "../config";

// ─── Login Screen ────────────────────────────────────────────────────────────
const LoginScreen = ({ onLogin }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${API}/auth/login`, form);
      localStorage.setItem("adminToken", res.data.token);
      onLogin(res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#f5f7fa" }}>
      <Paper elevation={4} sx={{ p: 5, width: 400, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight={700} mb={1} textAlign="center">🔐 Admin Login</Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>Portfolio Admin Panel</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required sx={{ mb: 2 }} />
          <TextField fullWidth label="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required sx={{ mb: 3 }} />
          <Button fullWidth type="submit" variant="contained" size="large" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <Typography variant="caption" color="text.secondary" display="block" mt={2} textAlign="center">
          Access credentials are managed via the secure environment configuration.
        </Typography>
      </Paper>
    </Box>
  );
};

// ─── Main Admin Dashboard ─────────────────────────────────────────────────────
const Admin = () => {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || null);
  const [tab, setTab] = useState(0);

  // Projects state
  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState({ title: "", description: "", tech: "", github: "", live: "" });
  const [editProject, setEditProject] = useState(null);
  const [projectMsg, setProjectMsg] = useState("");

  // Skills state
  const [skills, setSkills] = useState([]);
  const [skillForm, setSkillForm] = useState({ name: "", percentage: "" });
  const [skillMsg, setSkillMsg] = useState("");

  // Profile state
  const [profile, setProfile] = useState({
    name: "", title: "", heroSubtitle: "", aboutTitle: "", aboutDescription: "",
    profileImage: "", resumeUrl: "", githubUrl: "", linkedinUrl: "",
    logoText: "", contactEmail: "", phone: "", address: "", footerText: "",
    skillsTitle: "", skillsSubtitle1: "", skillsSubtitle2: "", projectsTitle: "",
    contactMainTitle: "", contactSectionTitle: "", contactFormTitle: ""
  });
  const [profileMsg, setProfileMsg] = useState("");

  // Messages state
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (token) {
      fetchAll();
    }
  }, [token]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [p, s, m, pr] = await Promise.all([
        axios.get(`${API}/projects`),
        axios.get(`${API}/skills`),
        axios.get(`${API}/messages`, authHeaders),
        axios.get(`${API}/profile`)
      ]);
      setProjects(p.data);
      setSkills(s.data);
      setMessages(m.data);
      setProfile(pr.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await axios.post(`${API}/upload`, formData, {
        headers: {
          ...authHeaders.headers,
          "Content-Type": "multipart/form-data",
        },
      });
      setProfile({ ...profile, [field]: res.data.url });
      setProfileMsg("✅ File uploaded successfully!");
    } catch (err) {
      setProfileMsg("❌ upload failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
  };

  // ── Project Handlers ───────────────────────────────────────────────────────
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...projectForm, tech: projectForm.tech.split(",").map(t => t.trim()) };
    try {
      if (editProject) {
        await axios.put(`${API}/projects/${editProject}`, payload, authHeaders);
        setProjectMsg("✅ Project updated!");
        setEditProject(null);
      } else {
        await axios.post(`${API}/projects`, payload, authHeaders);
        setProjectMsg("✅ Project added!");
      }
      setProjectForm({ title: "", description: "", tech: "", github: "", live: "" });
      const res = await axios.get(`${API}/projects`);
      setProjects(res.data);
    } catch { setProjectMsg("❌ Error saving project."); }
    finally { setLoading(false); }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    await axios.delete(`${API}/projects/${id}`, authHeaders);
    const res = await axios.get(`${API}/projects`);
    setProjects(res.data);
  };

  // ── Skill Handlers ─────────────────────────────────────────────────────────
  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/skills`, { name: skillForm.name, percentage: Number(skillForm.percentage) }, authHeaders);
      setSkillMsg("✅ Skill added!");
      setSkillForm({ name: "", percentage: "" });
      const res = await axios.get(`${API}/skills`);
      setSkills(res.data);
    } catch { setSkillMsg("❌ Error adding skill."); }
    finally { setLoading(false); }
  };

  const handleDeleteSkill = async (id) => {
    await axios.delete(`${API}/skills/${id}`, authHeaders);
    const res = await axios.get(`${API}/skills`);
    setSkills(res.data);
  };

  // ── Profile Handlers ───────────────────────────────────────────────────────
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${API}/profile`, profile, authHeaders);
      setProfileMsg("✅ Profile updated successfully!");
    } catch {
      setProfileMsg("❌ Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) return <LoginScreen onLogin={setToken} />;

  return (
    <Box sx={{ bgcolor: "#f0f2f5", minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight={800} color="primary">🛠️ Admin Control</Typography>
            <Typography variant="body2" color="text.secondary">Manage your portfolio content in real-time</Typography>
          </Box>
          <Button startIcon={<LogoutIcon />} onClick={handleLogout} variant="contained" color="error" sx={{ borderRadius: 2 }}>Logout</Button>
        </Paper>

        <Box sx={{ display: "grid", gridTemplateColumns: { md: "250px 1fr" }, gap: 4 }}>
          {/* Navigation Sidebar (Mobile Sticky Top) */}
          <Paper elevation={0} sx={{ p: 2, height: "fit-content", borderRadius: 3, position: { md: "sticky" }, top: 24 }}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={tab}
              onChange={(_, v) => setTab(v)}
              sx={{
                borderRight: 0,
                "& .MuiTab-root": { alignItems: "flex-start", textAlign: "left", borderRadius: 2, mb: 1, minHeight: 48 },
                "& .Mui-selected": { bgcolor: "primary.light", color: "primary.main", fontWeight: "bold" }
              }}
            >
              <Tab label="👤 Profile & Hero" />
              <Tab label="📁 Projects" />
              <Tab label="🎯 Skills" />
              <Tab label="📬 Messages" />
            </Tabs>
          </Paper>

          {/* Main Content Area */}
          <Box>
            {/* ── Tab 0: Profile ── */}
            {tab === 0 && (
              <Box>
                <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                  <Typography variant="h6" mb={3} fontWeight={700}>⚙️ General Information</Typography>
                  {profileMsg && <Alert severity={profileMsg.startsWith("✅") ? "success" : "error"} sx={{ mb: 3 }}>{profileMsg}</Alert>}
                  <form onSubmit={handleProfileSubmit}>
                    <Box sx={{ display: "grid", gridTemplateColumns: { sm: "1fr 1fr" }, gap: 3 }}>
                      <TextField fullWidth label="Full Name" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
                      <TextField fullWidth label="Professional Title" value={profile.title} onChange={e => setProfile({ ...profile, title: e.target.value })} />
                      <TextField fullWidth label="Hero Subtitle" multiline rows={2} value={profile.heroSubtitle} onChange={e => setProfile({ ...profile, heroSubtitle: e.target.value })} sx={{ gridColumn: { sm: "span 2" } }} />
                      <Divider sx={{ gridColumn: { sm: "span 2" }, my: 1 }} />
                      <TextField fullWidth label="About Title" value={profile.aboutTitle} onChange={e => setProfile({ ...profile, aboutTitle: e.target.value })} />
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <TextField fullWidth label="Profile Image URL" value={profile.profileImage} onChange={e => setProfile({ ...profile, profileImage: e.target.value })} />
                        <Button variant="outlined" component="label" size="small">
                          📁 Upload Image
                          <input type="file" hidden accept="image/*" onChange={(e) => handleFileUpload(e, "profileImage")} />
                        </Button>
                      </Box>
                      <TextField fullWidth label="About Description" multiline rows={4} value={profile.aboutDescription} onChange={e => setProfile({ ...profile, aboutDescription: e.target.value })} sx={{ gridColumn: { sm: "span 2" } }} />
                      <Divider sx={{ gridColumn: { sm: "span 2" }, my: 1 }} />
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <TextField fullWidth label="Resume URL" value={profile.resumeUrl} onChange={e => setProfile({ ...profile, resumeUrl: e.target.value })} />
                        <Button variant="outlined" component="label" size="small">
                          📄 Upload Resume (PDF)
                          <input type="file" hidden accept="application/pdf" onChange={(e) => handleFileUpload(e, "resumeUrl")} />
                        </Button>
                      </Box>
                      <TextField fullWidth label="GitHub URL" value={profile.githubUrl} onChange={e => setProfile({ ...profile, githubUrl: e.target.value })} />
                      <TextField fullWidth label="LinkedIn URL" value={profile.linkedinUrl} onChange={e => setProfile({ ...profile, linkedinUrl: e.target.value })} />
                      <Divider sx={{ gridColumn: { sm: "span 2" }, my: 1 }} />
                      <Typography variant="subtitle2" sx={{ gridColumn: { sm: "span 2" }, color: "text.secondary" }}>🏢 Branding & Contact Info</Typography>
                      <TextField fullWidth label="Logo / Navbar Brand" value={profile.logoText} onChange={e => setProfile({ ...profile, logoText: e.target.value })} />
                      <TextField fullWidth label="Contact Display Email" value={profile.contactEmail} onChange={e => setProfile({ ...profile, contactEmail: e.target.value })} />
                      <TextField fullWidth label="Phone Number" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} />
                      <TextField fullWidth label="Address / Location" value={profile.address} onChange={e => setProfile({ ...profile, address: e.target.value })} />
                      <TextField fullWidth label="Footer Credit Text" value={profile.footerText} onChange={e => setProfile({ ...profile, footerText: e.target.value })} sx={{ gridColumn: { sm: "span 2" } }} />
                      <Divider sx={{ gridColumn: { sm: "span 2" }, my: 1 }} />
                      <Typography variant="subtitle2" sx={{ gridColumn: { sm: "span 2" }, color: "text.secondary" }}>🏷️ Section Titles</Typography>
                      <TextField fullWidth label="Skills Section Title" value={profile.skillsTitle} onChange={e => setProfile({ ...profile, skillsTitle: e.target.value })} />
                      <TextField fullWidth label="Skills Subtitle (Bars)" value={profile.skillsSubtitle1} onChange={e => setProfile({ ...profile, skillsSubtitle1: e.target.value })} />
                      <TextField fullWidth label="Skills Subtitle (Chips)" value={profile.skillsSubtitle2} onChange={e => setProfile({ ...profile, skillsSubtitle2: e.target.value })} />
                      <TextField fullWidth label="Projects Section Title" value={profile.projectsTitle} onChange={e => setProfile({ ...profile, projectsTitle: e.target.value })} />
                      <TextField fullWidth label="Contact Main Title" value={profile.contactMainTitle} onChange={e => setProfile({ ...profile, contactMainTitle: e.target.value })} />
                      <TextField fullWidth label="Contact Info Title" value={profile.contactSectionTitle} onChange={e => setProfile({ ...profile, contactSectionTitle: e.target.value })} />
                      <TextField fullWidth label="Contact Form Title" value={profile.contactFormTitle} onChange={e => setProfile({ ...profile, contactFormTitle: e.target.value })} />
                    </Box>
                    <Button type="submit" variant="contained" size="large" sx={{ mt: 4, px: 6, borderRadius: 2 }} disabled={loading}>
                      {loading ? "Saving..." : "Update Portfolio Content"}
                    </Button>
                  </form>
                </Paper>
              </Box>
            )}

            {/* ── Tab 1: Projects ── */}
            {tab === 1 && (
              <Box>
                <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
                  <Typography variant="h6" mb={3} fontWeight={700}>{editProject ? "✏️ Edit Project" : "➕ Add New Project"}</Typography>
                  {projectMsg && <Alert severity={projectMsg.startsWith("✅") ? "success" : "error"} sx={{ mb: 3 }}>{projectMsg}</Alert>}
                  <form onSubmit={handleProjectSubmit}>
                    <Box sx={{ display: "grid", gridTemplateColumns: { sm: "1fr 1fr" }, gap: 2 }}>
                      <TextField fullWidth label="Title" value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} required />
                      <TextField fullWidth label="Tech Stack (comma separated)" value={projectForm.tech} onChange={e => setProjectForm({ ...projectForm, tech: e.target.value })} required />
                      <TextField fullWidth label="GitHub URL" value={projectForm.github} onChange={e => setProjectForm({ ...projectForm, github: e.target.value })} />
                      <TextField fullWidth label="Live URL" value={projectForm.live} onChange={e => setProjectForm({ ...projectForm, live: e.target.value })} />
                    </Box>
                    <TextField fullWidth label="Short Description" multiline rows={3} value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} required sx={{ mt: 3 }} />
                    <Box mt={3} display="flex" gap={2}>
                      <Button type="submit" variant="contained" disabled={loading}>{editProject ? "Update Project" : "Add Project"}</Button>
                      {editProject && <Button variant="outlined" onClick={() => { setEditProject(null); setProjectForm({ title: "", description: "", tech: "", github: "", live: "" }); }}>Cancel</Button>}
                    </Box>
                  </form>
                </Paper>

                <Paper elevation={3} sx={{ p: 3, borderRadius: 3, overflowX: "auto" }}>
                  <Typography variant="h6" mb={2} fontWeight={700}>📋 All Projects</Typography>
                  <Table>
                    <TableHead sx={{ bgcolor: "primary.main" }}>
                      <TableRow>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Title</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Tech</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {projects.map(p => (
                        <TableRow key={p._id} hover>
                          <TableCell fontWeight={500}>{p.title}</TableCell>
                          <TableCell>
                            <Box display="flex" flexWrap="wrap" gap={0.5}>
                              {(p.tech || []).map(t => <Chip key={t} label={t} size="small" />)}
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <IconButton color="primary" onClick={() => { setEditProject(p._id); setProjectForm({ ...p, tech: p.tech.join(", ") }); }}><EditIcon /></IconButton>
                            <IconButton color="error" onClick={() => handleDeleteProject(p._id)}><DeleteIcon /></IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </Box>
            )}

            {/* ── Tab 2: Skills ── */}
            {tab === 2 && (
              <Box>
                <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
                  <Typography variant="h6" mb={3} fontWeight={700}>➕ Add Professional Skill</Typography>
                  {skillMsg && <Alert severity={skillMsg.startsWith("✅") ? "success" : "error"} sx={{ mb: 3 }}>{skillMsg}</Alert>}
                  <form onSubmit={handleSkillSubmit}>
                    <Box sx={{ display: "grid", gridTemplateColumns: { sm: "2fr 1fr auto" }, gap: 2, alignItems: "flex-start" }}>
                      <TextField fullWidth label="Skill (e.g. React.js)" value={skillForm.name} onChange={e => setSkillForm({ ...skillForm, name: e.target.value })} required />
                      <TextField fullWidth label="Level (%)" type="number" value={skillForm.percentage} onChange={e => setSkillForm({ ...skillForm, percentage: e.target.value })} required inputProps={{ min: 0, max: 100 }} />
                      <Button type="submit" variant="contained" sx={{ height: 56, px: 4 }} disabled={loading}>Add</Button>
                    </Box>
                  </form>
                </Paper>

                <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                  <Typography variant="h6" mb={2} fontWeight={700}>🎯 Skillset Matrix</Typography>
                  <Box sx={{ display: "grid", gridTemplateColumns: { sm: "1fr 1fr" }, gap: 2 }}>
                    {skills.map(s => (
                      <Paper key={s._id} variant="outlined" sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: 2 }}>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>{s.name}</Typography>
                          <Typography variant="body2" color="primary">{s.percentage}% Proficiency</Typography>
                        </Box>
                        <IconButton color="error" size="small" onClick={() => handleDeleteSkill(s._id)}><DeleteIcon /></IconButton>
                      </Paper>
                    ))}
                  </Box>
                </Paper>
              </Box>
            )}

            {/* ── Tab 3: Messages ── */}
            {tab === 3 && (
              <Paper elevation={3} sx={{ p: 3, borderRadius: 3, overflowX: "auto" }}>
                <Typography variant="h6" mb={3} fontWeight={700}>📬 Incoming Enquiries</Typography>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                      <TableCell><b>Sender</b></TableCell>
                      <TableCell><b>Email</b></TableCell>
                      <TableCell><b>Message</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {messages.map((msg, idx) => (
                      <TableRow key={idx} hover>
                        <TableCell><b>{msg.name}</b></TableCell>
                        <TableCell>{msg.email}</TableCell>
                        <TableCell sx={{ maxWidth: 300, whiteSpace: "normal" }}>{msg.message}</TableCell>
                      </TableRow>
                    ))}
                    {messages.length === 0 && <TableRow><TableCell colSpan={3} align="center">No messages received yet.</TableCell></TableRow>}
                  </TableBody>
                </Table>
              </Paper>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};


export default Admin;
