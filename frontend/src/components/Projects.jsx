import React, { useState, useEffect } from "react";
import { API_URL } from "../config";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
} from "@mui/material";
import { GitHub, OpenInNew } from "@mui/icons-material";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  return (
    <section id="projects" className="py-16 bg-white">
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          className="text-center font-bold text-gray-800 pb-5 h-full w-full"
        >
          Projects
        </Typography>

        <Box className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              elevation={3}
              className="hover:shadow-lg transition-shadow h-full flex flex-col"
            >
              <CardContent className="flex-grow">
                <Typography
                  variant="h6"
                  className="font-semibold mb-2 text-gray-800"
                >
                  {project.title}
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-4">
                  {project.description}
                </Typography>
                <Box className="flex flex-wrap gap-1 mb-4">
                  {(project.tech || project.technologies || []).map((tech, techIndex) => (
                    <Chip
                      key={techIndex}
                      label={tech}
                      size="small"
                      className="bg-blue-100 text-blue-800 text-xs"
                    />
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<GitHub />}
                  className="text-blue-600"
                  href={project.github || project.githubUrl}
                  target="_blank"
                >
                  Code
                </Button>
                <Button
                  size="small"
                  startIcon={<OpenInNew />}
                  className="text-blue-600"
                  href={project.live || project.liveUrl}
                  target="_blank"
                >
                  Live Demo
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>

        <Box className="text-center mt-8">
          <Typography variant="body1" className="text-gray-600 mb-4">
            Check out more of my projects on GitHub
          </Typography>
          <Button
            variant="outlined"
            startIcon={<GitHub />}
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
            href="https://github.com/ABBASALI1001"
            target="_blank"
          >
            View GitHub Profile
          </Button>
        </Box>
      </Container>
    </section>
  );
};

export default Projects;
