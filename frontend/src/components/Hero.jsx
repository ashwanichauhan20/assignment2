import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box, Skeleton } from "@mui/material";
import { Download, GitHub, LinkedIn } from "@mui/icons-material";
import { API_URL } from "../config";
import profileFallback from "../assets/portfile.jpg";
import CVFallback from "../assets/Abbas_FullStackWebDeveloper.pdf";

const Hero = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/profile`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="home" className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <Container maxWidth="lg">
          <Box className="text-center md:text-left md:flex items-center justify-between">
            <Box className="md:w-1/2">
              <Skeleton width="60%" height={60} />
              <Skeleton width="40%" height={40} sx={{ mt: 2 }} />
              <Skeleton width="100%" height={100} sx={{ mt: 2 }} />
              <Box className="flex gap-4 mt-4">
                <Skeleton width={120} height={50} />
                <Skeleton width={120} height={50} />
              </Box>
            </Box>
            <Box className="md:w-1/2 flex justify-center mt-10 md:mt-0">
              <Skeleton variant="circular" width={250} height={250} />
            </Box>
          </Box>
        </Container>
      </section>
    );
  }

  const {
    name = "Md Abbas Ali",
    title = "MERN Stack Developer",
    heroSubtitle = "Passionate about building modern web applications with MongoDB, Express.js, React, and Node.js. Eager to contribute to innovative projects and grow as a developer.",
    profileImage = profileFallback,
    resumeUrl = CVFallback,
    githubUrl = "https://github.com/ABBASALI1001",
    linkedinUrl = "https://www.linkedin.com/in/"
  } = profile || {};

  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-indigo-100 py-16"
    >
      <Container maxWidth="lg">
        <Box className="text-center md:text-left md:flex items-center justify-between">
          <Box className="md:w-1/2">
            <Typography variant="h3" className="font-bold text-gray-800 mb-4">
              Hi, I'm <span className="text-blue-600"> {name} </span>
            </Typography>
            <Typography variant="h5" className="text-gray-600 mb-6 pt-2">
              {title}
            </Typography>
            <Typography
              variant="body1"
              className="text-gray-500 mb-8 pt-3 pb-4  "
            >
              {heroSubtitle}
            </Typography>
            <Box className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                variant="contained"
                size="large"
                className="bg-blue-600 hover:bg-blue-700"
                startIcon={<Download />}
                component="a"
                href={resumeUrl}
                download
              >
                Download CV
              </Button>
              <Button
                variant="outlined"
                size="large"
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
                startIcon={<GitHub />}
                component="a"
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Button>
              <Button
                variant="outlined"
                size="large"
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
                startIcon={<LinkedIn />}
                component="a"
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </Button>
            </Box>
          </Box>
          <Box className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <div className="w-64 h-64 bg-blue-600 rounded-full flex items-center justify-center text-white text-6xl font-bold shadow-xl overflow-hidden">
              <img
                src={profileImage || profileFallback}
                className="w-full h-full object-cover"
                alt={name}
              />
            </div>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default Hero;
