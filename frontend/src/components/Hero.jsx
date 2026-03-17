import React, { useEffect, useState } from "react";
import { Container, Button } from "@mui/material";

const Hero = () => {
const [data, setData] = useState({});

useEffect(() => {
fetch("https://assignment2-backend-zecz.onrender.com/api/profile")
.then((res) => res.json())
.then((res) => setData(res))
.catch((err) => console.log(err));
}, []);

return (
<section style={{ padding: "40px", textAlign: "center" }}> <Container> <h1>Hi, I'm {data.name || "Developer"}</h1> <h3>{data.title || "Full Stack Developer"}</h3>

```
    <Button
      variant="contained"
      href={
        data.resumeUrl
          ? "https://assignment2-backend-zecz.onrender.com" + data.resumeUrl
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
