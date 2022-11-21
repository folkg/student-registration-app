import React, { useContext } from "react";
import { StudentAPIContext } from "../contexts/student-api-provider";
import { Container, Typography, Paper, Button } from "@mui/material/";

export default function Dashboard() {
  // import the necessary functions from the StudentAPIContext
  const { getLoggedInStudentInfo } = useContext(StudentAPIContext);
  // get the information for the logged in student
  const { firstName, lastName, id } = getLoggedInStudentInfo();
  return (
    <Container>
      <Typography component="h1" variant="h4" align="center">
        {firstName} {lastName} ({id})
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
        <Button variant="contained" href="/viewallcourses" sx={{ margin: 1 }}>
          View All Courses
        </Button>
        <Button
          variant="contained"
          href="/viewregisteredcourses"
          sx={{ margin: 1 }}
        >
          View Registered Courses
        </Button>
        <Button variant="contained" href="/searchcourses" sx={{ margin: 1 }}>
          Search Courses
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
