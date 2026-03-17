import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  Paper,
} from "@mui/material";
import { Email, Phone, LocationOn, Send } from "@mui/icons-material";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [profile, setProfile] = useState({
    contactEmail: "abbasalimohammad8165@gmail.com",
    phone: "+91 7670888165",
    address: "Hyderabad, India",
    contactMainTitle: "Get In Touch",
    contactSectionTitle: "Contact Information",
    contactFormTitle: "Send me a Message"
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/profile`);
        if (res.data) setProfile(res.data);
      } catch (err) {
        console.error("Error fetching contact info:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/messages`,
        formData
      );
      if (response.data) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          className="text-center font-bold text-gray-800 mb-12 pb-8"
        >
          {profile.contactMainTitle}
        </Typography>

        <Box className="grid md:grid-cols-2 gap-8">
          <Box>
            <Typography
              variant="h5"
              className="font-bold mb-6 text-gray-700  pb-3 "
            >
              {profile.contactSectionTitle}
            </Typography>

            <Box className="space-y-4 ">
              <Box className="flex items-center">
                <Email className="text-blue-600 mr-4 " />
                <Typography variant="body1">
                  {profile.contactEmail}
                </Typography>
              </Box>

              <Box className="flex items-center">
                <Phone className="text-blue-600 mr-4" />
                <Typography variant="body1">{profile.phone}</Typography>
              </Box>

              <Box className="flex items-center">
                <LocationOn className="text-blue-600 mr-4" />
                <Typography variant="body1"> {profile.address}</Typography>
              </Box>
            </Box>

            <Paper elevation={2} className="p-6 mt-8 bg-blue-600 text-white">
              <Typography variant="h6" className="font-semibold mb-2 ">
                Open for Opportunities
              </Typography>
              <Typography variant="body2" className="pt-2">
                I'm actively looking for entry-level MERN stack developer
                positions and internship opportunities. Feel free to reach out
                if you think I'd be a good fit for your team!
              </Typography>
            </Paper>
          </Box>

          <Box>
            <Typography
              variant="h5"
              className="font-semibold mb-6 text-gray-700  pb-5"
            >
              {profile.contactFormTitle}
            </Typography>

            {submitStatus === "success" && (
              <Alert severity="success" className="mb-4">
                Thank you for your message! I'll get back to you soon.
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mb-4 bg-white"
              />

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mb-4 bg-white"
              />

              <TextField
                fullWidth
                label="Your Message"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="mb-4 bg-white"
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<Send />}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Send Message
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default Contact;
