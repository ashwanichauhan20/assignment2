import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Download, GitHub, LinkedIn } from "@mui/icons-material";
import profile from "../assets/portfile.jpg";
import CV from "../assets/Abbas_FullStackWebDeveloper.pdf";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-indigo-100 py-16"
    >
      <Container maxWidth="lg">
        <Box className="text-center md:text-left md:flex items-center justify-between">
          <Box className="md:w-1/2">
            <Typography variant="h3" className="font-bold text-gray-800 mb-4">
              Hi, I'm <span className="text-blue-600"> Md Abbas Ali </span>
            </Typography>
            <Typography variant="h5" className="text-gray-600 mb-6 pt-2">
              MERN Stack Developer
            </Typography>
            <Typography
              variant="body1"
              className="text-gray-500 mb-8 pt-3 pb-4  "
            >
              Passionate about building modern web applications with MongoDB,
              Express.js, React, and Node.js. Eager to contribute to innovative
              projects and grow as a developer.
            </Typography>
            <Box className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                variant="contained"
                size="large"
                className="bg-blue-600 hover:bg-blue-700"
                startIcon={<Download />}
                component="a"
                href={CV} // imported path
                download="Abbas_FullStackWebDeveloper.pdf"
              >
                Download CV
              </Button>
              <Button
                variant="outlined"
                size="large"
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
                startIcon={<GitHub />}
                component="a"
                href="https://github.com/ABBASALI1001" // 🔗 your GitHub profile/repo
                target="_blank" // open in new tab
                rel="noopener noreferrer" // security best practice
              >
                GitHub
              </Button>
              <Button
                variant="outlined"
                size="large"
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
                startIcon={<LinkedIn />}
                component="a"
                href="https://www.linkedin.com/in/your-profile/" // 🔗 your LinkedIn profile
                target="_blank" // open in new tab
                rel="noopener noreferrer" // security best practice
              >
                LinkedIn
              </Button>
            </Box>
          </Box>
          <Box className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <div className="w-64 h-64 bg-blue-600 rounded-full flex items-center justify-center text-white text-6xl font-bold">
              <img
                src={profile}
                style={{
                  height: "250px",
                  width: "250px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                alt=""
              />
            </div>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default Hero;
