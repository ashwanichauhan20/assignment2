import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Download } from "@mui/icons-material";
import { API_URL } from "../config";

const BACKEND_URL = "https://assignment2-backend-zecz.onrender.com";

const Hero = () => {
const [profile, setProfile] = useState({});

useEffect(() => {
fetch(API_URL + "/profile")
.then(res => res.json())
.then(data => setProfile(data))
.catch(err => console.log(err));
}, []);

return (
<section style={{ padding: "50px" }}> <Container> <Typography variant="h4">
Hi, I'm {profile.name || "Developer"} </Typography>

```
    <Typography variant="h6" style={{ marginTop: "10px" }}>
      {profile.title || "MERN Developer"}
    </Typography>

    <Button
      variant="contained"
      startIcon={<Download />}
      href={
        profile.resumeUrl
          ? BACKEND_URL + profile.resumeUrl
          : "#"
      }
      style={{ marginTop: "20px" }}
    >
      Download Resume
    </Button>
  </Container>
</section>
```

);
};

export default Hero;
