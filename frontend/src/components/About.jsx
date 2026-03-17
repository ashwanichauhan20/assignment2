import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Paper, Skeleton } from "@mui/material";
import { Code, School, Psychology } from "@mui/icons-material";
import { API_URL } from "../config";

const About = () => {
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
      <section id="about" className="py-16 bg-white">
        <Container maxWidth="lg">
          <Skeleton width="30%" height={60} sx={{ mx: "auto", mb: 4 }} />
          <Box className="grid md:grid-cols-3 gap-8">
            <Skeleton variant="rectangular" height={200} />
            <Skeleton variant="rectangular" height={200} />
            <Skeleton variant="rectangular" height={200} />
          </Box>
          <Skeleton width="100%" height={100} sx={{ mt: 4 }} />
        </Container>
      </section>
    );
  }

  const {
    aboutTitle = "About Me",
    aboutDescription = "I'm a passionate MERN stack developer with a strong foundation in JavaScript and modern web technologies. Although I'm at the beginning of my professional journey, I've built several projects that demonstrate my ability to create full-stack applications. I'm excited to contribute to a team where I can continue learning and growing as a developer."
  } = profile || {};

  return (
    <section id="about" className="py-16 bg-white">
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          className="text-center font-bold text-gray-800 mb-12"
        >
          {aboutTitle}
        </Typography>

        <Box className="grid md:grid-cols-3 gap-8">
          <Paper
            elevation={2}
            className="p-6 text-center hover:shadow-lg transition-shadow border-t-4 border-blue-600"
          >
            <Code className="text-blue-600 text-4xl mb-4 mx-auto" />
            <Typography variant="h6" className="font-semibold mb-2">
              Web Development
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              Passionate about creating responsive and user-friendly web
              applications using modern technologies.
            </Typography>
          </Paper>

          <Paper
            elevation={2}
            className="p-6 text-center hover:shadow-lg transition-shadow border-t-4 border-blue-600"
          >
            <School className="text-blue-600 text-4xl mb-4 mx-auto" />
            <Typography variant="h6" className="font-semibold mb-2">
              Continuous Learning
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              Always eager to learn new technologies and improve my skills
              through projects and courses.
            </Typography>
          </Paper>

          <Paper
            elevation={2}
            className="p-6 text-center hover:shadow-lg transition-shadow border-t-4 border-blue-600"
          >
            <Psychology className="text-blue-600 text-4xl mb-4 mx-auto" />
            <Typography variant="h6" className="font-semibold mb-2">
              Problem Solving
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              Enjoy tackling challenges and finding efficient solutions to
              complex problems.
            </Typography>
          </Paper>
        </Box>

        <Box className="mt-12 text-center">
          <Typography
            variant="h6"
            className="text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed"
          >
            {aboutDescription}
          </Typography>
        </Box>
      </Container>
    </section>
  );
};

export default About;

