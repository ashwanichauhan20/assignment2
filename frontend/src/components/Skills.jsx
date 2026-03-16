import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  LinearProgress,
  Paper,
} from "@mui/material";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const fallbackSkills = [
    { name: "HTML/CSS", level: 85 },
    { name: "JavaScript", level: 80 },
    { name: "React.js", level: 75 },
    { name: "Node.js", level: 70 },
    { name: "Express.js", level: 70 },
    { name: "MongoDB", level: 65 },
    { name: "Tailwind CSS", level: 80 },
    { name: "Git/GitHub", level: 75 },
  ];

  useEffect(() => {
    fetch("http://localhost:5000/api/skills")
      .then((res) => res.json())
      .then((data) => setSkills(data.length > 0 ? data.map(s => ({ name: s.name, level: s.percentage || s.level })) : fallbackSkills))
      .catch((err) => {
        console.error("Error fetching skills:", err);
        setSkills(fallbackSkills);
      });
  }, []);  const technologies = [
    "MongoDB",
    "Express.js",
    "React",
    "Node.js",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Material-UI",
    "Git",
    "REST APIs",
    "Docker",
  ];

  return (
    <section id="skills" className="py-16 bg-gray-50">
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          className="text-center font-bold text-gray-800 mb-12 pb-5 pr-20"
        >
          Skills & Technologies
        </Typography>

        <Box className="grid md:grid-cols-2 gap-8 mb-12">
          <Box>
            <Typography
              variant="h5"
              className="font-semibold mb-6 text-gray-700 pb-3"
            >
              Technical Skills
            </Typography>
            {skills.map((skill, index) => (
              <Box key={index} className="mb-4">
                <Box className="flex justify-between mb-1">
                  <Typography variant="body1" className="font-medium">
                    {skill.name}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {skill.level}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={skill.level}
                  className="h-2 rounded-full"
                  sx={{
                    backgroundColor: "#e5e7eb",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#2563eb",
                    },
                  }}
                />
              </Box>
            ))}
          </Box>

          <Box>
            <Typography
              variant="h5"
              className="font-semibold mb-6 text-gray-700 pb-1"
            >
              Technologies I Work With
            </Typography>
            <Box className="flex flex-wrap gap-3">
              {technologies.map((tech, index) => (
                <Paper
                  key={index}
                  elevation={1}
                  className="px-4 py-2 bg-white hover:bg-blue-50 transition-colors"
                >
                  <Typography variant="body2" className="text-gray-700">
                    {tech}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default Skills;
