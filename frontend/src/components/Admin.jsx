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

const API = "http://localhost:5000/api";

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
  const [editProject, setEditProject] = useState(null); // {id, data}
  const [projectMsg, setProjectMsg] = useState("");

  // Skills state
  const [skills, setSkills] = useState([]);
  const [skillForm, setSkillForm] = useState({ name: "", percentage: "" });
  const [skillMsg, setSkillMsg] = useState("");

  // Messages state
  const [messages, setMessages] = useState([]);

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (token) {
      fetchProjects();
      fetchSkills();
      fetchMessages();
    }
  }, [token]);

  const fetchProjects = async () => {
    const res = await axios.get(`${API}/projects`);
    setProjects(res.data);
  };

  const fetchSkills = async () => {
    const res = await axios.get(`${API}/skills`);
    setSkills(res.data);
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API}/messages`);
      setMessages(res.data);
    } catch {}
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
  };

  // ── Project Handlers ───────────────────────────────────────────────────────
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
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
      fetchProjects();
    } catch { setProjectMsg("❌ Error saving project."); }
  };

  const handleEditProject = (p) => {
    setProjectForm({ title: p.title, description: p.description, tech: (p.tech || []).join(", "), github: p.github || "", live: p.live || "" });
    setEditProject(p._id);
    setTab(0);
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    await axios.delete(`${API}/projects/${id}`, authHeaders);
    fetchProjects();
  };

  // ── Skill Handlers ─────────────────────────────────────────────────────────
  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/skills`, { name: skillForm.name, percentage: Number(skillForm.percentage) }, authHeaders);
      setSkillMsg("✅ Skill added!");
      setSkillForm({ name: "", percentage: "" });
      fetchSkills();
    } catch { setSkillMsg("❌ Error adding skill."); }
  };

  const handleDeleteSkill = async (id) => {
    await axios.delete(`${API}/skills/${id}`, authHeaders);
    fetchSkills();
  };

  if (!token) return <LoginScreen onLogin={setToken} />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={700}>🛠️ Admin Dashboard</Typography>
        <Button startIcon={<LogoutIcon />} onClick={handleLogout} variant="outlined" color="error">Logout</Button>
      </Box>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="📁 Projects" />
        <Tab label="🎯 Skills" />
        <Tab label="📬 Messages" />
      </Tabs>

      {/* ── Tab 0: Projects ── */}
      {tab === 0 && (
        <Box>
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" mb={2}>{editProject ? "✏️ Edit Project" : "➕ Add New Project"}</Typography>
            {projectMsg && <Alert severity={projectMsg.startsWith("✅") ? "success" : "error"} sx={{ mb: 2 }}>{projectMsg}</Alert>}
            <form onSubmit={handleProjectSubmit}>
              <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                <TextField label="Title" value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} required />
                <TextField label="Tech Stack (comma separated)" value={projectForm.tech} onChange={e => setProjectForm({ ...projectForm, tech: e.target.value })} required />
                <TextField label="GitHub URL" value={projectForm.github} onChange={e => setProjectForm({ ...projectForm, github: e.target.value })} />
                <TextField label="Live URL" value={projectForm.live} onChange={e => setProjectForm({ ...projectForm, live: e.target.value })} />
              </Box>
              <TextField fullWidth label="Description" multiline rows={3} value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} required sx={{ mt: 2 }} />
              <Box mt={2} display="flex" gap={2}>
                <Button type="submit" variant="contained">{editProject ? "Update Project" : "Add Project"}</Button>
                {editProject && <Button variant="outlined" onClick={() => { setEditProject(null); setProjectForm({ title: "", description: "", tech: "", github: "", live: "" }); }}>Cancel</Button>}
              </Box>
            </form>
          </Paper>

          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>📋 All Projects ({projects.length})</Typography>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                  <TableCell><b>Title</b></TableCell>
                  <TableCell><b>Tech</b></TableCell>
                  <TableCell><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map(p => (
                  <TableRow key={p._id}>
                    <TableCell>{p.title}</TableCell>
                    <TableCell>{(p.tech || []).map(t => <Chip key={t} label={t} size="small" sx={{ mr: 0.5 }} />)}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEditProject(p)}><EditIcon /></IconButton>
                      <IconButton color="error" onClick={() => handleDeleteProject(p._id)}><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {projects.length === 0 && <TableRow><TableCell colSpan={3} align="center">No projects yet. Add one above!</TableCell></TableRow>}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      )}

      {/* ── Tab 1: Skills ── */}
      {tab === 1 && (
        <Box>
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" mb={2}>➕ Add Skill</Typography>
            {skillMsg && <Alert severity={skillMsg.startsWith("✅") ? "success" : "error"} sx={{ mb: 2 }}>{skillMsg}</Alert>}
            <form onSubmit={handleSkillSubmit}>
              <Box display="flex" gap={2} alignItems="center">
                <TextField label="Skill Name" value={skillForm.name} onChange={e => setSkillForm({ ...skillForm, name: e.target.value })} required sx={{ flex: 2 }} />
                <TextField label="Percentage (0-100)" type="number" value={skillForm.percentage} onChange={e => setSkillForm({ ...skillForm, percentage: e.target.value })} required inputProps={{ min: 0, max: 100 }} sx={{ flex: 1 }} />
                <Button type="submit" variant="contained" sx={{ height: 56 }}>Add Skill</Button>
              </Box>
            </form>
          </Paper>

          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>🎯 All Skills ({skills.length})</Typography>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                  <TableCell><b>Skill</b></TableCell>
                  <TableCell><b>Percentage</b></TableCell>
                  <TableCell><b>Delete</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {skills.map(s => (
                  <TableRow key={s._id}>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.percentage}%</TableCell>
                    <TableCell>
                      <IconButton color="error" onClick={() => handleDeleteSkill(s._id)}><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {skills.length === 0 && <TableRow><TableCell colSpan={3} align="center">No skills yet. Add one above!</TableCell></TableRow>}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      )}

      {/* ── Tab 2: Messages ── */}
      {tab === 2 && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" mb={2}>📬 Contact Messages ({messages.length})</Typography>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Message</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.map((msg, idx) => (
                <TableRow key={idx}>
                  <TableCell>{msg.name}</TableCell>
                  <TableCell>{msg.email}</TableCell>
                  <TableCell>{msg.message}</TableCell>
                </TableRow>
              ))}
              {messages.length === 0 && <TableRow><TableCell colSpan={3} align="center">No messages yet.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
};

export default Admin;
