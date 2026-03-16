
import React from "react";
import { Container, Typography, Box, IconButton } from "@mui/material";
import { GitHub, LinkedIn, Email } from "@mui/icons-material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <Container maxWidth="lg">
        <Box className="flex flex-col md:flex-row justify-between items-center">
          <Typography variant="body2" className="mb-4 md:mb-0">
            © {currentYear} Your Name. All rights reserved.
          </Typography>

          <Box className="flex space-x-4">
            <IconButton
              href="https://github.com/yourusername"
              target="_blank"
              className="text-white hover:text-blue-400"
            >
              <GitHub />
            </IconButton>

            <IconButton
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              className="text-white hover:text-blue-400"
            >
              <LinkedIn />
            </IconButton>

            <IconButton
              href="mailto:youremail@example.com"
              className="text-white hover:text-blue-400"
            >
              <Email />
            </IconButton>
          </Box>
        </Box>

        <Typography variant="body2" className="text-center mt-8 text-gray-400">
          Made with React, Vite, and Tailwind CSS
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
