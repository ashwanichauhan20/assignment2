import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box, Skeleton } from "@mui/material";
import { Download, GitHub, LinkedIn } from "@mui/icons-material";
import { API_URL } from "../config";
import profileFallback from "../assets/portfile.jpg";

const BACKEND_URL = "https://assignment2-backend-zecz.onrender.com";

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
return ( <section className="min-h-screen flex items-center justify-center"> <Skeleton variant="rectangular" width="100%" height={400} /> </section>
);
}

const {
name = "Your Name",
title = "MERN Stack Developer",
heroSubtitle = "Passionate developer",
profileImage,
resumeUrl,
githubUrl,
linkedinUrl
} = profile || {};

return ( <section className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-indigo-100 py-16"> <Container maxWidth="lg"> <Box className="text-center md:text-left md:flex items-center justify-between">

```
      <Box className="md:w-1/2">
        <Typography variant="h3" className="font-bold mb-4">
          Hi, I'm <span className="text-blue-600">{name}</span>
        </Typography>

        <Typography variant="h5" className="mb-4">
          {title}
        </Typography>

        <Typography variant="body1" className="mb-6">
          {heroSubtitle}
        </Typography>

        <Box className="flex flex-col sm:flex-row gap-4">

          <Button
            variant="contained"
            startIcon={<Download />}
            component="a"
            href={resumeUrl ? BACKEND_URL + resumeUrl : "#"}
            download
          >
            Download CV
          </Button>

          <Button
            variant="outlined"
            startIcon={<GitHub />}
            href={githubUrl}
            target="_blank"
          >
            GitHub
          </Button>

          <Button
            variant="outlined"
            startIcon={<LinkedIn />}
            href={linkedinUrl}
            target="_blank"
          >
            LinkedIn
          </Button>

        </Box>
      </Box>

      <Box className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <img
          src={profileImage ? BACKEND_URL + profileImage : profileFallback}
          alt="profile"
          className="w-64 h-64 rounded-full object-cover shadow-lg"
        />
      </Box>

    </Box>
  </Container>
</section>
```

);
};

export default Hero;
