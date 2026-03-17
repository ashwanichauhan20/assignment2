import React, { useState, useEffect } from "react";
import { API_URL } from "../config";
import {
  Container,
  Typography,
  Box,
  LinearProgress,
  Paper,
  Skeleton,
} from "@mui/material";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/skills`)
      .then((res) => res.json())
      .then((data) => {
        setSkills(data.map(s => ({ name: s.name, level: s.percentage || s.level || 0 })));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching skills:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="skills" className="py-16 bg-gray-50">
        <Container maxWidth="lg">
          <Skeleton width="40%" height={60} sx={{ mx: "auto", mb: 6 }} />
          <Box className="grid md:grid-cols-2 gap-8">
            <Box>
              {[1, 2, 3, 4].map(i => <Skeleton key={i} height={40} sx={{ mb: 2 }} />)}
            </Box>
            <Box>
              <Box className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} width={80} height={40} />)}
              </Box>
            </Box>
          </Box>
        </Container>
      </section>
    );
  }

  return (
    <section id="skills" className="py-16 bg-gray-50">
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          className="text-center font-bold text-gray-800 mb-12"
        >
          Skills & Technologies
        </Typography>

        <Box className="grid md:grid-cols-2 gap-12">
          {/* Progress Bars Section */}
          <Box>
            <Typography
              variant="h5"
              className="font-semibold mb-8 text-gray-700 border-l-4 border-blue-600 pl-4"
            >
              Technical Proficiency
            </Typography>
            {skills.map((skill, index) => (
              <Box key={index} className="mb-6">
                <Box className="flex justify-between mb-2">
                  <Typography variant="body1" className="font-semibold text-gray-700">
                    {skill.name}
                  </Typography>
                  <Typography variant="body2" className="text-blue-600 font-bold">
                    {skill.level}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={skill.level}
                  className="h-2.5 rounded-full"
                  sx={{
                    backgroundColor: "#e2e8f0",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#2563eb",
                      borderRadius: "5px",
                    },
                  }}
                />
              </Box>
            ))}
          </Box>

          {/* Chips Section */}
          <Box>
            <Typography
              variant="h5"
              className="font-semibold mb-8 text-gray-700 border-l-4 border-blue-600 pl-4"
            >
              Technologies I Work With
            </Typography>
            <Box className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  className="px-5 py-2.5 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:text-blue-600 hover:shadow-md transition-all cursor-default"
                >
                  <Typography variant="body2" className="font-medium">
                    {skill.name}
                  </Typography>
                </Paper>
              ))}
              {skills.length === 0 && (
                <Typography variant="body2" className="text-gray-500 italic">
                  No skills added yet.
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default Skills;
