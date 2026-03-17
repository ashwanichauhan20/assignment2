
import React from "react";
import { Container, Typography, Box, IconButton } from "@mui/material";
import { GitHub, LinkedIn, Email } from "@mui/icons-material";

import axios from "axios";
import { API_URL } from "../config";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [profile, setProfile] = React.useState({
    name: "Md Abbas Ali",
    githubUrl: "",
    linkedinUrl: "",
    contactEmail: "",
    footerText: "Made with React, Vite, and Material UI"
  });

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/profile`);
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching footer data:", err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <footer className="bg-gray-800 text-white py-8">
      <Container maxWidth="lg">
        <Box className="flex flex-col md:flex-row justify-between items-center">
          <Typography variant="body2" className="mb-4 md:mb-0">
            © {currentYear} {profile.name}. All rights reserved.
          </Typography>

          <Box className="flex space-x-4">
            {profile.githubUrl && (
              <IconButton
                href={profile.githubUrl}
                target="_blank"
                className="text-white hover:text-blue-400"
              >
                <GitHub />
              </IconButton>
            )}

            {profile.linkedinUrl && (
              <IconButton
                href={profile.linkedinUrl}
                target="_blank"
                className="text-white hover:text-blue-400"
              >
                <LinkedIn />
              </IconButton>
            )}

            {profile.contactEmail && (
              <IconButton
                href={`mailto:${profile.contactEmail}`}
                className="text-white hover:text-blue-400"
              >
                <Email />
              </IconButton>
            )}
          </Box>
        </Box>

        <Typography variant="body2" className="text-center mt-8 text-gray-400">
          {profile.footerText}
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
