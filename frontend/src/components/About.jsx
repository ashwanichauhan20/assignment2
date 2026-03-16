import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import { Code, School, Psychology } from "@mui/icons-material";

const About = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          className="text-center font-bold text-gray-800 mb-12"
        >
          About Me
        </Typography>

        <Box className="grid md:grid-cols-3 gap-8">
          <Paper
            elevation={2}
            className="p-6 text-center hover:shadow-lg transition-shadow"
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
            className="p-6 text-center hover:shadow-lg transition-shadow"
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
            className="p-6 text-center hover:shadow-lg transition-shadow"
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

        <Box className="mt-12 ">
          <Typography
            variant="h7"
            className="text-gray-600 max-w-3xl mx-auto font-bold"
          >
            I'm a passionate MERN stack developer with a strong foundation in
            JavaScript and modern web technologies. Although I'm at the
            beginning of my professional journey, I've built several projects
            that demonstrate my ability to create full-stack applications. I'm
            excited to contribute to a team where I can continue learning and
            growing as a developer.
          </Typography>
        </Box>
      </Container>
    </section>
  );
};

export default About;

