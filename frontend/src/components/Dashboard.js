import React from "react";
import { Container, Box, Typography, Paper, Button } from "@mui/material/";

export default function Dashboard() {
  //TODO: Make MUI. Maybe just make each link a button.
  return (
    <Container>
      <Typography component="h1" variant="h4" align="center">
        Dashboard
      </Typography>
      <Paper
        sx={{
          padding: "1rem 2rem",
          margin: " 1.5rem auto",
          maxWidth: "sm",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button variant="contained" href="/viewcourses" sx={{ margin: 1 }}>
          View Courses
        </Button>
        <Button variant="contained" sx={{ margin: 1 }}>
          Register for Course
        </Button>
        <Button variant="contained" sx={{ margin: 1 }}>
          Drop Course
        </Button>
      </Paper>
    </Container>
  );
}
